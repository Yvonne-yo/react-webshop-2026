import { NavBar } from "./NavBar";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";

export default function MainLayout({ children }) {

  return (
    <div className="min-h-screen flex flex-col">

      {/* Accessibility: skip-link functionality for keyboard users */}
      <a href="#main-content" className="skip-link">
           Skip to main content
      </a>

      <NavBar />

      <div id="main-content" className="grow focus:outline-none">
        <MainContent>{children}</MainContent>
      </div>

      <Footer />
      
    </div>
  );
}
