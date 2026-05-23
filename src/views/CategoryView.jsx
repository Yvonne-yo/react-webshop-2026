import { useParams } from "react-router-dom";
import { Loader2, ShoppingBag } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard"

/* ----- VIEW COMPONENT: CategoryView ----- */
// Dynamically captures the active category parameter from the URL,
// invokes the useProducts hook, and renders a dedicated product grid.

export default function CategoryView() {
    // Extract the route parameter from the URL
    // If the user clicks the product category "Skin care", categoryName will dynamically become "skin-care"
    // useParams is a built-in React Router hook that reads dynamic parameters from the browser's URL string.
    // Here, it captures the text after '/category/' (e.g., 'skin-care') so we can use it to fetch data.
    const { categoryName } = useParams(); 

    // Call the custom hook that will use getProductsByCategory to fetch
    // the products for categoryName
    const { products, loading, error } = useProducts(categoryName);

    // State interception: loading
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-brand animate-fade-in">
                 <Loader2 className="w-10 h-10 animate-spin mb-4" />
                    <p className="text-text-muted font-bold text-sm tracking-wide">
                        Loading {categoryName ? categoryName.replace("-", " ") : "category"} collection...  
                    </p>  
            </div>
        );
    }

    // State interception: error handling
    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center my-10 max-w-xl mx-auto">
                <h4 className="font-black text-lg mb-2">Category Error</h4>
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    // Empty state protection
    if (!products || products.length ===0) {
        return(
            <div className="text-center py-20">
                <p className="text-text-muted font-medium">No products found in this category.</p>
            </div>
        )
    }

    // Main interface rendering of products in a grid
    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">

            {/* Page Header Title Row */}
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-text-muted/10">
                <ShoppingBag className="w-6 h-6 text-brand" />
                <h1 className="text-font-size-h1 font-black text-text-main tracking-tight capitalize">
                    {categoryName.replace("-", " ")}
                </h1>    
            </div>   

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap">
				{/* Reusable simple mapping usage of the component ProductCard */}
				{products.map((product) => (
					<ProductCard
						key={product.id} 
						product={product} />
				))}
			</div>
        </section>
    );
}