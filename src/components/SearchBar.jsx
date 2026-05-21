import { Search } from "lucide-react";

/* ----- COMPONENT SearchBar ----- */
/* Reusable search input field.    */
export default function SearchBar( { value, onChange, onSubmit, isMobile = false } ) {
    // Dynamic design layouts depending on navbar or sidebar usage
    const containerClass = isMobile
        ? "block sm:hidden mt-6 relative"
        : "flex-grow max-w-xs relative hidden sm:block";

    const inputClass = isMobile
            ? "w-full bg-bg-main text-text-main placeholder-text-muted text-sm rounded-full py-2 pl-4 pr-10 border border-text-muted/20 focus:outline-none focus:border-brand transition-all"
            : "w-full bg-white/10 text-white placeholder-white/60 text-sm rounded-full py-1.5 pl-4 pr-10 border border-white/20 focus:outline-none focus:bg-white focus:text-text-main focus:placeholder-text-muted transition-all";

    const buttonClass = isMobile
        ? "absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main cursor-pointer flex items-center justify-center"
        : "absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:text-text-main cursor-pointer flex items-center justify-center";

    
    return(
        <form onSubmit={onSubmit} className={containerClass} role="Search">
            <label htmlFor={isMobile ? "mobile-search" : "desktop-search"} className="sr-only" >
                Search our products
            </label>

            <input 
                id={isMobile ? "mobile-search" : "desktop-search"} 
                type="text" 
                value={value}
                onChange={onChange}
                placeholder="Search products..."
                className={inputClass}
            />

            <button type="submit" className={buttonClass}>
                <Search className="w-4 h-4" />
                {/* Accessibility support for screen readers */}
                <span className="sr-only">Submit search query</span>
            </button>
        </form>
    );
};
