import { Sparkles, ShoppingBag } from "lucide-react";

export default function PopularProducts() {
  return (
    <section className="container mx-auto px-4 pb-16">
      {/* ----- Heading ----- */}
      <div className="flex items-center gap-3 mb-8 pb-3 border-b border-text-muted/10">
        <Sparkles className="w-5 h-5 text-brand" />
        <h3 className="text-font-size-h3 font-black text-text-main tracking-tight">
          This Week's Most Popular Products
        </h3>
      </div>

      {/* ----- Grid container ----- */}
      {/* This row sets up the column rules: 1 on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap">
        {/* Lägga in produkter från dummyjson och det ska vara minst 4 för att grid ska vara meningsfullt yvop fix */}
        
        {/* ----- Placeholder Card for a single product ----- */}
        <div
          className="bg-bg-card p-5 rounded-2xl border border-text-muted/10 
                                shadow-xs hover:shadow-md
                                hover:border-brand/20 
                                transition-all duration-300 group"
        >
          {/* Image Box Placeholder - aspect-square forces it to stay perfectly square */}
          <div
            className="aspect-square bg-bg-main rounded-xl 
                                    flex items-center justify-center 
                                    text-text-muted/40 mb-4 overflow-hidden relative"
          >
            <ShoppingBag className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 text-brand/30" />
          </div>

          {/* Product Metadata */}
          <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">Category</span>

          {/* Product Title - truncate clips the text string safely on a single line */}
          <h4 className="font-bold text-text-main text-base tracking-tight mb-2 truncate">Popular Product Name</h4>

          {/* Price and Action Button footer */}
          <div className="flex items-center justify-between mt-4">
            <span className="font-black text-text-main text-lg">$49.00</span>
            <button
              className="bg-brand hover:bg-brand-dark text-white 
                                            font-bold text-xs py-2 px-4 rounded-lg 
                                            transition-colors cursor-pointer shadow-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
