import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

/* ----- COMPONENT ProductCard ----- */
// A reusable presentation component that renders a product card.
// Shared across both main storefront grids and dynamic category collection feeds.

export function ProductCard({ product }) {
  // Initialize global checkout action
  const { addToCart } = useCart();

  // Event handler
	// Intercepts the click event to prevent the parent <Link> container 
  // from routing the user away to the ProductDetailView canvas during a cart insertion.
	const handleAddToCartClick = (e) => {
		e.preventDefault(); 		// Blocks the browser default anchor link behavior
		e.stopPropagation();		// Stops the event from bubbling up to the outer <Link>

		addToCart(product, 1); 	// Executes the secure global state action
	}


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
      
      {/* Lower Layout Box: Price and Action Button Footers Row */}
      {/* Isolated safely outside the text div to guarantee rigid vertical alignment */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-2 border-t border-text-muted/5">
        <span className="font-black text-text-main text-lg">
          ${product.price.toFixed(2)}
        </span>

				{/* REQUIRED PROMPT BUTTON FIELD: Intercepted Cart Trigger */}
				{/* BUTTON using the event handler to add the product to the cart */}
        {/* Enforced single-line text layout using whitespace-nowrap */}
        <button 
					onClick={handleAddToCartClick}
          className="whitespace-nowrap bg-brand hover:bg-brand-dark text-white font-bold text-xs py-2 px-4 rounded-lg transition 
											cursor-pointer shadow-xs active:scale-95 text-center flex-1 sm:flex-none"
          aria-label={`Add ${product.title} to shopping cart`}
        >
          Add to cart
        </button>
      </div>

    </Link>
  );
}

