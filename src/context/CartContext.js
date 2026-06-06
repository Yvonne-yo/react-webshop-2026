import { createContext } from "react";

/* ----- CONTEXT: CartContext ----- */

// Creates the shopping Cart context with a default undefined value.
// Note: This forces a crash check inside the useCart.js hook if a component 
// attempts to read the Cart outside of a valid CartProvider wrapper.
export const CartContext = createContext(undefined);