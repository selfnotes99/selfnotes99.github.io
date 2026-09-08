"use client";

import React from "react";
import { Flame, Trophy } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function BestSellersPage() {
  const { products } = useProducts();
  const bestSellers = products.filter((p) => p.isBestSeller || p.badge === "Best Seller");

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="bg-[#FFF9EF] rounded-2xl p-8 sm:p-12 text-center mb-10 border border-[#EFE5D5]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#064B35] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-[#F5A623]" />
          <span>Top Customer Favorites</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-2">
          Best Sellers
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          The most coveted pieces loved by over 30,000 discerning shoppers.
        </p>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {bestSellers.slice(0, 3).map((product, idx) => (
          <div
            key={product.id}
            className="relative rounded-2xl p-1 bg-gradient-to-b from-[#F5A623] to-[#064B35]"
          >
            <div className="absolute -top-3 left-4 z-20 px-3 py-1 bg-[#111111] text-[#F5A623] text-xs font-black rounded-full shadow-md border border-[#F5A623]">
              RANK #{idx + 1}
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Remaining best sellers */}
      <h2 className="text-lg font-bold text-[#111111] mb-4">
        All Best-Selling Essentials
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {bestSellers.slice(3).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
