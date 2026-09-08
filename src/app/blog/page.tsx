"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Fashion", "Lifestyle", "Shopping", "Guides", "Trends"];

  const filteredPosts = selectedCat === "All"
    ? blogPosts
    : blogPosts.filter((b) => b.category === selectedCat);

  const featuredPost = blogPosts[0];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          The Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          Stories, Styling Guides &amp; Insights
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Curated perspectives on mindful living, capsule wardrobes, craftsmanship, and wellness.
        </p>
      </div>

      {/* Featured Lead Post */}
      {selectedCat === "All" && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block bg-[#FFFDF8] rounded-3xl overflow-hidden border border-[#EDE4D5] shadow-card hover:shadow-cardHover transition-all hover:-translate-y-1"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[21/11] lg:aspect-auto lg:h-full min-h-[280px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-0.5 bg-[#EAF4D5] text-[#064B35] font-extrabold rounded-md uppercase">
                  Featured • {featuredPost.category}
                </span>
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-[#064B35] transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                  <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} fill className="object-cover" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-gray-900">{featuredPost.author.name}</p>
                  <p className="text-[11px] text-gray-400">{featuredPost.date}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedCat === cat
                ? "bg-[#064B35] text-white shadow-xs"
                : "bg-[#FFFDF8] text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-cardHover hover:border-[#064B35] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-[#064B35] text-[10px] font-extrabold uppercase rounded-md shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#064B35] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                </div>
                <span className="text-[11px] font-medium text-gray-700">{post.author.name}</span>
              </div>
              <span className="text-xs font-bold text-[#064B35] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
