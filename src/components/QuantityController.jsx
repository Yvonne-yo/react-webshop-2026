import { Plus, Minus } from "lucide-react";
import { MAX_ALLOWED_QUANTITY } from "../config/shopConfig"

/* ----- COMPONENT: QuantityController ----- */
// A reusable component that renders the plus and minus button panel and displays the current quantity.
// Used across multiple pages in the shop for a consistent design.
// It accepts quantity parameters and click functions as props, and delegates
// all cart updates back to the parent components that use it.

export default function QuantityController({ quantity, onIncrement, onDecrement, maxLimit = MAX_ALLOWED_QUANTITY, heightClass = "h-10"}) {

    return (
        <div className={`flex items-center justify-between bg-brand border border-brand rounded-lg 
                        overflow-hidden shadow-xs w-full transition-all duration-200 ${heightClass}`}
        >

            {/* Decrement: Minus button to decrease the quantity value */}
            <button
                onClick={onDecrement}
                className="w-12 h-full flex items-center justify-center text-white/90 hover:text-white hover:bg-brand-dark transition-colors cursor-pointer"
                aria-label={quantity === 1
                    ? "Decrease quantity to zero"
                    : "Decrease item quantity by one"}
            >
                <Minus className="w-4 h-4 stroke-3" />
                
            </button>   
            
            {/* Displays the current quantity count centered inside the panel */}
            <div className="flex-1 h-full flex items-center justify-center font-black text-sm text-white select-none whitespace-nowrap bg-brand-dark/20 border-x border-white/10">
                {quantity}
            </div>

            {/* Increment: Plus button to increase quantity (Automatically disabled when reaching the maxLimit prop value) */}
            <button
                onClick={onIncrement}
                disabled={quantity >= maxLimit}
                className="w-12 h-full flex items-center justify-center text-white/90 hover:text-white hover:bg-brand-dark transition-colors 
                            disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer"
                aria-label="Increase item quantity by one"
            >
                <Plus className="w-4 h-4 stroke-3" />
            </button>
        </div>
    );
}