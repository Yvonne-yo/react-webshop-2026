import { useState, useEffect } from "react";
import { getProductsByCategory } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";

/* ----- CUSTOM HOOK useFeaturedProducts ----- */
// Fires parallel asynchronous API network requests to resolve a handpicked 
// list of visual top seller products simultaneously using Promise.all

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
                // We take your 4 first allowed categories (beauty, fragrances, skin-care, sunglasses).
                // For each category, we ask the server to give us only 1 product (limit=1).
                // Promise.all fires off all 4 targeted network fetches at the exact same millisecond!
                const targetCategories = ALLOWED_CATEGORIES.slice(0, 4);

                const fetchPromises = targetCategories.map((category) => 
                    getProductsByCategory(category, 1, 0)
                );

                const responses = await Promise.all(fetchPromises);

                // ----- DATA TRANSFORMATION PIPELINE -----
                // Promise.all returns an array of complete API response objects containing metadata (like total, skip, limit).
                // We need to unpack this data and transform it into a clean, flat array of 4 individual product entities:
                //
                // 1. responses.map(...) iterates through our 4 category answers.
                // 2. Since we used a strict 'limit=1' in the fetch, each category array contains exactly ONE product at index [0].
                //    We extract this single product object and discard the surrounding server metadata.
                // 3. .filter(Boolean) acts as a defensive safety net. If a category temporarily fails or returns empty, 
                //    it cleanly sweeps away the undefined/null item instead of crashing our React grid rendering loop.
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