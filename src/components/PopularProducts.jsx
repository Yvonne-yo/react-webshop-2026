import { Sparkles, Loader2, Search } from "lucide-react";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { useSearch } from "../hooks/useSearch";
import { ProductCard } from "./ProductCard";

/* ----- COMPONENT PopularProducts ----- */
// If the search bar is empty:
// Render "This Week's Most Popular Products" to the storefront HomeView
//
// If the user starts to type in the search bar, the search query string becomes active:
// Execute live search with debounce and render the search result (products or message)

export default function PopularProducts({ searchQuery }) {
	// DYNAMIC CONTROLLER FLAG 
    // 1. searchQuery checks if the string property exists and has any text value.
    // 2. searchQuery.trim() !== "" strips away hidden whitespaces. If a user accidently 
    //    types five blank spaces ("     "), it evaluates to false, blocking false searches.
    // 
    // If both are true, isSearching becomes true, which tells our grid to shut down the 
    // top seller list and activate the high-performance live search engine instead!
	const isSearching = searchQuery && searchQuery.trim() !== "";

	/* ----- Initialize and unpack information ----- */
	// Initialize both data pipelines side-by-side
	const featured = useFeaturedProducts();
	const search = useSearch(searchQuery);

	// Unpack runtime states dynamically based on the current user intent context
	const products = isSearching ? search.searchResults : featured.products;
	const loading = isSearching ? search.loading : featured.loading;
	const error = isSearching ? search.error : featured.error;

	// State interception: loading
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-brand">
				<Loader2 className="w-10 h-10 animate-spin mb-4" />
				<p className="text-text-muted font-bold text-sm tracking-wide">
				{isSearching ? `Searching boutique collection for "${searchQuery}"...` : "Assembling curated favorites..."}
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
	// CRITICAL UX NOTE: Added '&& !isSearching' to ensure that if a 
	// user search hits zero matching items, the section will NOT be hidden. Instead, 
	// the code fall through and draw a proper "No products found" notice.
	if (products.length === 0 && !isSearching) {
    	return null;
  	}

	// Main interface rendering of products in a grid
    
    return (
        <section className="container mx-auto px-4 pb-16">

            {/* ----- Section Heading Row (Switches text and icons based on context) ----- */}
            <div className="flex items-center gap-3 mb-8 pb-3 border-b border-text-muted/10">
                {isSearching ? <Search className="w-5 h-5 text-brand" /> : <Sparkles className="w-5 h-5 text-brand" />}
                <h3 className="text-font-size-h3 font-black text-text-main tracking-tight">
                    {isSearching ? `Search Results for "${searchQuery}"` : "This Week's Most Popular Products"}
                </h3>
                
                {/* Micro UX Counter: Shows the amount of matching items found */}
                {isSearching && products.length > 0 && (
                  <span className="ml-auto text-xs font-bold bg-bg-main border border-text-muted/10 text-text-muted py-1 px-3 rounded-full">
                    {products.length} {products.length === 1 ? "item" : "items"} found
                  </span>
                )}
            </div>

			{/* ----- FALLBACK UX ARCHITECTURE: Triggered only when search hits 0 items ----- */}
            {/* 1. products.length === 0: Checks if the search result array is completely empty.
                2. isSearching: Double security barrier. Ensures this ONLY triggers during an active search,
                   so the error message doesn't accidently show up when the page first loads.
                3. The final '&& (': Acts as an instant "render trigger" in React. If both conditions to the 
                   left are true, JavaScript steps past the && and renders the layout inside the parenthesis. */}
	
            {products.length === 0 && isSearching && (
                <div className="animate-fade-in">
                    {/* The friendly error notice */}
                    <div className="text-center py-10 bg-bg-main/40 border border-text-muted/5 rounded-2xl mb-12">
                        <p className="text-text-muted font-bold text-base mb-1">No products found</p>
                        <p className="text-text-muted/60 text-xs font-medium">We couldn't find any premium beauty items matching your query.</p>
                    </div>

                    {/* Dynamic fallback header inviting the customer to browse popular products instead */}
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-text-muted/10">
                        <Sparkles className="w-4 h-4 text-brand animate-pulse" />
                        <h4 className="text-base font-black text-text-main tracking-tight">
                            But you might love our current top favorites:
                        </h4>
                    </div>

                    {/* Fallback loop rendering the 4 stable curated items from useFeaturedProducts directly */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap mb-16">
                        {featured.products.map((fallbackProduct) => (
                            <ProductCard key={`fallback-${fallbackProduct.id}`} product={fallbackProduct} />
                        ))}
                    </div>
                </div>
            )}

			{/* ----- Standard Products grid (Runs for regular browse mode OR successful searches!) ----- */}
            {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
            
		</section>
    );
}


