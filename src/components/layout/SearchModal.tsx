"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query, products]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = ["Sneakers", "Backpack", "Hoodie", "Sunglasses", "Watch", "Candle"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 md:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search premium products, categories, or collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base md:text-lg outline-none text-[#111111] placeholder:text-gray-400 bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs font-medium px-3 py-1.5 bg-[#F3F8E8] text-[#064B35] rounded-full hover:bg-[#EAF4D5] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results list */}
        {query && results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 p-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFFDF8] transition-colors group"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#064B35] font-medium">{product.category}</p>
                  <p className="text-sm font-semibold text-[#111111] truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 font-semibold">{formatPrice(product.price)}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#064B35] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm">No products found for &ldquo;{query}&rdquo;.</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for &quot;Backpack&quot;, &quot;Sneakers&quot;, or &quot;Hoodie&quot;.</p>
          </div>
        )}

        {/* Footer link to full search */}
        {query && results.length > 0 && (
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#064B35] hover:underline inline-flex items-center gap-1"
            >
              View all search results for &ldquo;{query}&rdquo; <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
