import { createContext } from "react";

/* ----- CONTEXT: ThemeContext ----- */

// Creates the Theme context with a default undefined value.
// Note: This forces a crash check inside the useTheme.js hook if a component 
// attempts to read the Theme outside of a valid ThemeProvider wrapper.
export const ThemeContext = createContext(undefined);