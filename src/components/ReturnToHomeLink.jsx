import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* ----- COMPONENT: ReturnToHomeLink ----- */
// A reusable link component designed to take the user back to the webshop home page.
// Used in multiple views across the shop for a consistent design.

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
