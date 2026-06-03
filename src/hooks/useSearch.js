import { useState, useEffect } from "react";
import { searchProducts } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig"
import { useDebounce } from "./useDebounce";

/* ----- CUSTOM HOOK useSearch ----- */
// Manages live product search queries, loading states, and error handling.
// Uses a custom debounce timer to delay network requests until typing pauses.
// All incoming API products are filtered against ALLOWED_CATEGORIES to ensure 
// that only items within the active boutique catalog are displayed (whitelist filtering).

export function useSearch(searchQuery = "") {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // DEBOUNCE TIMER CONFIGURATION
    // The debouncedQuery stays empty until the user takes a 4000 ms (4 seconds) pause from typing.
    // This extended delay is intentionally set to clearly demonstrate the debounce effect during the demo.
    const debouncedQuery = useDebounce(searchQuery, 4000);

    useEffect(() => {
        
        // If the query is empty or contains spaces, stop the execution immediately
        if (!debouncedQuery || debouncedQuery.trim() === "") {
            return;
        }

        let isMounted = true;

        async function executeSearch () {
            // FIXED FOR CASCADING RENDERS: 
            // Keeping setLoading and setError inside the async wrapper erases synchronous render cascading.
            setLoading(true);
            setError(null);

            try {
                const result = await searchProducts(debouncedQuery.trim());
                const rawProducts = result.products || [];

                // whitelist filtering to cross-match the with webshop product category range
                const secureFilteredResults = rawProducts.filter((product) =>
                    ALLOWED_CATEGORIES.includes(product.category)
                );

                if (isMounted) {
                    setSearchResults(secureFilteredResults);  
                }

            } catch (err) {
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred during search.")
                } 

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        executeSearch();

        // Memory leak cleanup protection mechanism
        // If a user navigates away or closes the search panel before the 
        // asynchronous fetch arrives, React would attempt to update state on an unmounted 
        // component. Setting isMounted to false safely cancels any trailing state updates.
        return () => {
            isMounted = false;
        };

        
        // useEffect dependencies
        // - debouncedQuery: Fires the search whenever the debounced string updates.
    }, [debouncedQuery]); 


    // SMART TIMER LOADER (Loading Screen Synchronization)
    //
    // How it works:
    // The moment a user presses a key, 'searchQuery' updates instantly, while 'debouncedQuery' 
    // remains unchanged during the 4-second delay. Since these two values differ, the interface 
    // identifies that the timer is counting down and forces 'finalLoadingState' to be true.
    // This triggers the loading spinner immediately on screen instead of waiting for the fetch to start.
    const isWaitingForTimer = searchQuery.trim() !== debouncedQuery.trim();
    const finalLoadingState = loading || isWaitingForTimer;


    // DYNAMIC DERIVED STATE (Instant UI Wiper utilizing a Ternary Operator)
    // The conditional operator (? :) dynamically evaluates the search status in mid-air:
    // - Condition: (!searchQuery || searchQuery.trim() === "")
    // - If True (? []): Wipes the screen instantly by returning an empty array.
    // - If False (: searchResults): Passes the validated API products safely to the UI grid.
    const finalResults = (!searchQuery || searchQuery.trim() === "")
            ? []
            : searchResults;
        
    
    // Return finalLoadingState which combines the actual database state and the smart timer guard!
    return { searchResults: finalResults, loading: finalLoadingState, error };
}
