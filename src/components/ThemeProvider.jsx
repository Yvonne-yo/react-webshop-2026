import { useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ----- PROVIDER COMPONENT: ThemeProvider ----- */
// Provider of light/dark mode feature.
export default function ThemeProvider({ children }) {
  // Initiate state by using an arrow function that will only execute once, when the component is mounted.
  // Theme will always be intiated by valid values "dark" or "light" , from localStorage or OS.
  // First check: localStorage. If the user has made a selection previously, a value to be used is stored here.
  // A validation is made to make sure that only a valid value is returned. Avoiding manipulated values.
  // Second check: let the browser ask the OS if the user has set the system to dark mode. The second check
  // will return dark or light.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("YoYo_webshop_theme");
    const validThemes = ["light", "dark"];

    // Defensive validation to ensure only a valid value is returned, avoiding corrupted data.
    if (savedTheme && validThemes.includes(savedTheme)) {
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  });

  // useEffect executes every time the state "theme" changes.
  // Set the new value to the <html> element and save the new value to localStorage
  useEffect(() => {
    const root = window.document.documentElement;     // root is assigned to the <html> element

    if (theme === "dark"){
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");        // sometimes needed for external libraries
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    localStorage.setItem("YoYo_webshop_theme", theme);

  }, [theme]);    // useEffect dependency set to "theme"

 
  // function that toggles the "theme", will be used by a button in webshop navbar
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  
  return(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
