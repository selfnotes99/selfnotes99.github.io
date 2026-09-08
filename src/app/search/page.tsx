"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";

function SearchContent() {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const results = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Search Input */}
      <div className="max-w-xl mx-auto mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-4">
          Search Products
        </h1>
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keyword, product name, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:border-[#064B35] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs sm:text-sm text-gray-600">
          {query ? (
            <span>
              Showing results for &ldquo;<strong>{query}</strong>&rdquo; ({results.length} found)
            </span>
          ) : (
            <span>Showing all {results.length} products</span>
          )}
        </p>
      </div>

      {/* Grid or Empty */}
      {results.length === 0 ? (
        <div className="py-16 text-center text-gray-500 bg-[#FFFDF8] rounded-2xl border border-[#EDE4D5]">
          <p className="text-base font-semibold text-gray-800">No products matched your search.</p>
          <p className="text-xs text-gray-400 mt-1">Try searching for &quot;Backpack&quot;, &quot;Sneakers&quot;, or &quot;Watch&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-[1400px] mx-auto p-8 text-center text-xs">Searching products...</div>}>
      <SearchContent />
    </Suspense>
  );
}
