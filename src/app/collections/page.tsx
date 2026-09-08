import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";

export default function CollectionsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3 py-1 rounded-full">
          Curated Series
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-3">
          Explore Our Collections
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          From warm seasonal layering to timeless full-grain Italian leather, discover handpicked capsules tailored for your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col, idx) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className={`group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-100 shadow-card hover:shadow-cardHover transition-all hover:-translate-y-1 ${
              idx === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/5] sm:aspect-square"
            }`}
          >
            <Image
              src={col.image}
              alt={col.name}
              fill
              className="object-cover opacity-80 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="text-xs font-bold text-[#78B82A] uppercase tracking-wider">
                {col.itemCount} Curated Pieces
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                {col.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mt-1 mb-4 line-clamp-2">
                {col.description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#78B82A] transition-colors">
                <span>Shop This Capsule</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
