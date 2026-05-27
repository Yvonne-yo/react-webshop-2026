import { useState, useEffect } from "react";
import { searchProducts } from "../api/productsApi";
import { ALLOWED_CATEGORIES } from "../config/shopConfig"
import { useDebounce } from "./useDebounce";

/* ----- CUSTOM HOOK useSearch ----- */
// Manages search results, loading states, and explicit error mitigation.
// Purely executes network requests when a valid debounced query string is present.
// Search results will be cross-matched against ALLOWED_CATEGORIES to make sure
// that products displayed are part of the webshop product range. (whitelist filtering)
// debounce is used.
// async/await and try/catch/finally is used.

export function useSearch(searchQuery, onFetchComplete) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useDebounce custom hook
    // debouncedQuery will stay frozen and empty until the user takes a 4000 ms = 4 seconds(default value 300ms) pause from typing.
    // Here the delay is set to 4 seconds so the debounce will be clear to the user during the demo.
    const debouncedQuery = useDebounce(searchQuery, 4000);


    useEffect(() => {
        
        // If the query is empty or contains spaces, we immediately stop here.
        if (!debouncedQuery || debouncedQuery.trim() === "") {
            return;
        }

        let isMounted = true;

        async function executeSearch () {
            // FIXED FOR CASCADING RENDERS: 
            // Moving setLoading and setError inside the async function wrapper isolates their execution state.
            // This prevents React from flagging them as unsafe synchronous side-effects on the primary render frame.
            setLoading(true);
            setError(null);

            // FIXED FOR THE OPENING LOOP BUG:
            // We set a local trigger flag to true as soon as a active network request starts.
            // This ensures we can distinguish between a newly finished search and an old search 
            // that is simply resting in the background memory!
            let didFetchPerform = false;

            try {
                didFetchPerform = true; // Yes, an active fetch is performing right now!
                const result = await searchProducts(debouncedQuery.trim());
                const rawProducts = result.products || [];

                // whitelist filtering to cross-match the with webshop product category range
                const secureFilteredResults = rawProducts.filter((product) =>
                    ALLOWED_CATEGORIES.includes(product.category)
                );

                if (isMounted) {
                    setSearchResults(secureFilteredResults);  

                    // LOOP-SECURE LIFECYCLE EVENT TRIGGER
                    // The asynchronous server fetch has completed and data has landed safely!
                    // 
                    // 1. didFetchPerform: Guard flag. Ensures we only trigger this if a real fetch 
                    //    just finished, preventing the menu from locking in an infinite closing loop.
                    // 2. onFetchComplete & typeof: Defensive guards. Verifies that a valid callback 
                    //    function was supplied by the parent to prevent throwing a runtime TypeError.
                    // 
                    // If all criteria are met, we execute the callback to let the calling component
                    // safely orchestrate its own post-fetch actions (like closing layout menus).
                    // =====================================================
                    if (didFetchPerform && onFetchComplete && typeof onFetchComplete === "function") {
                        onFetchComplete();
                    }

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

        return () => {
            isMounted = false;
        };

        // EFFECT DEPENDENCIES
        // - debouncedQuery: Fires the search whenever the user types a new word.
        // - onFetchComplete: Added to satisfy React's strict rules because it is used 
        //   inside the code block. 
        //   The function never changes during the program, and therefore it is 
        //   100% safe to include it in the array without the page starting to load forever in an infinite loop.
    }, [debouncedQuery, onFetchComplete]); 


    // DYNAMIC DERIVED STATE (Instant UI Wiper utilizing a Ternary Operator)
    // The conditional operator (? :) dynamically evaluates the search status in mid-air:
    // 
    // - Condition: (!searchQuery || searchQuery.trim() === "")
    //   Translates to: "Is the query completely empty OR (||) containing only blank spaces?"
    // - If True (? []): Wipes the screen instantly by returning an empty array.
    // - If False (: searchResults): Passes the validated API products safely to the UI grid.
    const finalResults = (!searchQuery || searchQuery.trim() === "")
            ? []
            : searchResults;
        

    return { searchResults: finalResults, loading, error };
}


