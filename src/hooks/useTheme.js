import { useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
    // Use the React useContext hook to extract the values from ThemeContext
    const context = useContext(ThemeContext);

    // Extra check that the hook is used correctly and avoid runtime error.
    // Check if context is undefined, if so it means that the component trying to 
    // use this hook is placed outside the <THemeProvider> in the component tree.
    if (!context) {
        throw new Error("Error: useTheme must be used within a ThemeProvider");
    };

    return context;
}
