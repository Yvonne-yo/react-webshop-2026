import { useContext} from "react";
import { CartContext } from "../context/CartContext";

export function useCart() {
    // Use the React useContext hook to extract the values from CartContext
    const context = useContext(CartContext);

    // Extra check that the hook is used correctly and avoid runtime error.
    // Check if context is undefined, if so it means that the component trying to 
    // use this hook is placed outside the <CartProvider> in the component tree.
    if (!context) {
        throw new Error("Error: useCart must be used within a CartProvider");
    }

    return context;
}
