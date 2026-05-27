import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThemeProvider from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import CategoryView from "./views/CategoryView";
import ContactView from "./views/ContactView";

export default function App() {
  // Coordingation of state at the root layer  
  // Declaring search at the absolute root allows NavBar(in MainLayout) and HomeView to stay synced.
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          {/* Pass the search variables into MainLayout so it can pass them on to NavBar  */}
          <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
            
            {/* ----- Routes matching navbar and dropdown menu links -----  */}
            <Routes>
              {/* The root path / to webshop homepage view */}
              {/* Pass the live search string into HomeView */}
              <Route path="/" element={<HomeView searchQuery={searchQuery} />} />

              {/* Dynamic category view route skeleton */}
              {/* The colon (:) tells React Router that categoryName is a variable URL parameter */}
              <Route path="/category/:categoryName" element={<CategoryView />} />

              {/* About and Contact views */}
              <Route path="/about" element={<AboutView />} />
              <Route path="/contact" element={<ContactView />} />

              {/* Cart checkout placeholder route */}
              <Route path="/cart" element={<CartView />} />

            </Routes>
            
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
