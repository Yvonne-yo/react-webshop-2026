import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";

import MainLayout from "./layout/MainLayout";

import AboutView from "./views/AboutView";
import CartView from "./views/CartView";
import ContactView from "./views/ContactView";
import HomeView from "./views/HomeView";


export default function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <MainLayout>
           <HomeView></HomeView>
           
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
