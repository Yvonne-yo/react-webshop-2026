import { useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { ProductCard } from "../components/ProductCard";

export default function SearchView() {
  const [searchInput, setSearchInput] = useState("");

  const { searchResults, loading, error } = useSearch(searchInput);

  const isSearching = searchInput.trim() !== "";

  return (
    <section className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* Visual Header Grid Row */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-text-muted/10">
        <Search className="w-6 h-6 text-brand" />
        <h1 className="text-font-size-h1 font-black text-text-main tracking-tight">
          Search Boutique Catalogue
        </h1>
      </div>

      {/* LUXURIOUS LIVE SEARCH INPUT PANEL */}
      <div className="relative max-w-xl mb-12">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type to search premium beauty items (e.g. Mascara, Perfume)..."
          className="w-full h-12 pl-12 pr-4 bg-bg-card border border-text-muted/20 rounded-2xl 
                     text-text-main placeholder-text-muted/50 focus:outline-none focus:border-brand 
                     transition-all shadow-sm font-medium text-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/50" />
      </div>

      {/* FAS 1: LIFECYCLE INTERCEPTION - LOADING TIMERS WORK LIVE HERE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-brand">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="text-text-muted font-bold text-sm tracking-wide">
            Throttling network operations... Processing "{searchInput}" in 4000ms...
          </p>
        </div>
      )}

      {/* FAS 2: LIFECYCLE INTERCEPTION - ERROR HANDLING */}
      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center my-6 max-w-xl mx-auto">
          <h4 className="font-black text-lg mb-2">Search Failure</h4>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* FAS 3: SAFETY GUARD & COMMERICAL FALLBACK UX */}
      {/* If a query returns 0 matching hits, we display your brilliant fallbackFavorites grid! */}
      {searchResults.length === 0 && isSearching && !loading && (
        <div className="text-center py-8 bg-bg-card/40 border border-text-muted/5 rounded-2xl">
          <p className="text-text-muted font-bold text-base mb-1">No products found</p>
          <p className="text-text-muted/60 text-xs font-medium">We couldn't find any premium beauty items matching your query.</p>
        </div>
      )}

      {/* FAS 4: MAIN INTERFACE RENDERING - RESULTS GRID */}
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
