
/* ----- LAYOUT COMPONENT: MainContent ----- */
// A simple wrapper component that holds the unique content for each page.
// Note: The id="main-content" is added as a preparation for accessibility (WCAG).
// It allows screen readers or keyboard users to skip past the navigation menus 
// and jump straight to the main text.

export function MainContent ({ children }){
    return (
        <div>
            <main id="main-content" className="grow focus:outline-none">
                {children}
            </main>
        </div>
    );
}