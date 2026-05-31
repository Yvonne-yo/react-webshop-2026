import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import QuantityController from "./QuantitiyController";

/* ----- COMPONENT ProductCard ----- */
// A reusable presentation component that renders a product card.
// Shared across both main storefront grids and dynamic category collection feeds.

export function ProductCard({ product }) {
  // Extract global cart state and mutation methods from the hook
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  // Standardized ceiling constraint to enforce catalog safety bounds (max 99 items)
  const MAX_ALLOWED_QUANTITY = 99;

  // System lookup to see if this product already exists in the cart array
  const existingCartItem = cartItems.find((item) => item.id === product.id);


  /* ----- INTERACTIVE INTERACTION HANDLERS ----- */
  // Performs changes on the global shopping cart state.
  // It stops the click action from moving up to the parent page link (event bubbling)
  // by stopping it immediately on the first line (preventDefault and stopPropagation).
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
    <Link
      to={`/products/${product.id}`}
      className="bg-bg-card p-4 rounded-xl border border-text-muted/10 shadow-xs 
                 flex flex-col justify-between hover:scale-102 hover:shadow-md 
                 transition-all duration-300 cursor-pointer group"
    >

      {/* Upper Layout Box: Image and Metadata texts */}
      <div>
        {/* Product Thumbnail Image Container Area */}
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
        
        {/* Product Title heading hierarchy */}
        <h4 className="font-bold text-text-main text-base tracking-tight mb-2 truncate">
          {product.title}
        </h4>
      </div>
      
      {/* Lower Layout Box: Price and Transforming Action Button Footer */}
      {/* Isolated safely outside the text div to guarantee rigid vertical alignment */}
      {/* Enforced single-line text layout using whitespace-nowrap */}

      {/* Price */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-2 border-t border-text-muted/5 min-h-13" >
        <span className="font-black text-text-main text-lg whitespace-nowrap">
          ${product.price.toFixed(2)}
        </span>

				{/* BUTTON FIELD: Intercepted Cart Trigger */}
				{/* BUTTONS using the event handlers to change the cart */}
        {/* If the product does NOT exist in the cart, show the "Add to cart"-button */}
        {/* If the product already does exist in the cart, show the QuantityController-button. */}
        {/* QuantityController-button consists of Plus and Minus buttons and displays the current quantity for the product. */}
        
        {/* DEFENSIVE EVENT PROPAGATION SHIELD (Click protection) */}
        {/* The onClick handler on this div stops any clicks inside the panel from */}
        {/* moving up to the parent page link (blocks event bubbling). This ensures that */}
        {/* clicking on the number or margins does not trigger the link navigation. */}
        <div 
          onClick={(e) => {e.preventDefault(); e.stopPropagation(); }}
          className="w-full sm:w-32 flex items-center justify-end">
      
        
          {!existingCartItem 
            ? ( 
              /* STATE 1: INITIAL PURCHASE CALL-TO-ACTION */
              <button 
                onClick={handleAddToCartClick}
                className="w-full h-8 flex items-center justify-center whitespace-nowrap bg-brand hover:bg-brand-dark text-white font-bold text-xs px-4 rounded-lg transition cursor-pointer shadow-xs active:scale-95 text-center"
              aria-label={`Add ${product.title} to shopping cart`}
            >
                Add to cart
              </button>

            ) : (

              /* STATE 2: REUSABLE MOUNTED STEP QUANTITY CONTROLLER ATOM */
              // Injects the click capturing handlers directly into the structural hooks
              <div className="w-full sm:w-32 flex items-center justify-end">
                <QuantityController
                  quantity={existingCartItem.quantity}
                  onIncrement={handleIncrementClick}
                  onDecrement={handleDecrementClick}
                  maxLimit={MAX_ALLOWED_QUANTITY}
                  heightClass="h-8"   // Height to match State 1 button
                />
              </div>
            )}

        </div>
      </div>
    </Link>
  );
}

