import { Sparkles, Loader2, Search } from "lucide-react";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { ProductCard } from "./ProductCard";

/* ----- COMPONENT PopularProducts ----- */
// Render "This Week's Most Popular Products" to the storefront HomeView
// Showcases our curated, whitelisted collection of boutique favorites 
// driven entirely by the asynchronous useFeaturedProducts lifecycle hook.

export default function PopularProducts() {
	const { products, loading, error } = useFeaturedProducts();

	// State interception: loading
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-brand">
				<Loader2 className="w-10 h-10 animate-spin mb-4" />
				<p className="text-text-muted font-bold text-sm tracking-wide">
				    Assembling curated favorites...
				</p>
			</div>
		);
	}

	// State interception: error handling
	if (error) {
		return (
      		<div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center my-10 max-w-xl mx-auto">
        		<h4 className="font-black text-lg mb-2">Catalogue Failure</h4>
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

            {/* ----- Section Heading Row (Switches text and icons based on context) ----- */}
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-text-muted/10">
                <Sparkles className="w-5 h-5 text-brand" />
                <h3 className="text-font-size-h3 font-black text-text-main tracking-tight">
                    This Week's Most Popular Products
                </h3>
            </div>
	
            
			
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
              
		</section>
    );
}


