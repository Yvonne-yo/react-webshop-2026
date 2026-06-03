import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productsApi";

/* ----- CUSTOM HOOK: useProducts ----- */
// Manages data fetching states, loading indicators, and error tracking.
// Handles requests for both the complete product catalog and category-specific views.
//
// ----- useEffect dependency array: [categoryName, limit, skip] -----
// Example: If a user selects a new category from the navigation dropdown menu, 
// these variables change and trigger the useEffect automatically to fetch products 
// from the newly selected category.
// - categoryName: The identifier of the active product collection to be fetched.
// - limit: The maximum number of items per page (default is 12 to fill a 4-column layout grid).
// - skip: The offset count used by the server (calculated dynamically to change pages during pagination).
//
// ----- Memory leak protection: isMounted ----- 
// The 'isMounted' boolean flag prevents state updates on unmounted components.
// Example: If a customer clicks a link to another page before DummyJSON has responded, 
// the cleanup function sets isMounted to false. This stops React from attempting to update 
// a component that is no longer visible, preventing memory leaks and avoiding potential race conditions.
//
// ----- finally (try-catch-finally) -----
// The finally block guarantees that the loading state is turned off at the end of the operation, 
// regardless of a successful response or a network failure.
/* ----------------------------------- */

/* ----- THE REACT ASYNCHRONOUS LIFECYCLE (How useProducts renders in waves) ----- */
// React runs synchronously and does not wait for asynchronous API network requests to complete 
// prior to rendering. Therefore, this custom hook returns data in two distinct phases (re-renders):
//
// Wave 1: Initial Render (Millisecond 0)
// The hook executes instantly using the initial useState values. It immediately returns an object containing 
// an empty products array (products: []) and a loading flag set to true (loading: true). This synchronous return 
// allows the user interface (like PopularProducts) to instantly render a beautiful loading spinner on the screen.
// Only AFTER this first render is displayed, the useEffect hook triggers in the background.
//
// Wave 2: Asynchronous API Resolution (Approx. Millisecond 300)
// The asynchronous request resolves once the DummyJSON server responds. The state setters are invoked, 
// updating the products data and setting loading to false. Because changing state triggers a mandatory 
// re-render, React executes this entire custom hook a second time. During this second pass, the hook returns 
// the actual product data array and sets loading to false, hiding the spinner and rendering the catalog.
/* ----------------------------------- */


export function useProducts(categoryName = null, limit = 12, skip = 0) {
    // UseState hooks for data, loading animation and error tracking  
    const [productsData, setProductsData] = useState({ products: [], total: 0, skip: 0, limit: 12 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let isMounted = true;

        async function fetchCatalogData(){
            // Always reset state states prior to initializing a new asynchronous network pipeline
            setLoading(true);
            setError(null);

            // try-catch-finally
            try {
                let response;

                // fetch products by category or fetch all products
                if(categoryName) {
                    response = await getProductsByCategory(categoryName, limit, skip);
                } else {
                    response = await getAllProducts(limit, skip);
                }

                // Only commit updates to state if the component lifecycle is still currently mounted
                if (isMounted) {
                    setProductsData(response);
                }

            } catch (err) {
                // Safe interception of errors caught inside the asynchronous fetch sequence
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred while loading products.");
                }
                 
            } finally {
                // The finally block guarantees execution, ensuring that the loading screen ends for all responses
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCatalogData();

        // Cleanup function: Fires automatically if the user clicks away or changes pages in the middle of a fetch
        return () => {
            isMounted = false;
        };
    
        
    }, [categoryName, limit, skip]); // useEffect dependency:  useEffect automatically reruns if category, limit parameters or pagination skips change!
    
    // Object Property Shorthand: example loading: loading can be replaced by just loading.
    return {
        products: productsData.products,
        totalProducts: productsData.total,
        currentSkip: productsData.skip,
        currentLimit: productsData.limit,
        loading,
        error 
    };
};