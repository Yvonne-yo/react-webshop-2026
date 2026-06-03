import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import QuantityController from "./QuantityController";

/* ----- COMPONENT: ProductDetailCard ----- */
// Renders an expanded, detailed presentation interface for a singular product instance.
// Mirrors the established look-and-feel of the atomic ProductCard components.
//
// ARCHITECTURAL NOTE (Isolated Interface Layout):
// Unlike the atomic ProductCard, this component is fully independent and does not reside 
// inside a parent page routing Link. Because there is no outer anchor tag, the risk of 
// accidental page navigation during quantity clicks is entirely eliminated. 
// Therefore, no defensive event shielding (preventDefault or stopPropagation) is required 
// within these action handles, keeping the interaction logic remarkably light and clean.

export default function ProductDetailCard({ product }) {
    // Extract global cart state and mutation methods from the hook
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    // Standardized ceiling constraint to enforce catalog safety bounds (max 99 items)
    const MAX_ALLOWED_QUANTITY = 99;
    
    // System lookup to see if this product already exists in the cart array
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    /* ----- INTERACTIVE INTERACTION HANDLERS ----- */
    // Performs changes on the global shopping cart state.
    // Note: No event shielding (preventDefault/stopPropagation) is required here,
    // as this component does not reside inside a parent anchor Link tag.
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
            {/* Symmetrical Two-Column Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column Container: Premium Visual Product Image */}
                {/* Mirrors the precise white background and distinct border from ProductCard */}
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-6 
                            overflow-hidden border border-text-muted/40 max-h-100">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain hover:scale-102 transition-transform duration-300"
                    />
                </div>

                {/* Right Column Container: Contextual Metadata Text Fields */}
                <div className="flex flex-col justify-between">
                    {/* Upper Layout Block: Category, Title and Description text rows */}
                    <div>
                        {/* Synchronized brand category tracking label */}
                        <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">
                            {product.category.replace("-", " ")}
                        </span>

                        {/* Dynamic Product Title Header */}
                        <h1 className="text-2xl font-black text-text-main tracking-tight mb-4">
                            {product.title}
                        </h1>

                        {/* Detailed Product Description Box Context */}
                        <div className="mb-6">
                            <h3 className="text-xs font-black text-text-main tracking-wider uppercase mb-1.5">
                                Description
                            </h3>
                            <p className="text-text-muted text-sm font-medium leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Lower Layout Block: Price and Transforming Action Button Footer */}
                    {/* Isolated at the bottom to guarantee rigid alignment with the visual image anchor */}
                    <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-text-muted/5">
                        {/* Pricing Identification */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                Price:
                            </span>
                            <span className="font-black text-text-main text-2xl">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* BUTTON FIELD: Intercepted Cart Trigger */}
				        {/* BUTTONS using the event handlers to change the cart */}
                        {/* If the product does NOT exist in the cart, show the "Add to cart"-button */}
                        {/* If the product already does exist in the cart, show the QuantityController-button. */}
                        {/* QuantityController-button consists of Plus and Minus buttons and displays the current quantity for the product. */}
                        <div className="w-full">
                            {!existingCartItem 
                                ? (
                                    /* STATE 1: INITIAL PURCHASE CALL-TO-ACTION */
                                    <button 
                                        onClick={handleAddToCart}
                                        className="w-full h-12 bg-brand hover:bg-brand-dark text-white font-black text-sm uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                                        aria-label={`Add ${product.title} to shopping cart`}
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add to cart
                                    </button>
            
                            ) : (
                                /* STATE 2: TRANSFORMED STEP QUANTITY CONTROLLER PANEL */
                                // Passes down the synchronized interaction handlers as props to the controller panel
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
