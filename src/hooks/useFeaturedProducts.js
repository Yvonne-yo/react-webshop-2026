import { useState, useEffect } from "react";
import { getProductsByCategory } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";

/* ----- CUSTOM HOOK useFeaturedProducts ----- */
// Fetches a selected collection of products for the homepage.
// Fetches multiple API requests at the same time using Promise.all to optimize load performance.
//
// Note: See useProducts for detailed explanations about memory leak protection (isMounted) 
// and the asynchronous lifecycle rendering waves.

export function useFeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchFeaturedCollection() {
            setLoading(true);
            setError(null);

            try {
                // Parallel category fetch using Promise.all
                // Extracts the first four allowed categories from the configuration.
                // For each category, the server is requested to return exactly one product (limit=1).
                // Promise.all runs all network requests at the exact same time.
                const targetCategories = ALLOWED_CATEGORIES.slice(0, 4);

                const fetchPromises = targetCategories.map((category) => 
                    getProductsByCategory(category, 1, 0)
                );

                const responses = await Promise.all(fetchPromises);

                // ----- Data mapping -----
                // Promise.all returns an array of response objects containing metadata (total, skip, limit).
                // This logic extracts the specific product objects and turns them into a flat array:
                //
                // 1 responses.map(...) loops through the category answers from the server.
                // 2 Extracts the single product object found at index [0] and drops the surrounding metadata.
                // 3 .filter(Boolean) acts as a safety net. Cleans away any empty or corrupted items 
                //    so the UI can render safely without causing runtime crashes.
                const mixedItems = responses.map((response) => response.products[0]).filter(Boolean);

                // Only commit updates to state if the component lifecycle is still currently mounted.
                if (isMounted) {
                    setProducts(mixedItems);
                }

            } catch (err) {
                // Errors caught during the fetch sequence
                if (isMounted) {
                    setError(err.message || "Failed to compile the featured collection");
                }
                
            } finally {
                // Guarantees that the loading flag is turned off regardless of a success or a failure.
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchFeaturedCollection();

        return () => {
            isMounted = false;
        };

    }, []);     // Runs once when HomeView mounts (Refetches if the user navigates away and returns).

    // Object Property Shorthand: example loading: loading can be replaced by just loading.
    return { products, loading, error };
}