import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThemeProvider from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import CategoryView from "./views/CategoryView";
import ContactView from "./views/ContactView";
import SearchView from "./views/SearchView";

/* ----- COMPONENT: App (Root Orchestrator) ----- */
//  Sets up the high-level infrastructure including global themes and 
//  coordinates the primary client-side declarative router layout paths tree.

export default function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <MainLayout>
            
            {/* ----- Routes matching navbar and dropdown menu links -----  */}
            <Routes>
              {/* The root path / to webshop homepage view */}
              <Route path="/" element={<HomeView />} />

              {/* Dynamic category view route skeleton */}
              {/* The colon (:) tells React Router that categoryName is a variable URL parameter */}
              <Route path="/category/:categoryName" element={<CategoryView />} />

              {/* Search view */}
              <Route path="/search" element={<SearchView />} />

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
