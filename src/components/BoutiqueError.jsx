import ReturnToHomeLink from "./ReturnToHomeLink";

/* ----- COMPONENT: BoutiqueError ----- */
// A reusable component used to display error messages when something goes wrong.
// It accepts title and message props to give specific feedback about network errors 
// or missing products, and includes a link back to HomeView.
export default function BoutiqueError({
    title = "Boutique Interruption",
    message = "The requested storefront resource is currently unavailable." 
}) {
    return (
        <div className="container mx-auto px-4 py-16 text-center max-w-xl transition-opacity duration-300 ease-out">
      
            {/* Visual error message box */}
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl mb-6 shadow-sm">
                <h4 className="font-black text-lg mb-2">
                    {title}
                </h4>
                <p className="text-sm font-medium leading-relaxed">
                    {message}
                </p>
            </div>

            {/* Link back to HomeView */}
            <div className="flex justify-center">
                <ReturnToHomeLink />
            </div>
    </div>
    ); 
}