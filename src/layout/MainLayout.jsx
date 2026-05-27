import { NavBar } from "./NavBar";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";

export default function MainLayout({ children, searchQuery, setSearchQuery }) {

  return (
    <div className="min-h-screen flex flex-col">

      {/* Accessibility: skip-link functionality for keyboard users */}
      <a href="#main-content" className="skip-link">
           Skip to main content
      </a>

      {/* Feeding the search variables straight down into the NavBar wrapper */}
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div id="main-content" className="container mx-auto px-4 grow focus:outline-none">
        <MainContent>{children}</MainContent>
      </div>

      <Footer />
      
    </div>
  );
}
