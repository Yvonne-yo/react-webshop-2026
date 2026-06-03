import { useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ----- CUSTOM HOOK useTheme ----- */

export function useTheme() {
    // Use the React useContext hook to extract the values from ThemeContext
    const context = useContext(ThemeContext);

    // Extra check to ensure the hook is used correctly and to avoid runtime errors.
    // Checks if context is undefined. If so, it means that the component trying to 
    // use this hook is placed outside the <ThemeProvider> in the component tree.
    if (!context) {
        throw new Error("Error: useTheme must be used within a ThemeProvider");
    }

    return context;
}

