import { useState, useEffect } from "react";

/* ----- CUSTOM HOOK: useDebounce ----- */
// Delays the updating of a value until a specified timeout duration has passed.

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    
    // The debounce timer
    // Sets up a timer that waits until the user has stopped typing for the 
    // specified delay time before updating the debounced value.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

    // The essential debounce cleanup function
        // Clears the previous timer on every keystroke to reset the countdown.
        // This prevents the search from firing until the user stops typing.
        return () => {
            clearTimeout(timer);
        };

    }, [value, delay]); 

    return debouncedValue;
}