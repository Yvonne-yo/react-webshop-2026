
/* ----- LAYOUT COMPONENT: MainContent ----- */

export function MainContent ( {children} ){
    return(
        <div>
            <main id="main-content" className="grow focus:outline-none">
                {children}
            </main>
        </div>
    );
}