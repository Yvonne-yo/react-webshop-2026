import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Menu, X } from "lucide-react";
import logoButterfly from "../assets/YoYo_butterfly_only_200x199.jpg";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";
import { useTheme } from "../hooks/useTheme";
import SearchBar from "../components/SearchBar";

/* Link and NavLink
    They both navigate to a new view in a SPA without reloading the browser.
    The difference lays in styling which effects UX and accessibility.
    Link: Used for general navigation where no visual feedback is needed
          (like logos, images or footer links).

    NavLink: Used specifically for menus. It automatically knows if its link
             is currently active and provides an "isActive" boolean property.
             This allows dynamically applied conditional styling (like underlines) 
             to show the user exactly which page they are visiting.
*/


/* ----- SUBCOMPONENT : LogoLink (Atom)----- */
// Render the brand logo and name, linking back to the homepage. 
function LogoLink({ onClick, setSearchQuery }) {
    const handleLogoClick = () => {
        // Instantly wipe out any text from the search field
        // Run the standard closeMenu function
        setSearchQuery("");
        onClick();
    }

    return (
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer select-none">
            <img 
                src={logoButterfly} 
                alt="YoYo Webshop Logo"
                className="w-9 h-9 object-contain rounded-md shadow-sm bg-white p-0.5" 
                width="36"
                height="36"    
            />
            <span className="font-bold text-white text-xl tracking-tight">
                YoYo Webshop
            </span>
        </Link>
    );
};

/* ----- SUBCOMPONENT : DropdownMenu (Organism) ----- */
// Render the responsive dropdown wrapper and its links tree hierarchy
function DropdownMenu({ isOpen, onClose, searchQuery, setSearchQuery, handleSearchChange, handleSearchSubmit}) {
    // If the menu is closed, render absolutly nothing
    if (!isOpen) return null;

    return(
        /* 
          MOBILE FIRST DESIGN:
          - Default (Mobile): Full width, stretches across the screen, left-aligned layout.
          - Desktop (lg:): Switches to an absolute floating box. Placed at the right corner, 
            locked to a professional 320px width (w-80), with an elegant shadow and rounded edges!
        */

        <nav className="w-full bg-brand-dark border-t border-white/10 px-4 py-6 flex flex-col gap-4 animate-fade-in
                        lg:absolute lg:right-4 lg:top-full lg:w-80 lg:rounded-2xl lg:shadow-2xl lg:border lg:border-white/10 lg:mt-2 ">

            {/* Mobile search bar – automatically hidden on desktops via the built-in SearchBar classes */}
            <SearchBar 
                value={searchQuery} 
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
                isMobile={true}
            />

            {/* A clean, structured block for all your shop routing links */}
            <div className="flex flex-col gap-1.5">
                <NavLink 
                    to="/"
                    end /* 'end' guarantees this only lights up when the path is exactly '/' */
                    onClick={() => {
                        setSearchQuery(""); // Clears the search field instantly
                        onClose();         // Closes the mobile dropdown menu drawer
                    }}
                    className={({ isActive }) => `text-white/80 font-black text-lg py-2 border-b border-white/10 transition-all pl-3 
                                    block hover:text-brand-light hover:translate-x-1
                    ${isActive ? "text-brand font-black bg-white/5 rounded-md pl-4 underline decoration-2 underline-offset-4" : ""}`}
                >
                    Home
                </NavLink>

                <Link 
                    to="/"
                    onClick={onClose}
                    className="text-white font-bold text-lg py-2 border-b border-white/10"
                >
                    All Products
                </Link>

                {/* Categories container list - using NavLink for smart active indicators */}
                <div className="flex flex-col gap-1 py-1">
                    {ALLOWED_CATEGORIES.map((category) => (
                        <NavLink
                            key={category}
                            to={`/category/${category}`}
                            onClick={onClose}
                            className={({isActive}) => `text-white/80 font-medium text-base py-1.5 capitalize transition-all pl-3 
                                                        block hover:text-white hover:translate-x-1
                                        ${isActive ? "text-white font-bold bg-white/5 rounded-md pl-4 underline decoration-2 underline-offset-4" : ""}`}
                        >
                            {category.replace("-", " ")}    
                        </NavLink>
                    ))}
                </div>

                 {/* Informational and support pages block */}
                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                    <Link
                        to="/about" 
                        onClick={onClose}
                        className="text-white font-bold text-base py-2"
                    >
                        About Us
                    </Link>

                    <Link
                        to="/contact"
                        onClick={onClose}
                        className="text-white font-bold text-base py-2"    
                    >
                        Contact Us
                    </Link>
                </div>
            </div>            
        </nav>
    );
};


