"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const { items, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            My Wishlist ({wishlistCount})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Keep track of items you love and add them to your cart when ready.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-4 py-2.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            Add All to Cart
          </button>
        )}
      </div>

      {/* Wishlist Items Grid or Empty State */}
      {items.length === 0 ? (
        <div className="bg-[#FFFDF8] rounded-2xl p-12 text-center border border-[#EDE4D5] max-w-xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Click the heart icon on any product card while browsing to save your favorite items here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#064B35] text-white text-xs font-bold rounded-lg hover:bg-[#0B6B47] transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
