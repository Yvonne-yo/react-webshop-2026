import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { MAX_ALLOWED_QUANTITY } from "../config/shopConfig";
import QuantityController from "./QuantityController";

/* ----- COMPONENT: ProductDetailCard ----- */
// Renders the expanded detailed page view for a single product.
// Mirrors the established look-and-feel of the ProductCard components.
//
// NOTE:
// Unlike the ProductCard, this component is fully independent and does not reside 
// inside a parent page routing Link. Because there is no outer Link tag, the risk of 
// accidental page navigation during quantity clicks is entirely eliminated. 
// Therefore, no preventDefault nor stopPropagation is required within these action handlers.

export default function ProductDetailCard({ product }) {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    // Check if the product already exists in the cart array.
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    /* ----- EVENT HANDLERS ----- */
    // Performs changes on the global shopping cart state.
    // Note: No preventDefault or stopPropagation) is required here,
    // as this component does not reside inside a parent Link tag.
	const handleAddToCart = () => {
        addToCart(product, 1); 	
	};

    const handleIncrement = () => {
        if (existingCartItem && existingCartItem.quantity < MAX_ALLOWED_QUANTITY) {
            updateQuantity(product.id, existingCartItem.quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (existingCartItem) {
            if (existingCartItem.quantity <= 1) {
                removeFromCart(product.id);
            } else {
                updateQuantity(product.id, existingCartItem.quantity - 1);
            }
        }
    };
    
    return (
        <div className="bg-bg-card p-6 md:p-10 rounded-2xl border border-text-muted/10 shadow-xs my-12 max-w-4xl mx-auto">
            {/* Two-Column Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Product Thumbnail Image */}
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-6 
                            overflow-hidden border border-text-muted/40 max-h-100">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain hover:scale-102 transition-transform duration-300"
                    />
                </div>

                {/* Product information */}
                <div className="flex flex-col justify-between">
                    <div>
                        {/* Product Category */}
                        <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">
                            {product.category.replace("-", " ")}
                        </span>

                        {/* Product Title */}
                        <h1 className="text-2xl font-black text-text-main tracking-tight mb-4">
                            {product.title}
                        </h1>

                        {/* Detailed Product Description */}
                        <div className="mb-6">
                            <h3 className="text-xs font-black text-text-main tracking-wider uppercase mb-1.5">
                                Description
                            </h3>
                            <p className="text-text-muted text-sm font-medium leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-text-muted/5">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                Price:
                            </span>
                            <span className="font-black text-text-main text-2xl">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* BUTTON FIELD: */}
				        {/* BUTTONS using the event handlers to change the cart */}
                        {/* If the product does NOT exist in the cart, show the "Add to cart"-button */}
                        {/* If the product already exists in the cart, show the QuantityController-button. */}
                        {/* QuantityController-button consists of Plus and Minus buttons and displays the current quantity for the product. */}
                        {/* Note: No outer Link wrapper exists here, making event propagation shielding unnecessary */}
                        <div className="w-full">
                            {!existingCartItem 
                                ? (
                                    /* STATE 1: Show initial purchase button */
                                    <button 
                                        onClick={handleAddToCart}
                                        className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-black text-sm uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                                        aria-label={`Add ${product.title} to shopping cart`}
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add to cart
                                    </button>
            
                            ) : (
                                /* STATE 2: Quantity Controller */
                                // Passes down the interaction handlers as props to the QuantityController
                                    <QuantityController
                                        quantity={existingCartItem.quantity}
                                        onIncrement={handleIncrement}
                                        onDecrement={handleDecrement}
                                        maxLimit={MAX_ALLOWED_QUANTITY}
                                        heightClass="h-12"  // Height to match State 1 button
                                    />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
