import { useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ----- GSM PROVIDER COMPONENT: ThemeProvider ----- */
// Provider of the light and dark mode application features.
//
// ARCHITECTURAL THEME PRIORITY HIERARCHY:
// To ensure the ultimate user experience, the theme initialization follows a strict hierarchy:
// 1. First priority: It checks localStorage for an explicit, user-selected theme preference.
// 2. Second priority (Fallback): If no saved preference exists, it executes a backup check 
//    reading the operating system value (OS preference) via matchMedia to automatically align the shop.

export default function ThemeProvider({ children }) {
  // THEME INITIALIZATION LAYER
  // Executes an arrow function once upon mounting to secure a valid startup value.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("YoYo_webshop_theme");
    const validThemes = ["light", "dark"];

    // Defensive validation: Only accept hardcoded valid design strings. 
    // Bypasses and heals the state array if external local storage values are corrupted.
    if (savedTheme && validThemes.includes(savedTheme)) {
      return savedTheme;
    }

    // Operating System Fallback Check
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  });

  // PERSISTENT STORAGE & DOM SYNCHRONIZATION
  // Fires automatically every time the theme state changes to update the viewport canvas.
  useEffect(() => {
    const root = window.document.documentElement;     // Assigns root directly to the <html> element

    if (theme === "dark"){
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");        // Synchronizes with index.css selectors to activate dark mode colors
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    localStorage.setItem("YoYo_webshop_theme", theme);

  }, [theme]);    // useEffect dependency set to "theme"

 
  // INTERACTIVE THEME TOGGLE METHOD
  // Toggles the theme between dark and light mode. 
  // Invoked by the sun/moon button inside the webshop navbar.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  
  return(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
