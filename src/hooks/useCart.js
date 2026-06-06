import { useContext } from "react";
import { CartContext } from "../context/CartContext";

/* ----- CUSTOM HOOK useCart ----- */

export function useCart() {
    // Use the React useContext hook to extract the values from CartContext
    const context = useContext(CartContext);

    // Extra check to see that the hook is used correctly and to avoid runtime errors.
    // Checks if context is undefined. If so, it means that the component trying to
    // use this hook is placed outside the <CartProvider> in the component tree.
    if (!context) {
        throw new Error("Error: useCart must be used within a CartProvider");
    }

    return context;
}

