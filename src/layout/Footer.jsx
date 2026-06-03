import ReturnToHomeLink from "../components/ReturnToHomeLink";

/* ----- LAYOUT COMPONENT: Footer ----- */

export function Footer() {
  return (
    <footer className="w-full mt-auto">

      {/* /* ----- Global navigation return ----- */}
      <div className="container mx-auto px-4 py-6 flex justify-center border-t border-text-muted/5 bg-bg-main/50 transition-opacity duration-300 ease-out">
        <ReturnToHomeLink />

      </div>

      {/* ----- Footer ----- */}
      <div className="bg-brand dark:bg-brand-dark border-t border-black/10 py-6 text-center text-white/90 text-sm font-medium transition-colors duration-300">
          <p>&copy; {new Date().getFullYear()} YoYo Webshop. All rights reserved.</p>
      </div>
    </footer>
  );
}
