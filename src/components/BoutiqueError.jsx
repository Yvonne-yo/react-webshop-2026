import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/* ----- COMPONENT: BoutiqueError (Atom) ----- */
// A unified, reusable error state interface designed to isolate 
// network failures or missing catalogue entities under a cohesive layout.
// Accepts optional title and message props to deliver contextual feedback.
export default function BoutiqueError({
    title = "Boutique Interruption",
    message = "The requested storefront resource is currently unavailable." 
}) {
    return (
        <div className="container mx-auto px-4 py-16 text-center max-w-xl animate-fade-in">
      
            {/* Visual Error Panel Context Container */}
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl mb-6 shadow-sm">
                <h4 className="font-black text-lg mb-2">
                    {title}
                </h4>
                <p className="text-sm font-medium leading-relaxed">
                    {message}
                </p>
            </div>

            {/* Safe navigational anchor routing back to main hub */}
            <Link 
                to="/" 
                className="text-brand hover:underline font-bold text-sm inline-flex items-center gap-2 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Return to boutique home
            </Link>
    </div>
    ); 
}