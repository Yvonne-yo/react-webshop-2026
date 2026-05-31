import { Plus, Minus } from "lucide-react";

/* ----- COMPONENT: QuantityController (Atom) ----- */
// A reusable inline quantity adjustment layout panel designed to enforce
// consistent branding interactive cues across diverse storefront.
// Accepts deterministic trigger hooks to delegate state mutations back to the core data layer.

export default function QuantityController({ quantity, onIncrement, onDecrement, maxLimit = 99, heightClass = "h-10"}) {

    return (
        <div className={`flex items-center justify-between bg-brand border border-brand rounded-lg 
                        overflow-hidden shadow-xs w-full animate-fade-in transition-all duration-200 ${heightClass}`}
        >

            {/* Decrement or complete removal action trigger hook */}
            <button
                onClick={onDecrement}
                className="w-12 h-full flex items-center justify-center text-white/90 hover:text-white hover:bg-brand-dark transition-colors cursor-pointer"
                aria-label={quantity === 1
                    ? "Remove item from cart"
                    : "Decrease item quantity by one"}
            >
                <Minus className="w-4 h-4 stroke-3" />
                
            </button>   
            
            {/* Synchronized live text read-out feedback matrix pane */}
            <div className="flex-1 h-full flex items-center justify-center font-black text-sm text-white select-none whitespace-nowrap bg-brand-dark/20 border-x border-white/10">
                {quantity}
            </div>

            {/* Increment action trigger hook limited by threshold maxLimit */}
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