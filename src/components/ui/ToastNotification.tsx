"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export const ToastNotification: React.FC = () => {
  const { showToast, closeToast, lastAddedProduct, setIsCartOpen } = useCart();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast, closeToast]);

  if (!showToast || !lastAddedProduct) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3.5 max-w-sm flex items-center gap-3.5 ring-1 ring-black/5">
        {/* Product Thumbnail */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
          <Image
            src={lastAddedProduct.image}
            alt={lastAddedProduct.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#064B35]">
            <Check className="w-3.5 h-3.5 text-[#78B82A] stroke-[2.5]" />
            <span>Added to Cart!</span>
          </div>
          <p className="text-xs font-semibold text-[#111111] truncate">
            {lastAddedProduct.name}
          </p>
          <p className="text-[11px] text-gray-500 font-medium">
            {formatPrice(lastAddedProduct.price)}
          </p>
        </div>

        {/* Cart Action */}
        <button
          onClick={() => {
            closeToast();
            setIsCartOpen(true);
          }}
          className="px-3 py-1.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-[11px] font-bold rounded-lg shrink-0 transition-colors"
        >
          View Cart
        </button>

        {/* Dismiss */}
        <button
          onClick={closeToast}
          className="text-gray-400 hover:text-gray-600 p-1 -mr-1"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
