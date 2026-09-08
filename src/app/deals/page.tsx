"use client";

import React, { useState, useEffect } from "react";
import { Clock, Flame, Tag } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function DealsPage() {
  const { products } = useProducts();
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dealProducts = products.filter(
    (p) => p.isSale || p.oldPrice !== undefined || p.badge === "Sale"
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#F4512A] via-[#FF6A24] to-[#E55B1B] text-white rounded-3xl p-8 sm:p-12 text-center mb-10 shadow-lg relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider rounded-full mb-3">
          <Flame className="w-4 h-4 text-yellow-300" />
          <span>Limited Time Flash Sale</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
          Up to 50% OFF
        </h1>
        <p className="text-xs sm:text-base text-white/90 max-w-md mx-auto mb-6">
          Premium lifestyle goods at unrepeatable clearance pricing. When they&apos;re gone, they&apos;re gone!
        </p>

        {/* Live Countdown Timer */}
        <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
          <Clock className="w-5 h-5 text-yellow-300 animate-pulse" />
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="bg-black/50 px-2.5 py-1 rounded-lg text-lg font-mono">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span>:</span>
            <span className="bg-black/50 px-2.5 py-1 rounded-lg text-lg font-mono">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span>:</span>
            <span className="bg-black/50 px-2.5 py-1 rounded-lg text-lg font-mono">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#111111] flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#F4512A]" />
          <span>Active Flash Deals ({dealProducts.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {dealProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
