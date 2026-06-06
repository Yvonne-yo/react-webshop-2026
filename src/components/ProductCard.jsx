import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { MAX_ALLOWED_QUANTITY } from "../config/shopConfig";
import QuantityController from "./QuantityController";

/* ----- COMPONENT: ProductCard ----- */
// A reusable component shared across store grids and category feeds to display individual items.
// 
// NOTE: 
// To prevent layout clicks from bubbling up to the parent card Link, a dual lock is used:
// - In the interaction handlers: Using preventDefault() and stopPropagation() on function level.
// - In the wrapping actions container: Re-applying both methods directly on the button layout div.

export function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  // Check if the product already exists in the cart array.
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  /* ----- EVENT HANDLERS ----- */
  // Performs changes on the global shopping cart state.
  // It stops the click action from moving up to the parent page link (event bubbling)
  // by stopping it immediately on the first lines (preventDefault and stopPropagation).
  // This blocks the link navigation from being triggered before React redraws the screen (re-render).
	const handleAddToCartClick = (e) => {
		e.preventDefault(); 
		e.stopPropagation();
		addToCart(product, 1); 	
	};

  const handleIncrementClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (existingCartItem && existingCartItem.quantity < MAX_ALLOWED_QUANTITY) {
      updateQuantity(product.id, existingCartItem.quantity + 1);
    }
  };

  const handleDecrementClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (existingCartItem) {
      if (existingCartItem.quantity <= 1) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, existingCartItem.quantity - 1);
      }
    }
  };

  return (
    // Link wrapping the ProductCard making the whole card clickable. 
    // This programmatically routes the user straight to the ProductDetailView layout canvas.
    // Exception: Clicks on buttons "Add to cart" and "QuantityController"
    <Link
      to={`/products/${product.id}`}
      className="bg-bg-card p-4 rounded-xl border border-text-muted/10 shadow-xs 
                 flex flex-col justify-between hover:scale-102 hover:shadow-md 
                 transition-all duration-300 cursor-pointer group"
    >

      {/* Image and Product information */}
      <div>
        {/* Product Thumbnail Image */}
        <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden relative border border-text-muted/40">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        {/* Product Category  */}
        <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">
          {product.category.replace("-", " ")}
        </span>
        
        {/* Product Title */}
        <h4 className="font-bold text-text-main text-base tracking-tight mb-2 truncate">
          {product.title}
        </h4>
      </div>
      
      {/* Price and Action Button */}
      
      {/* Price */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-2 border-t border-text-muted/5 min-h-13" >
        <span className="font-black text-text-main text-lg whitespace-nowrap">
          ${product.price.toFixed(2)}
        </span>

				{/* BUTTON FIELD: */}
				{/* BUTTONS using the event handlers to change the cart */}
        {/* If the product does NOT exist in the cart, show the "Add to cart"-button */}
        {/* If the product already exists in the cart, show the QuantityController-button. */}
        {/* QuantityController-button consists of Plus and Minus buttons and displays the current quantity of the product. */}
        
        {/* The onClick handler on this div stops any clicks inside the panel from */}
        {/* moving up to the parent page link (blocks event bubbling). This prevents */}
        {/* margin clicks from triggering the link navigation. */}
        <div 
          onClick={(e) => {e.preventDefault(); e.stopPropagation(); }}
          className="w-full sm:w-32 flex items-center justify-end">
      
        
          {!existingCartItem 
            ? ( 
              /* STATE 1: Show initial purchase button */
              <button 
                onClick={handleAddToCartClick}
                className="w-full h-8 flex items-center justify-center whitespace-nowrap bg-brand hover:bg-brand-dark text-white font-bold text-xs px-4 rounded-lg transition cursor-pointer shadow-xs active:scale-95 text-center"
                            aria-label={`Add ${product.title} to shopping cart`}
              >
                Add to cart
              </button>

            ) : (
              /* STATE 2: Quantity Controller */
              // Passes the click-protected handlers down as props to the QuantityController, 
              // to safely update the global cart without causing event bubbling.
              <QuantityController
                quantity={existingCartItem.quantity}
                onIncrement={handleIncrementClick}
                onDecrement={handleDecrementClick}
                maxLimit={MAX_ALLOWED_QUANTITY}
                heightClass="h-8"   // Height to match State 1 button
              />
              
            )}

        </div>
      </div>
    </Link>
  );
}

