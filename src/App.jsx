import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";

import MainLayout from "./layout/MainLayout";

import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import ContactView from "./views/ContactView";



export default function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <MainLayout>
            
            {/* ----- Routes matching navbar links -----  */}
            <Routes>
              {/* The root path / to webshop homepage view */}
              <Route path="/" element={<HomeView />} />

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
