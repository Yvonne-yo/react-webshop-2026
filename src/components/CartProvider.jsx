import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

/* ----- GSM PROVIDER COMPONENT: CartProvider ----- */
// Provider of the shopping cart feature.
// Orchestrates the global shopping cart state architecture.
// Integrates persistent localStorage synchronization and defensive state validation.
export default function CartProvider({ children }) {
    // Initiate state by using an arrow function that will only execute once, when the component is mounted.
    // The cart items will always be initiated by a valid array extracted from localStorage.
    // If the data is corrupted or empty (no cart items saved), cart items will be initiated by a clean empty array. 
    const [cartItems, setCartItems] = useState(() => {                                              
        const savedCart = localStorage.getItem("YoYo_webshop_cart");

        // Using a try-catch to handle failures during JSON.parse()
        try {
            // DEFENSIVE LOCALSTORAGE DESERIALIZATION & VALIDATION
            // Checks if persistent cart data exists on the hard drive (string format). If found, 
            // the JSON string is parsed back into active JavaScript memory (an array of product objects)
            // An explicit type-validation ('Array.isArray') is executed to isolate 
            // the application state from corrupted or manually altered external data (format validation).
            // If the information in localStorage has been altered but is still in correct format,
            // the false information will not be discovered here. Example, manipulated price.
            // Validation of shopping cart items can be performed in the order checkout stage and 
            // by the backend server.
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                // Defensive validation to ensure only a valid array is returned, avoiding corrupted data.
                if (Array.isArray(parsedCart)) {
                    return parsedCart;              // return of valid cart information from YoYo_webshop_cart
                }
            }

        } catch {
            // Fallback to a clean state if the localStorage string is corrupted.
            // Example of one scenario: YoYo_webshop_cart exists in localStorage but contains an empty string "" (corrupted by somebody)
            // In the try code block if(savedCart) will be true, but execution of 
            // JSON.parse("") will crash and throw an error that will make the catch code block execute and save the webshop from craching.
            return [];
        }

        // If nothing gets returned in try nor in catch, this is a fallback return that will ensure that the useState will be initialized.
        // Example 1) First visit to the webshop or YoYo_webshop_cart is missing in localStorage for some other reason
        // Example 2) YoYo_webshop_cart exists in localStorage but has no value
        // In both examples localStorage returns null to savedCart. The try-code-block will be entered, but since if(savedCart) will be false, 
        // nothing will be performed. Then this final return will be reached and make initialization to an empty array, useState([])
        return [];
    });

    // PERSISTENT STORAGE SYNCHRONIZATION
    // This useEffect hook fires automatically every time the 'cartItems' state array changes.
    // It serializes the latest data matrix into a flat string format and stores it in localStorage.
    useEffect(() => {
        localStorage.setItem("YoYo_webshop_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // =========================================================================
    // GLOBAL CART ACTIONS & IMMUTABLE STATE MANAGEMENT
    // 
    // These internal context methods define the actions available to alter the
    // global 'cartItems' state array from consumer components. Terminologically 
    // defined as methods rather than functions as they are explicitly bound to, 
    // and operate inside, the CartProvider component.
    //
    // HOW IMMUTABLE STATE MANAGEMENT IS HANDLED (Methods 1-4):
    // In React, mutating state directly (like using push(), splice(), or changing 
    // properties on the spot) is not allowed because it stops components from re-rendering.
    // To solve this, a fresh copy of the array or object is always created:
    //
    // - METHOD 1 (Add): Uses the spread operator (...) to create a brand new array 
    //   instead of running a forbidden push().
    // - METHOD 2 (Update): Uses .map() to get a new array instance, combined with 
    //   object spreading ({ ...item }) to safely copy and update the quantity parameter.
    // - METHOD 3 (Remove): Uses the pure .filter() method to build a fresh array 
    //   that excludes the chosen product, completely avoiding mutative operations like splice().
    // - METHOD 4 (Clear): Simply sets a new empty array ([]), which changes 
    //   the memory reference without resetting array lengths directly.
    // =========================================================================


    // METHOD 1: ADD ITEM TO CART
    // Adds a product instance. If the entity already exists inside the cart, 
    // it targets the specific item and increments its quantity parameter.
    const addToCart = (product, quantity = 1) => {
        setCartItems((prevCartItems) => {
            // Find out if the product already exists in the shopping cart. 
            const existingCartItem = prevCartItems.find((item) => item.id === product.id);
        
            // If the product already exist in the cart:
            // map() loops through the existing cart items, and when it finds the item with product.id,
            // the quantity will be increased.
            if (existingCartItem) {
                return prevCartItems.map((item) => 
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

        // If the product is NOT already in the shopping cart, it will be added to the cart
        // Create a new array with prevCartItems objects (using spreading operator) 
        // Adding the new product object as the last item in the array.
        // CartItems are objects with the product information from DummyJSON and here
        // in Cart the quantity is added to the object.
        return [...prevCartItems, { ...product, quantity }];
        });
    };

    // METHOD 2: UPDATE ITEM QUANTITY
    // Modifies the exact quantity metric for a specific product identification token.
    // If the targeted amount drops to zero or below, it safely routes to the removal method.
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevCartItems) => 
            // map() loops through the existing cart items, and when it finds the item with product.id,
            // the quantity will be assigned the value of quantity
            prevCartItems.map((item) => 
                item.id === productId 
                    ? { ...item, quantity } 
                    : item
            )
        );
    };

  
    // METHOD 3: REMOVE SINGLE ITEM FROM CART
    // Drops a specific product branch completely from the primary array matrix.
    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => 
            // filter() loops through the existing cart items and creates a new array with
            // array elements that passes the test.
            // All items that DON'T match the productId will remain in the cart and
            // only the item with the specific productId will be excluded.
            prevCartItems.filter((item) => 
                item.id !== productId
            )   
        );
    };

    // METHOD 4: CLEAR ENTIRE CART
    // Wipes the memory stack completely clean (invoked during final order confirmation).
    const clearCart = () => {
        setCartItems([]);
    };
 
    
    // =========================================================================
    // DYNAMIC DERIVED STATE BALANCES (Calculate sums on the fly.)
    // 
    // How it works: Instead of storing the total price and item count in a separate 
    // useState and syncing them with a useEffect, these are calculated live directly 
    // from 'cartItems' using .reduce(). 
    //
    // Why this is better: It ensures that the totals are always completely in sync 
    // with whatever is currently in the cart. This eliminates the risk of asynchronous 
    // state lags, unexpected extra re-renders, or accidental infinite loops. Since 
    // these calculate primitive numbers, React easily tracks if the values actually 
    // changed between renders.
    // =========================================================================
    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);



    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                totalItemsCount,
                totalCartPrice
            }}
        >

            {children}
        </CartContext.Provider>
        

    );

}
