import { NavBar } from "./NavBar";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";

/* ----- LAYOUT COMPONENT: MainLayout ----- */
// A layout component that sets up the main structure of the webshop.
// It wraps the entire application with a shared navigation bar and footer.

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Accessibility: skip-link functionality for keyboard users */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <NavBar />

            <div className="container mx-auto px-4 grow focus:outline-none">
                <MainContent>{children}</MainContent>
            </div>
            
            <Footer />
        </div>
    );
}
