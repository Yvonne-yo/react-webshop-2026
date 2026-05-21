import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ALLOWED_CATEGORIES } from "../config/shopConfig";
import logoButterfly from "../assets/YoYo_butterfly_only_200x199.jpg";
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
function LogoLink({ onClick}) {
    return (
        <Link to="/" onClick={onClick} className="flex items-center gap-3 cursor-pointer select-none">
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
function DropdownMenu({ isOpen, onClose, searchQuery, setSearchQuery, handleSearchSubmit}) {
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
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={handleSearchSubmit}
                isMobile={true}
            />

            {/* A clean, structured block for all your shop routing links */}
            <div className="flex flex-col gap-1.5">
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
export function NavBar(){
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching product catalog for: ", searchQuery);
    };

    return(
        <>
            <header className="sticky top-0 z-40 bg-brand border-b border-black/10 shadow-md 
                                transition-colors duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

                    {/* Brand Logo anchor block */}
                    <LogoLink onClick={closeMenu} />

                    {/* Global desktop SearchBar */}
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    handleSearchSubmit={handleSearchSubmit}
                />

            </header>
        </>
    );
};

