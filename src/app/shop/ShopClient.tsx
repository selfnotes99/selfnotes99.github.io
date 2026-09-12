"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, Star, ChevronDown } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/products/ProductCard";

export default function ShopClient() {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update selectedCategory if URL changes
  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
          return false;
        }
        // Price filter
        if (selectedPriceRange === "under-30" && p.price >= 30) return false;
        if (selectedPriceRange === "30-60" && (p.price < 30 || p.price > 60))
          return false;
        if (selectedPriceRange === "60-100" && (p.price < 60 || p.price > 100))
          return false;
        if (selectedPriceRange === "over-100" && p.price <= 100) return false;

        // Rating filter
        if (selectedRating && p.rating < selectedRating) return false;

        // In Stock filter
        if (inStockOnly && p.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (a.featuredOrder || 99) - (b.featuredOrder || 99);
      });
  }, [
    products,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedRating(null);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#064B35] font-semibold">Shop All Products</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              All Notes &amp; Products
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} curated CBSE notes and student essentials
            </p>
          </div>

          {/* Sort dropdown & Mobile filter trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-[#111111] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-[#111111] outline-none focus:border-[#064B35] cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 select-none">
          <div className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#EDE4D5] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DEC8]">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#064B35]" /> Filters
              </h3>
              {(selectedCategory !== "all" ||
                selectedPriceRange !== "all" ||
                selectedRating !== null ||
                inStockOnly) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#F4512A] font-bold hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Category
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#064B35] text-white font-bold"
                      : "text-gray-700 hover:bg-[#F3F8E8] hover:text-[#064B35]"
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => p.categorySlug === cat.slug
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-[#064B35] text-white font-bold"
                          : "text-gray-700 hover:bg-[#F3F8E8] hover:text-[#064B35]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#E8DEC8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under Rs 30", value: "under-30" },
                  { label: "Rs 30 to Rs 60", value: "30-60" },
                  { label: "Rs 60 to Rs 100", value: "60-100" },
                  { label: "Over Rs 100", value: "over-100" },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#064B35]"
                  >
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                      className="accent-[#064B35]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="pt-4 border-t border-[#E8DEC8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Customer Rating
              </h4>
              <div className="space-y-1 text-xs">
                {[5, 4.8, 4.5].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() =>
                      setSelectedRating(
                        selectedRating === ratingVal ? null : ratingVal
                      )
                    }
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedRating === ratingVal
                        ? "bg-[#EAF4D5] text-[#064B35] font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center text-[#F5A623]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#F5A623] text-[#F5A623]"
                        />
                      ))}
                    </div>
                    <span>{ratingVal}+ Stars</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock status toggle */}
            <div className="pt-4 border-t border-[#E8DEC8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-[#064B35] w-4 h-4"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid (9 cols) */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FFFDF8] rounded-2xl p-12 text-center border border-[#EDE4D5]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No matching products found
              </h3>
              <p className="text-xs text-gray-500 mb-5 max-w-sm mx-auto">
                Try adjusting your price range, category, or rating filters to see more results.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#064B35] text-white text-xs font-bold rounded-lg hover:bg-[#0B6B47] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="font-bold text-base text-[#111111]">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile categories */}
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Category</h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`block w-full text-left py-1.5 px-2 rounded ${
                      selectedCategory === "all" ? "bg-[#064B35] text-white font-bold" : "text-gray-700"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left py-1.5 px-2 rounded ${
                        selectedCategory === cat.slug ? "bg-[#064B35] text-white font-bold" : "text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-[#064B35] text-white font-bold text-xs rounded-xl mt-4"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
