import { Plus, Minus } from "lucide-react";

/* ----- COMPONENT: QuantityController (Atom) ----- */
// A reusable inline quantity adjustment layout panel designed to enforce
// consistent branding interactive cues across diverse storefront.
// Accepts deterministic trigger hooks to delegate state mutations back to the core data layer.

export default function QuantityController({ quantity, onIncrement, onDecrement, maxLimit = 99}) {

    return (
        <div className="flex items-center justify-between bg-white dark:bg-black/10 border border-text-muted/20 
                        rounded-xl overflow-hidden shadow-xs h-10 w-full animate-fade-in"
        >

            {/* Decrement or complete removal action trigger hook */}
            <button
                onClick={onDecrement}
                className="w-12 h-full flex items-center justify-center text-text-muted hover:text-brand hover:bg-bg-card transition-colors cursor-pointer border-r border-text-muted/10"
                aria-label={quantity === 1
                    ? "Remove item from cart"
                    : "Decrease item quantity by one"}
            >
                <Minus className="w-3.5 h-3.5" />
                
            </button>   
            
            {/* Synchronized live text read-out feedback matrix pane */}
            <div className="flex-1 h-full flex items-center justify-center font-black text-sm text-text-main px-2 select-none whitespace-nowrap bg-bg-card/30">
                {quantity}
            </div>

            {/* Increment action trigger hook limited by threshold maxLimit */}
            <button
                onClick={onIncrement}
                disabled={quantity >= maxLimit}
                className="w-12 h-full flex items-center justify-center text-text-muted hover:text-brand hover:bg-bg-card transition-colors 
                            disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer border-l border-text-muted/10"
                aria-label="Increase item quantity by one"
            >
                <Plus className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}