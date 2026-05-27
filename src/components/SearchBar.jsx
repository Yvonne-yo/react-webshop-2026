import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react";

/* ----- COMPONENT SearchBar ----- */
// Search input form
// On form submit (enter or button click),
// it programmatically routes the user to the dynamic SearchResultView
export default function SearchBar( { value, onChange, onSubmit, isMobile = false } ) {
    // Dynamic layout positions (Mobile block spacing vs desktop placement)
    const containerClass = isMobile
        ? "block sm:hidden mt-6 relative"
        : "flex-grow max-w-xs relative hidden sm:block";

    const inputClass = "w-full bg-white/10 text-white placeholder-white/60 text-sm rounded-full py-1.5 pl-4 pr-10 border border-white/20 focus:outline-none focus:bg-white focus:text-brand-dark focus:placeholder-text-muted transition-all peer";

    const buttonClass = "absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white peer-focus:text-brand cursor-pointer flex items-center justify-center";   
    
    return(
        <form onSubmit={onSubmit} className={`${containerClass} focus-within:text-brand`} role="Search">
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
