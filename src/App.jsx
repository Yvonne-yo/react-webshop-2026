import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartProvider from "./components/CartProvider"
import ThemeProvider from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import CategoryView from "./views/CategoryView";
import ContactView from "./views/ContactView";
import ProductDetailView from "./views/ProductDetailView";
import SearchView from "./views/SearchView";

/* ----- COMPONENT: App (Root Orchestrator) ----- */
//  Sets up the high-level infrastructure, including global themes and global cart.
//  Coordinates the primary client-side declarative router layout paths tree.

export default function App() {

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <MainLayout>
              
              <Routes>
                {/* Dynamic routes syntax */}
                {/* The colon (:) tells React Router that categoryName is a variable URL parameter */}

                <Route path="/" element={<HomeView />} />

                <Route path="/about" element={<AboutView />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/category/:categoryName" element={<CategoryView />} />
                <Route path="/contact" element={<ContactView />} />
                <Route path="/products/:productId" element={<ProductDetailView />} />
                <Route path="/search" element={<SearchView />} />
                
              </Routes>
              
            </MainLayout>
          </BrowserRouter>
        </CartProvider>  
      </ThemeProvider>
    </>
  );
}
