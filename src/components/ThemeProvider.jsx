import { useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ----- PROVIDER COMPONENT: ThemeProvider ----- */
// Provider for the global light/dark mode functionality
//
// Theme settings:
// Manual: Checks localStorage for a user-selected theme preference.
// System Fallback: Reads the operating system preference if no saved choice exists.

export default function ThemeProvider({ children }) {
  // Theme initialization: Sets the starting theme selection when the application loads
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("YoYo_webshop_theme");
    const validThemes = ["light", "dark"];

    // Only accept valid design strings to protect against corrupted data
    if (savedTheme && validThemes.includes(savedTheme)) {
      return savedTheme;
    }

    // Operating System Fallback Check (Media query activation via matchMedia)
    // Will always provide an answer and matches makes the answer true or false
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return systemPrefersDark ? "dark" : "light";
  });

  // Saves the theme selection to the HTML layout and localStorage
  useEffect(() => {
    const root = window.document.documentElement;     // Assigns root directly to the <html> element

    if (theme === "dark"){
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");        // Links with attribute selectors inside index.css
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    localStorage.setItem("YoYo_webshop_theme", theme);

  }, [theme]);

  
  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
