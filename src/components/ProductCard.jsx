/* ----- COMPONENT ProductCard ----- */
// A reusable presentation component that renders a product card.
// Shared across both main storefront grids and dynamic category collection feeds.

// src/components/ProductCard.jsx

/**
 * COMPONENT: ProductCard
 * A reusable presentation component that renders a uniform, accessible e-commerce product card.
 * Shared across both main storefront grids and dynamic category collection feeds.
 */
export function ProductCard({ product }) {
  return (
    <div className="bg-bg-card p-5 rounded-2xl border border-text-muted/10 shadow-xs hover:shadow-md hover:border-brand/20 transition-all duration-300 group flex flex-col justify-between">
      
      {/* Upper Layout Box: Image and Metadata texts */}
      <div>
        {/* Product Thumbnail Image Container Area */}
        <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden relative border border-text-muted/40">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        {/* Product Category  */}
        <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">
          {product.category}
        </span>
        
        {/* Product Title heading hierarchy */}
        <h4 className="font-bold text-text-main text-base tracking-tight mb-2 truncate">
          {product.title}
        </h4>
      </div>
      
      {/* Lower Layout Box: Price and Action Button Footers Row */}
      {/* Isolated safely outside the text div to guarantee rigid vertical grid alignment */}
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-text-muted/5">
        <span className="font-black text-text-main text-lg">
          ${product.price}
        </span>
        <button 
          className="bg-brand hover:bg-brand-dark text-white font-bold text-xs py-2 px-4 rounded-lg transition cursor-pointer shadow-xs active:scale-95"
          aria-label={`Add ${product.title} to shopping cart`}
        >
          Add to cart
        </button>
      </div>

    </div>
  );
}

