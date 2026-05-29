import { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { ProductCard } from "../components/ProductCard";
import BoutiqueLoader from "../components/BoutiqueLoader";
import BoutiqueError from "../components/BoutiqueError";

export default function SearchView() {
  const [searchInput, setSearchInput] = useState("");

  const { searchResults, loading, error } = useSearch(searchInput);


  // INTERFACE SIGNALS
  // - isSearching: True as long as the input field contains actual text letters.
  // - hasResults: True when the backend pipeline holds validated product items.
  // =========================================================================
  const isSearching = searchInput.trim() !== "";
  const hasResults = searchResults && searchResults.length > 0;

  return (
    <section className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* Visual Header Grid Row */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-text-muted/10">
        <Search className="w-6 h-6 text-brand" />
        <h1 className="text-font-size-h1 font-black text-text-main tracking-tight">
          Search Boutique Catalogue
        </h1>
      </div>

      {/* LIVE SEARCH INPUT FIELD */}
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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand" />
      </div>

      {/* PHASE 1: LIFECYCLE INTERCEPTION - LOADING TIMERS */}
      {loading && (
        <BoutiqueLoader message={`Processing "${searchInput}" in 4000ms...`} />  
      )}

      {/* PHASE 2: LIFECYCLE INTERCEPTION - ERROR HANDLING */}
      {error && !loading && (
        <BoutiqueError title="Search Failure" message={error} />
        
      )}

        {/* PHASE 3: NO PRODUCTS FOUND NOTICE */}
        {/* Checks that text exists, loading is complete, but backend array is empty! */}
         {!hasResults && isSearching && !loading && (
          <div className="text-center py-10 bg-bg-card dark:bg-black/20 border border-text-muted/20 dark:border-white/20 rounded-2xl mb-14 animate-fade-in max-w-xl mx-auto px-6 shadow-sm">
            <p className="text-text-main dark:text-white font-black text-lg mb-1.5 tracking-tight">
              No products found
            </p>
            <p className="text-text-muted dark:text-white/80 text-sm font-medium leading-relaxed">
              We couldn't find any premium beauty items matching <span className="text-brand font-bold">"{searchInput}"</span>.
            </p>
          </div>
        )}


      {/* PHASE 4: MAIN INTERFACE RENDERING - RESULTS GRID */}
      {searchResults.length > 0 && !loading && (
        <>
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-text-muted/5 text-text-muted text-xs font-bold uppercase tracking-wider">
            <span>Displaying {searchResults.length} matching boutique results</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gap animate-fade-in">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

    </section>
  );
}
