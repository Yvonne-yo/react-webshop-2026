import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

/* ----- PROVIDER COMPONENT: CartProvider ----- */
// Provider for the global shopping cart functionality

export default function CartProvider({ children }) {
    // Cart initialization: Sets the starting cartItems when the application loads
    const [cartItems, setCartItems] = useState(() => {                                              
        const savedCart = localStorage.getItem("YoYo_webshop_cart");

        // Using a try-catch to handle failures during JSON.parse()
        try {
            // Checks if cart data exists in localStorage. If found, the JSON string is parsed 
            // back into active JavaScript data.
            // Note: Manipulated data like incorrect prices cannot be discovered here, which is why 
            // final validation must be handled on the backend or during checkout.
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                // Returns valid cart array from localStorage 
                if (Array.isArray(parsedCart)) {
                    return parsedCart;
                }
            }

        } catch {
            // Fallback to a clean state if the localStorage string is corrupted.
            // Example of one scenario: YoYo_webshop_cart exists in localStorage but contains 
            // an empty string "" (corrupted by somebody)
            return [];
        }

        // Fallback return if localStorage data is missing or corrupted
        // Example 1) First visit to the webshop or YoYo_webshop_cart is missing in localStorage for some other reason
        // Example 2) YoYo_webshop_cart exists in localStorage but has no value
        // In both examples localStorage returns null to savedCart. The try-code-block will be entered, but since 
        // if(savedCart) will be false, nothing will be performed. Then this final return will be reached and 
        // make initialization to an empty array, useState([])
        return [];
    });

    // Saves the cart items to localStorage whenever the state updates
    useEffect(() => {
        localStorage.setItem("YoYo_webshop_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    
    /* ----- Global Cart Methods ----- */
    // These methods define the actions available to alter the global 'cartItems' state array.
    // 
    // IMPORTANT: React state arrays and objects must always be updated immutably (read-only) 
    // Direct mutations using push() or splice() are forbidden as they prevent component re-renders 
    // To solve this, a fresh copy of the array or object reference is always returned:
    //
    // - METHOD 1 (Add): Uses the spread operator (...) to return a brand new array reference 
    // - METHOD 2 (Update): Uses .map() combined with object spreading ({ ...item }) to safely copy and update properties 
    // - METHOD 3 (Remove): Uses .filter() to build a fresh array instance excluding the chosen product ID 
    // - METHOD 4 (Clear): Resets the state safely by passing a completely fresh empty array ([]) 
  


    // METHOD 1: ADD ITEM TO CART
    // Adds a product object. If the product already exists inside the cart, 
    // it targets the specific item and increments its quantity.
    const addToCart = (product, quantity = 1) => {
        setCartItems((prevCartItems) => {
            // Find out if the product already exists in the shopping cart. 
            const existingCartItem = prevCartItems.find((item) => item.id === product.id);
        
            // If the product already exists in the cart:
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
    // Updates the quantity for a specific product ID.
    // If the quantity drops to zero or below, it calls the removal method.
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
    // Removes a specific product from the cart array
    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => 
            // filter() loops through the existing cart items and creates a new array with
            // array elements that pass the test.
            // All items that DON'T match the productId will remain in the cart and
            // only the item with the specific productId will be excluded.
            prevCartItems.filter((item) => 
                item.id !== productId
            )   
        );
    };

    // METHOD 4: CLEAR ENTIRE CART
    // Clears out all products from the cart array.
    const clearCart = () => {
        setCartItems([]);
    };
 
    /* ----- Shopping Cart Totals ----- */
    // Calculates the total price and item count directly from 'cartItems' using .reduce().
    // Calculating these values during rendering keeps all values updated at the same time.
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
