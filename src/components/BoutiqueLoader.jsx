import { Loader2 } from "lucide-react";

/* ----- COMPONENT: BoutiqueLoader (Atom) ----- */
// A unified, reusable loading state indicator designed to enforce 
// consistent luxury branding layout visual cues across the application.
// Accepts an optional message prop to deliver contextual feedback.
export default function BoutiqueLoader({message = "Loading premium boutique details..." }) {
    return (
        // Clean, vertical flex containers that ensure alignment between different layouts
        <div className="flex flex-col items-center justify-center py-24 text-brand w-full">
      
            {/* The animated layout visual cue anchor */}
            <Loader2 className="w-10 h-10 animate-spin mb-5" />
      
            {/* 
            FIXED FOR DYNAMIC TEXT LENGTHS:
            - text-center: For balance if the string wraps into multiple rows.
            - max-w-md: Limits long strings (like custom search logs) to break lines gracefully.
            - leading-relaxed: Adds breathing space in line height for readability in WCAG text!
            */}
            <p className="text-text-muted font-bold text-sm tracking-wide text-center max-w-md px-4 leading-relaxed">
                {message}
            </p>

        </div>
    );
}