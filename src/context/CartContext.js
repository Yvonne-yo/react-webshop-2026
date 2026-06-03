import { createContext } from "react";

/* ----- CONTEXT: CartContext ----- */
// Initializes the global context instance for the shopping cart subsystem.
//
// DESIGN NOTE: Initialized strictly to 'undefined' rather than a mock object.
// This acts as a defensive blueprint safety layer. It allows custom hooks (like useCart) 
// to instantly verify if a consuming component is safely wrapped inside the CartProvider. 
// If accessed outside the provider boundary, it will immediately catch the undefined 
// fallback and throw a clear error instead of failing silently.

export const CartContext = createContext(undefined);