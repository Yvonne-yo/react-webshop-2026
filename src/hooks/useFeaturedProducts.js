import { useState, useEffect } from "react";
import { getProductsByCategory } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";

/* ----- CUSTOM HOOK useFeaturedProducts ----- */
// Fires parallel asynchronous API network requests to resolve a handpicked 
// list of visual top seller products simultaneously using Promise.all()

// see hook useProducts, for explanations about 
// Memory leak protection: isMounted
// THE REACT REACTIVE ASYNCHRONOUS LIFECYCLE (How useProducts renders in waves)

export function useFeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchFeaturedCollection() {
            setLoading(true);
            setError(null);

            // try-catch-finally
            try {
                // HIGH PERFORMANCE PARALLEL CATEGORY FETCH (Promise.all):
                // Extracts the first four allowed categories from the configuration.
                // For each category, the server is requested to return exactly one product (limit=1).
                // Promise.all executes all network requests simultaneously at the exact same millisecond.
                const targetCategories = ALLOWED_CATEGORIES.slice(0, 4);

                const fetchPromises = targetCategories.map((category) => 
                    getProductsByCategory(category, 1, 0)
                );

                const responses = await Promise.all(fetchPromises);

                // ----- DATA TRANSFORMATION PIPELINE -----
                // Promise.all returns an array of response objects with server metadata (total, skip, limit).
                // This logic extracts the actual products and turns them into a flat array:
                //
                // 1. responses.map(...) loops through the category answers from the server.
                // 2. Since the fetch uses 'limit=1', the code extracts the single product object found at index [0] 
                //    and drops the surrounding server metadata.
                // 3. .filter(Boolean) works as a safety net. If a category is empty or fails, it cleans away 
                //    the empty item so the grid can render safely without breaking the application.
                const mixedItems = responses.map((response) => response.products[0]).filter(Boolean);

                // Only commit updates to state if the component lifecycle is still currently mounted
                if (isMounted) {
                    setProducts(mixedItems);
                }

            } catch (err) {
                // Safe interception of errors caught inside the asynchronous fetch sequence
                if (isMounted) {
                    setError(err.message || "Failed to compile the featured collection");
                }
                
            } finally {
                // The finally block guarantees execution, ensuring that the loading screen ends for all response
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchFeaturedCollection();

        return () => {
            isMounted = false;
        };

    }, []);     // useEffect dependency: empty array means this only runs once when the storefront Loads

    // Object Property Shorthand: example loading: loading can be replaced by just loading.
    return { products, loading, error};
}