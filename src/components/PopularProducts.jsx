import { Sparkles, Loader2 } from "lucide-react";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";

/* ----- COMPONENT PopularProducts ----- */
// Render "This Week's Most Popular Products" to the storefront HomeView

export default function PopularProducts() {
	// Call the custom hook
	const { products, loading, error } = useFeaturedProducts();

	// State interception: loading
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-brand animate-fade-in">
				<Loader2 className="w-10 h-10 animate-spin mb-4" />
				<p className="text-text-muted font-bold text-sm tracking-wide">
					Assembling our visual boutique collection...
				</p>
			</div>
		);
	}

	// State interception: error handling
	if (error) {
		return (
			<div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center my-10 max-w-xl mx-auto ">
				<h4 className="font-black text-lg mb-2">Showcase Error</h4>
				<p className="text-sm font-medium">{error}</p>
			</div>
		);
	}


	// Empty state protection
	// If the products array is completely empty (due to an empty shopConfig array 
	// or failed network parsing), return absolutely nothing (null).
	// This gracefully hides the entire section from the user's view.
	
	if (products.length === 0) {
		return null;
	}

	// Main interface rendering of products in a grid
    return (
        <section className="container mx-auto px-4 pb-16">

            {/* ----- Section Heading Row ----- */}
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-text-muted/10">
                <Sparkles className="w-5 h-5 text-brand" />
                <h3 className="text-font-size-h3 font-black text-text-main tracking-tight">
                    This Week's Most Popular Products
                </h3>
            </div>



            {/* ----- Scalable Responsive Product Grid container ----- */}
            {/* This row sets up the column rules: 1 on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap">

				{/* Iterate through the 4 most popular products  */}
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-bg-card p-5 rounded-2xl border border-text-muted/10 shadow-xs hover:shadow-md hover:border-brand/20
									transition-all duration-300 group flex flex-col justify-between"
					>
						<div>
							{/* Product thumbnail image container area */}
							<div className="aspect-square bg-bg-main rounded-xl flex items-center justify-center mb-4 overflow-hidden relative border border-text-muted/5">
								<img
									src={product.thumbnail}
									alt={product.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
								/>
							</div>	
						
							{/* Product Metadata Sub-rows */}
							<span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">
	                			{product.category}
              				</span>
							<h4 className="font-bold text-text-main text-base tracking-tight mb-2 truncate">
                				{product.title}
              				</h4>
						
							{/* Price and Action Button Footer Structure */}
							<div className="flex items-center justify-between mt-4 pt-2 border-t border-text-muted/5">	
								<span className="font-black text-text-main text-lg">
									${product.price}	
								</span>
								<button
  									className="bg-brand hover:bg-brand-dark text-white font-bold text-xs py-2 px-4 rounded-lg 
             									transition cursor-pointer shadow-xs active:scale-95"
  												aria-label={`Add ${product.title} to shopping cart`}
								>
								Add to cart
								</button>
							</div>						
						</div>
					</div>
				))}

            </div>
		</section>
    );
}
