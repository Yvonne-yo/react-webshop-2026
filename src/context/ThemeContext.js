import { createContext } from "react";

/* ----- CONTEXT: ThemeContext ----- */
// Initializes the global context instance for the light/dark mode functionality.
//
// DESIGN NOTE: Initialized strictly to 'undefined' instead of a mock object.
// This works as a safety check. It allows custom hooks (like useTheme) to verify 
// that a component is placed inside the ThemeProvider before trying to read the theme. 
// If it is used outside the provider, it will catch the undefined value and throw 
// a clear error immediately instead of failing silently.

export const ThemeContext = createContext(undefined);