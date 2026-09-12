"use client";

import React from "react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";

export default function SaleClient() {
  const { products } = useProducts();
  const saleItems = products.filter((p) => p.isSale || p.oldPrice || p.badge === "Sale");

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#FFF5E5] rounded-2xl p-8 sm:p-12 text-center mb-10 border border-[#FFD9B3]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F4512A] bg-white px-3 py-1 rounded-full shadow-xs">
          Special Offers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          CBSE Notes on Sale &amp; Bundled Offers
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Save on chapter bundles, combined subject editions, and digital study revision materials.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {saleItems.length} Products on Sale
        </span>
        <Link href="/shop" className="text-xs font-bold text-[#064B35] hover:underline">
          View Full Catalog →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {saleItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
