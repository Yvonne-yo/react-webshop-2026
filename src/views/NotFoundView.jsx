import ReturnToHomeLink from "../components/ReturnToHomeLink";

/* ----- VIEW COMPONENT: NotFoundView ----- */
// Catch-All Route: Renders a fallback page if the URL path does not exist.

export default function NotFoundView() {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-md transition-opacity duration-300 ease-out">
      
      <h2 className="text-3xl font-black text-text-main tracking-tight mb-3">
        Page Not Found
      </h2>
      
      <p className="text-text-muted text-sm font-medium leading-relaxed mb-8">
        The web address you requested does not exist or has been moved.
      </p>
      
      <div className="flex justify-center">
        <ReturnToHomeLink />
      </div>

    </div>
  );
}

