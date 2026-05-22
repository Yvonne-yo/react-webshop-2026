import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory } from "../api/productsApi";

/* ----- CUSTOM HOOK useProducts ----- */
// Manages fetch states, loading spinners and error mitigation
// Fetch for both all products and products by category
//
// ----- useEffect dependency array: [categoryName, limit, skip] -----
// Exampel: If the user changes the category of products in the dropdown menu, these variables will
// change and trigger the useEffect immediately and automatically fetch products in the new category. 
// categoryName of the products to be fetched
// limit: The maximum number of products to be fetched per page (default is 12 to fill a 4-column layout layout grid).
// skip:  The offset count telling the server how many items to skip (calculated dynamically to change pages during pagination).
//
// ---- Memory leak protection: isMounted ----- 
// isMounted is a boolean control flag to prevent memory leakaged
// Example: If the customer clicks on a link to an other page before DummyJSON has answered,
// the cleanup function will set isMounted to false. This prevents React from trying to update  
// a component that no longer is visible, which stops the memory leakage. 
// A possible race condition will not happen.
//
// ----- finally (try-catch-finally) will set setLoading to false. -----
// Guarantees that the loading spinner always is turned off at the end, regardless of success or at network failures.
//
/* ----------------------------------- */

/* ----- THE REACT REACTIVE ASYNCHRONOUS LIFECYCLE (How useProducts renders in waves) ----- */
// React executes synchronously and NEVER waits for an asynchronous API fetch to complete prior to rendering.
// Therefore, this custom hook operates and returns data in two distinct waves (re-renders):
//
// Wave 1: Initial Render (Millisecond 0)
// The hook executes instantly using the initial useState values. It immediately returns an object containing 
// an empty products array (products: []) and a loading flag set to true (loading: true). This synchronous return 
// allows the UI interface (like PopularProducts) to instantly render a beautiful loading spinner on the screen.
// Only AFTER this first render is committed to the DOM screen, the useEffect hook triggers in the background.
//
// Wave 2: The Asynchronous API Resolution (Approx. Millisecond 300)
// The async/await background pipeline resolves once DummyJSON responds. The data lands, and we invoke 
// setProductsData(result) followed by the finally block setting setLoading(false). Because React state triggers 
// a mandatory re-render whenever state setters are executed, React halts and forces this whole Custom Hook 
// to execute a second time. During this second pass, the hook returns a brand new object containing the 
// sharp product data array and loading as false, which automatically hides the spinner and draws the catalogue of products..
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
                let result;

                // fetch products by category or fetch all products
                if(categoryName) {
                    result = await getProductsByCategory(categoryName, limit, skip);
                } else {
                    result = await getAllProducts(limit, skip);
                }

                // Only commit updates to state if the component lifecycle is still currently mounted
                if (isMounted) {
                    setProductsData(result);
                }

            } catch (err) {
                // Safe interception of errors caught inside the asynchronous fetch sequence
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred while loading products.");
                }
                 
            } finally {
                // The finally block guarantees execution, ensuring that the loading screen ends for all results
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCatalogData();

        // Cleanup function: Fires automatically if the user clicks away or changes pages in the middle of a fetch
        return () => {
            isMounted = false;
        }
    
        // The hook automatically reruns if category, limit parameters or pagination skips change!
    }, [categoryName, limit, skip]);
    
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