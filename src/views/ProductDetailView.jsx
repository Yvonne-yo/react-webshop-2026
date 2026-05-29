import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi";
import BoutiqueLoader from "../components/BoutiqueLoader";
import BoutiqueError from "../components/BoutiqueError";
import ProductDetailCard from "../components/ProductDetailCard";

/* ----- VIEW COMPONENT: ProductDetailView ----- */
// Fetches and displays data for a singular product instance.
// Captures parametric routing ID tokens directly from the browser's address bar.

export default function ProductDetailView() {
    // 1. CAPTURE ADDRESS PARAMETERS
    // Extracts the specific product ID (e.g. "4") from the dynamic browser URL path
    const { productId } = useParams();

    // 2. STATE MANAGEMENT
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. LIFECYCLE ASYNC NETWORK OPERATIONS
    useEffect(() => {
        let isMounted = true;

        async function fetchSingleProduct() {
            // FIXED FOR CASCADING RENDERS: 
            // Keeping setLoading and setError safely inside the async wrapper completely erases 
            // any unsafe synchronous render cascading errors.
            setLoading(true);
            setError(null);

            try {
                const data = await getProductById(productId);

                if (isMounted) {
                    setProduct(data);
                }

            } catch (err) {
                if (isMounted) {
                    // Captures the clean, human-readable error banner message
                    setError(err.message || "An unexpected failure occured while loading the item.");
                }

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            
            }
        }

        fetchSingleProduct();

        // Memory leak cleanup protection mechanism
        // 
        // Why it's used: If a customer clicks an item but immediately hits the back button 
        // before the asynchronous database fetch arrives, React would try to update state 
        // on an unmounted view. By flipping isMounted to false during unmount, 
        // we cleanly intercept and drop any trailing network signals in mid-air!
        return () => {
            isMounted = false;
        }

    }, [productId]); // useEffect dependency: productID changes as soon as the user changes product page
                     // by listening synchronously to dynamic URL switches.

    // 4. LIFECYCLE INTERCEPTION: LOADING SCREEN
    // while the asynchronous API request is active, the boutique loader is displayed.
    if (loading) {
        return <BoutiqueLoader message="Unboxing luxury item details..." />;
    }

    // 5. LIFECYCLE INTERCEPTION: DEFENSIVE ERROR HANDLING
    // Reuses the global boutique error component to isolate missing entities safely.
    if (error || !product) {
        return (
            <BoutiqueError
                title="Product Not Found"
                message={error || "The requested boutique item is currently unavailable."}
            />
            );
    }

    // 6. MAIN VIEW INTERFACE RENDERING
    // A balanced two-column grid panel displaying visual assets on the left side
    // and presenting metadata text content data fields on the right side.
    return <ProductDetailCard product={product} />;

}
