import { useState, useEffect } from "react";
import { searchProducts } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";
import { useDebounce } from "./useDebounce";

/* ----- CUSTOM HOOK: useSearch ----- */
// Handles live product search queries, loading states, and error handling.
// Uses a custom debounce timer to delay network requests until typing pauses.
// Filters all incoming API products against allowed categories (Data Whitelisting).

export function useSearch(searchQuery = "") {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce timer configuration
    // The debouncedQuery stays empty until the user takes a 4000 ms (4 seconds) pause from typing.
    // This extended delay is intentionally set to clearly demonstrate the debounce effect during the demo.
    const debouncedQuery = useDebounce(searchQuery, 4000);

    useEffect(() => {
        
        // Early exit: If the query is empty or contains spaces, stop the function immediately
        if (!debouncedQuery || debouncedQuery.trim() === "") {
            return;
        }

        let isMounted = true;

        async function executeSearch() {
            // Reset values inside the async wrapper for a clean render flows.
            setLoading(true);
            setError(null);

            try {
                const result = await searchProducts(debouncedQuery.trim());
                const rawProducts = result.products || [];

                // Whitelist filtering to cross-match the products with allowed shop categories
                const secureFilteredResults = rawProducts.filter((product) =>
                    ALLOWED_CATEGORIES.includes(product.category)
                );

                if (isMounted) {
                    setSearchResults(secureFilteredResults);  
                }

            } catch (err) {
                if (isMounted) {
                    setError(err.message || "An unexpected error occurred during search.");
                } 

            } finally {
                // Guarantees that the loading flag is turned off regardless of a success or a failure.
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        executeSearch();

        // Cleanup function to prevent state updates on unmounted components (Memory Leak Protection).
        return () => {
            isMounted = false;
        };

    }, [debouncedQuery]); 


    // ----- Computed Values -----
    // Derived State: Shows the loading spinner during the countdown delay.
    // The moment a user presses a key, searchQuery updates instantly, while debouncedQuery 
    // remains unchanged during the 4-second delay. Since these two values differ, the interface 
    // identifies that the timer is counting down and sets finalLoadingState to be true.
    // This triggers the loading spinner immediately on screen instead of waiting for the fetch to start.
    const isWaitingForTimer = searchQuery.trim() !== debouncedQuery.trim();
    const finalLoadingState = loading || isWaitingForTimer;

    // Derived State: Clears the search results instantly if the query is empty.
    // The conditional operator (? :) evaluates the search status.
    // - Condition: (!searchQuery || searchQuery.trim() === "")
    // - If True (? []): Wipes the screen instantly by returning an empty array.
    // - If False (: searchResults): Passes the validated API products safely to the UI grid.
    const finalResults = (!searchQuery || searchQuery.trim() === "")
            ? []
            : searchResults;
           
    return { searchResults: finalResults, loading: finalLoadingState, error };
}
