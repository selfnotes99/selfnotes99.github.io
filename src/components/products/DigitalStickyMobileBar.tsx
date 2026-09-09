"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, ShoppingCart, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface DigitalStickyMobileBarProps {
  product: Product;
  onInstantCheckout: () => void;
  onAddToCart: () => void;
}

export const DigitalStickyMobileBar: React.FC<DigitalStickyMobileBarProps> = ({
  product,
  onInstantCheckout,
  onAddToCart,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down past hero image (280px)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-3 pt-2 pb-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.12)] animate-slideUp">
      {/* Micro Trust Header */}
      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 pb-1.5 mb-1.5 border-b border-gray-100">
        <span className="flex items-center gap-1 text-[#064B35]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#78B82A] animate-pulse" />
          Instant Download Ready
        </span>
        <span className="text-gray-400">
          ⚡ UPI / GPay / Cards Accepted
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Thumbnail & Price Info */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-gray-900 truncate leading-tight">
            {product.name}
          </h4>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-sm font-black text-[#064B35]">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-[9px] font-black text-[#F4512A] bg-red-50 px-1 py-0.2 rounded">
                {product.discount}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onAddToCart}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Add to cart"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>

          <button
            onClick={onInstantCheckout}
            className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#F4512A] to-[#FF6A24] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            <span>Instant Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
