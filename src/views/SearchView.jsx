import { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { ProductCard } from "../components/ProductCard";
import BoutiqueLoader from "../components/BoutiqueLoader";
import BoutiqueError from "../components/BoutiqueError";

/* ----- VIEW COMPONENT: SearchView ----- */
// Handles the live product search layout.
// Note: Unlike other views, this component avoids early function returns so that the 
// search input field always remains visible and interactive on screen.

export default function SearchView() {
  const [searchInput, setSearchInput] = useState("");
  const { searchResults, loading, error } = useSearch(searchInput);


  // Derived State: Evaluates search status based on query values
  const isSearching = searchInput.trim() !== "";
  const hasResults = searchResults && searchResults.length > 0;

  return (
    <section className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-text-muted/10">
        <Search className="w-6 h-6 text-brand" />
        <h1 className="text-font-size-h1 font-black text-text-main tracking-tight">
          Search Boutique Catalogue
        </h1>
      </div>

      {/* Live search input field */}
      <div className="relative max-w-xl mb-12">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type to search premium beauty items (e.g. Mascara, Perfume)..."
          className="w-full h-12 pl-12 pr-4 bg-white border border-text-muted/20 rounded-2xl 
                     text-slate-900 placeholder-text-slate-500 focus:outline-none focus:border-brand 
                     transition-all shadow-sm font-medium text-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      </div>

      {/* Early Exit: loading */}
      {loading && (
        <BoutiqueLoader message={`Processing "${searchInput}" in 4000ms...`} />  
      )}

      {/* Early Exit: error handling */}
      {/* Checks: 1) Error exists, 2) Loading is complete */}
      {error && !loading && (
        <BoutiqueError title="Search Failure" message={error} /> 
      )}

      {/* Early Exit: no products found */}
      {/* Checks: 1) Results are empty, 2) User is searching, 3) Loading is complete */}
      {!hasResults && isSearching && !loading && (
      <div className="text-center py-10 bg-bg-card dark:bg-black/20 border border-text-muted/20 dark:border-white/20 rounded-2xl mb-14 transition-opacity duration-300 ease-out max-w-xl mx-auto px-6 shadow-sm">
        <p className="text-text-main dark:text-white font-black text-lg mb-1.5 tracking-tight">
          No products found
        </p>
        <p className="text-text-muted dark:text-white/80 text-sm font-medium leading-relaxed">
          We couldn't find any premium beauty items matching <span className="text-brand font-bold">"{searchInput}"</span>.
        </p>
      </div>
      )}


      {/* Main interface rendering of products in a grid */}
      {/* Checks: 1) Products exist, 2) Loading is complete */}
      {searchResults.length > 0 && !loading && (
        <>
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-text-muted/5 text-text-muted text-xs font-bold uppercase tracking-wider">
            <span>Displaying {searchResults.length} matching boutique results</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap transition-opacity duration-300 ease-out">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

    </section>
  );
}