/* ----- MAIN COMPONENT : NavBar (Orchestrator) ----- */
// Render the html-tag <header> which contains the webshop navigation bar
export function NavBar({ searchQuery, setSearchQuery }){
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Initialize router hook to be able to enforce redirects
    const navigate = useNavigate();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    
    /* ----- INTERCEPTION: handleSearchChange ----- */
    // Simply capture keyboard keystrokes and update the state synchronously.
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    /* ----- INTERCEPTION: handleSearchSubmit ----- */
    // When hitting Enter (or the mobile search button), the code prevents a standard browser refresh.
    // 
    // 1. GUARD CLAUSE (if): Evaluates if the query is empty or contains only spaces. If true, 
    //    the code executes an early "return" to halt the function on the spot. This blocks the webshop 
    //    from launching broken, empty redirect loops.
    // 2. SUCCESSFUL EXECUTION: If text exists, the guard is skipped, the dropdown menu closes,
    //    and programmatically routes the user to the SearchResultView
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (!searchQuery || searchQuery.trim() === "") {
            return;
        }

        closeMenu(); // Instantly close the dropdown menu panel at Enter or the Go/Searchbutton on mobile
        navigate(`/search/${searchQuery.trim()}`); // Redirection trigger, handled by BrowserRouter in App.jsx
    };

    return(
        <>
            <header className="sticky top-0 z-40 bg-brand border-b border-black/10 shadow-md 
                                transition-colors duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                    {/* Brand Logo anchor block */}
                    <LogoLink onClick={closeMenu} setSearchQuery={setSearchQuery} />

                    {/* Desktop SearchBar */}
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}
                        isMobile={false}
                    />

                    {/* Utility Controls (Cart, Theme toggle, Hamburger) */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Shopping Cart Link */}
                        <Link 
                            to="/cart"
                            onClick={closeMenu}
                            className="text-white/90 hover:text-white transition-colors p-2
                                        flex items-center justify-center relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="sr-only">Open shopping cart view</span>
                        </Link>

                        {/* Dark/Light mode button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white
                                        hover:text-white/20 transition-colors cursor-pointer
                                        flex items-center justify-center"
                        >
                            {theme === "dark"
                                ? <Sun  className="w-5 h-5 text-yellow-300 fill-yellow-300/10" />
                                : <Moon className="w-5 h-5 text-white fill-white/10" />
                            }
                            <span className="sr-only">
                                {theme === "dark"
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                            }
                            </span>
                        </button>


                        {/* Global menu trigger button, always visible */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white
                                        hover:bg-white/20 transition-colors cursor-pointer
                                        flex items-center justify-center"
                            aria-expanded={isMenuOpen}
                        >

                            {isMenuOpen 
                                ? (<X    className="w-5 h-5 transition-transform duration-300 rotate-90" />)
                                : (<Menu className="w-5 h-5 transition-transform duration-300" />)
                            }

                            <span className="sr-only">Toggle navigation menu</span>
                        </button>
                    </div>
                
                </div>

                {/* Clean dropdown menu orchestrator */}
                <DropdownMenu 
                    isOpen={isMenuOpen}
                    onClose={closeMenu}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearchChange={handleSearchChange}
                    handleSearchSubmit={handleSearchSubmit}
                />

            </header>
        </>
    );
};

