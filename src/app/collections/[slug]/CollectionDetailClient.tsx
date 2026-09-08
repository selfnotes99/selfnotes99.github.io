"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "@/data/collections";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";

interface PageProps {
  params: { slug: string };
}

export default function CollectionDetailClient({ params }: PageProps) {
  const { products } = useProducts();
  const collection = collections.find((c) => c.slug === params.slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter(
    (p) => p.collectionSlug === collection.slug
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-center mb-10 bg-gray-900 text-white p-6 sm:p-10">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 max-w-xl">
          <div className="text-xs text-[#78B82A] font-bold uppercase tracking-wider mb-2">
            Collection • {collection.itemCount} Items
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Showing {collectionProducts.length} items
        </p>
        <Link href="/collections" className="text-xs font-bold text-[#064B35] hover:underline">
          ← View All Collections
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {collectionProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
