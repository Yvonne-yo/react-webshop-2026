import { Sparkles } from "lucide-react";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { ProductCard } from "./ProductCard";
import BoutiqueLoader from "./BoutiqueLoader";
import BoutiqueError from "./BoutiqueError";

/* ----- COMPONENT PopularProducts ----- */
/* Used by the HomeView               	 */
// Render "This Week's Most Popular Products" to the HomeView
// Displays a collection of selected items

export default function PopularProducts() {
	const { products, loading, error } = useFeaturedProducts();

	// Early Exit: loading
	if (loading) {
		return <BoutiqueLoader message="Assembling curated favorites..." />;
	}

	// Early Exit: error handling
	if (error) {
		return <BoutiqueError title="Catalogue Failure" message={error} />;
	}

	// Safe return if array is empty
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
	
            {/* ----- Section Render Products ----- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-grid-gap">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
              
		</section>
    );
}
