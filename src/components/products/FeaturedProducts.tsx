"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "./ProductCard";

export const FeaturedProducts: React.FC = () => {
  const { featuredProducts } = useProducts();
  const featured = featuredProducts.slice(0, 6);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🔥</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Featured Products
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-[13px] font-bold text-[#064B35] hover:text-[#0B6B47] flex items-center gap-1 group transition-colors"
        >
          <span>View all products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 6 Products Grid (6 cards in 1 row on desktop matching screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
