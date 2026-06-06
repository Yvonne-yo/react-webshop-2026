import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productsApi";

/* ----- CUSTOM HOOK: useProducts ----- */
// Handles data fetching, loading flags, and error states.
// Handles requests for both the complete product catalog and category-specific views.
//
// ----- useEffect dependency array: [categoryName, limit, skip] -----
// If a user selects a new category from the dropdown menu, these variables change 
// and trigger the useEffect automatically to fetch products from the new category.
// - categoryName: The name of the active category to be fetched.
// - limit: The maximum number of items per page (default is 12 to fill the layout grid).
// - skip: The number of items to skip (calculated to change pages during pagination).
//
// ----- Safe cleanup: isMounted ----- 
// The 'isMounted' flag prevents state updates on unmounted components.
// If a customer clicks a link to another page before the API has responded, 
// the cleanup function sets isMounted to false. This stops React from updating 
// a hidden component, protecting the application from memory leak warnings.
//
// ----- finally block -----
// Guarantees that the loading state is turned off at the end, 
// regardless of a successful response or a network failure.
/* ----------------------------------- */

/* ----- HOW THE ASYNCHRONOUS LIFECYCLE RENDERS IN WAVES ----- */
// React runs synchronously and does not wait for asynchronous API requests to complete 
// before rendering. Therefore, this custom hook returns data in two distinct waves:
//
// Wave 1: Initial Render (Millisecond 0)
// The hook executes instantly using the initial useState values. It returns an object containing 
// an empty products array (products: []) and a loading flag set to true (loading: true). This allows 
// the user interface to instantly render a loading spinner. Only AFTER this first render is displayed, 
// the useEffect hook triggers in the background.
//
// Wave 2: Asynchronous API Resolution (Approx. Millisecond 300)
// The request resolves once the API server responds. The state setters are invoked, 
// updating the products data and setting loading to false. Because changing state triggers a  
// re-render, React executes this entire hook a second time, returning the real product data array.
/* ----------------------------------- */



export function useProducts(categoryName = null, limit = 12, skip = 0) {
    const [productsData, setProductsData] = useState({ products: [], total: 0, skip: 0, limit: 12 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let isMounted = true;

        async function fetchCatalogData() {
            // Reset values before starting a new data fetch
            setLoading(true);
            setError(null);

            try {
                let response;

                // fetch products by category or fetch all products
                if (categoryName) {
                    response = await getProductsByCategory(categoryName, limit, skip);
                } else {
                    response = await getAllProducts(limit, skip);
                }

                // Only commit updates to state if the component lifecycle is still currently mounted
                if (isMounted) {
                    setProductsData(response);
                }

            } catch (err) {
                // Errors caught during the fetch sequence
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred while loading products.");
                }
                 
            } finally {
                // Guarantees that the loading flag is turned off regardless of a success or a failure.
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCatalogData();

        // Cleanup function: Fires automatically if the user clicks away or changes pages in the middle of a fetch
        return () => {
            isMounted = false;
        };
    
        
    }, [categoryName, limit, skip]); 
    
    return {
        products: productsData.products,
        totalProducts: productsData.total,
        currentSkip: productsData.skip,
        currentLimit: productsData.limit,
        loading,
        error 
    };
}