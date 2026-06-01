// src/components/ReturnToHomeLink.jsx
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* ----- COMPONENT: ReturnToHomeLink (Atom) ----- */
// A reusable structural anchor link designed to navigate the user
// fluidly back to the webshop home.

export default function ReturnToHomeLink() {
  return (
    <Link 
      to="/" 
      className="text-brand hover:underline font-bold text-sm inline-flex items-center gap-2 transition-colors duration-200 select-none cursor-pointer"
      aria-label="Return to boutique home."
    >
      <ArrowLeft className="w-4 h-4" /> Return to boutique home
    </Link>
  );
}
