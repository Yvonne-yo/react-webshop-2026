import { useState, useEffect } from "react";

/* ----- CUSTOM HOOK useDebounce ----- */
// Delays [ms] the updating of a value until a specified timeout duration has passed.

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    
    // The debounce timer
    // Schedule a timer to push the latest raw input value into our internal 
    // debounced state only after the specified delay threshold (default 300ms) has passed.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

    // The essential debounce cleanup function
    // React fires this automatically on every single keyboard stroke!
    // It clears the previous timer, resetting our delay countdown window.
    // default delay = 300 ms
        return () => {
            clearTimeout(timer);
        }

    }, [value, delay]); // useEffect dependency

    return debouncedValue;
}