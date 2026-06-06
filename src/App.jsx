import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartProvider from "./components/CartProvider";
import ThemeProvider from "./components/ThemeProvider";
import MainLayout from "./layout/MainLayout";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import CategoryView from "./views/CategoryView";
import CheckoutView from "./views/CheckoutView";
import ContactView from "./views/ContactView";
import ProductDetailView from "./views/ProductDetailView";
import SearchView from "./views/SearchView";
import NotFoundView from "./views/NotFoundView";

/* ----- COMPONENT: App ----- */
// Sets up the main infrastructure, including global states (ThemeProvider and CartProvider)
// Single Page Application via React Router.

export default function App() {

  return (
    <>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <MainLayout>
              
              <Routes>
                {/* Dynamic routes syntax */}
                {/* The colon (:) tells React Router that categoryName and productId are variable URL parameter */}

                <Route path="/" element={<HomeView />} />

                <Route path="/about" element={<AboutView />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/category/:categoryName" element={<CategoryView />} />
                <Route path="/checkout" element={<CheckoutView />} />
                <Route path="/contact" element={<ContactView />} />
                <Route path="/products/:productId" element={<ProductDetailView />} />
                <Route path="/search" element={<SearchView />} />
                
                {/* Catch-All Fallback Route */}
                <Route path="*" element={<NotFoundView />} />

              </Routes>
              
            </MainLayout>
          </BrowserRouter>
        </CartProvider>  
      </ThemeProvider>
    </>
  );
}
