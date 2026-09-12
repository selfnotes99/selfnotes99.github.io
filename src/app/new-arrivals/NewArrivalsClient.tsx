"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function NewArrivalsClient() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const newProducts = products.filter((p) => p.isNew || p.badge === "New");

  const filtered = selectedCategory === "all"
    ? newProducts
    : newProducts.filter((p) => p.categorySlug === selectedCategory);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="bg-[#EAF4D5] rounded-2xl p-8 sm:p-12 text-center mb-10 border border-[#D5E6B8]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#064B35] text-xs font-extrabold uppercase tracking-wider rounded-full mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#78B82A]" />
          <span>CBSE 2025 - 2026 Batch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064B35] tracking-tight mb-2">
          New Arrivals &amp; Latest CBSE Notes
        </h1>
        <p className="text-sm sm:text-base text-[#444444] max-w-md mx-auto">
          Fresh syllabus releases, updated diagram summaries, and latest study guides.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
