import { Loader2 } from "lucide-react";

/* ----- COMPONENT: BoutiqueLoader  ----- */
// A reusable loading spinner component used across different views in the shop.
// It accepts an optional message prop to display dynamic text while downloading data.

export default function BoutiqueLoader({message = "Loading premium boutique details..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-brand w-full">
      
            {/* Animated spinning loader icon */}
            <Loader2 className="w-10 h-10 animate-spin mb-5" />
      
            {/* Loader message */}
            <p className="text-text-muted font-bold text-sm tracking-wide text-center max-w-md px-4 leading-relaxed">
                {message}
            </p>

        </div>
    );
}