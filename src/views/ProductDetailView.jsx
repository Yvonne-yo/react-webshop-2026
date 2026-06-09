import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi";
import BoutiqueLoader from "../components/BoutiqueLoader";
import BoutiqueError from "../components/BoutiqueError";
import ProductDetailCard from "../components/ProductDetailCard";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";

/* ----- VIEW COMPONENT: ProductDetailView ----- */
// Fetches and displays details for a single product using dynamic URL parameters

export default function ProductDetailView() {
    // Dynamic route parameter tracking
    // Extracts the specific product ID from the dynamic browser URL path
    const { productId } = useParams();

    // Local states
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetches the specific product details from the API on mount or URL change
    useEffect(() => {
        let isMounted = true;

        async function fetchSingleProduct() {
            // Reset values inside the async wrapper for a clean render flows
            setLoading(true);
            setError(null);

            try {
                const data = await getProductById(productId);

                // Whitelist filtering to cross-match the products with allowed shop categories
                const secureFilteredResults =  ALLOWED_CATEGORIES.includes(data.category)
                
                if (isMounted && secureFilteredResults) {
                    setProduct(data);
                }

            } catch (err) {
                if (isMounted) {
                    // Sets the error message if the fetch sequence fails
                    setError(err.message || "An unexpected failure occurred while loading the item.");
                }

            } finally {
                // Guarantees that the loading flag is turned off regardless of a success or a failure.
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchSingleProduct();

        // Cleanup function to prevent state updates on unmounted views (Memory Leak Protection)
        return () => {
            isMounted = false;
        }

    }, [productId]);
                     
    // Early Exit: loading
    if (loading) {
        return <BoutiqueLoader message="Unboxing luxury item details..." />;
    }

    // Early Exit: error handling
    if (error || !product) {
        return (
            <BoutiqueError
                title="Product Not Found"
                message={error || "The requested boutique item is currently unavailable."}
            />
            );
    }

    // Main interface rendering
    return <ProductDetailCard product={product} />;

}


