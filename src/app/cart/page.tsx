"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Truck, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";

export default function CartPage() {
  const { products } = useProducts();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    amountAwayFromFreeShipping,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    const code = promoCode.trim().toUpperCase();
    if (code === "WELCOME10") {
      setDiscountPercent(10);
      setPromoSuccess("10% discount applied!");
    } else if (code === "RETAIL20") {
      setDiscountPercent(20);
      setPromoSuccess("20% discount applied!");
    } else {
      setPromoError("Invalid code. Try 'WELCOME10' for 10% off.");
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const recommendedProducts = products.slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-6">
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="bg-[#FFFDF8] rounded-2xl p-12 text-center border border-[#EDE4D5] max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Your cart is currently empty
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Looks like you haven&apos;t added any premium essentials yet. Explore our curated collections to get started!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#064B35] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-[#0B6B47] transition-all"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Table / List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Meter */}
            <div className="bg-[#F3F8E8] rounded-xl p-4 border border-[#EAF4D5]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#064B35] mb-2">
                <Truck className="w-4 h-4 text-[#78B82A]" />
                {amountAwayFromFreeShipping > 0 ? (
                  <span>
                    Add <strong>{formatPrice(amountAwayFromFreeShipping)}</strong> more to get <strong>FREE SHIPPING!</strong>
                  </span>
                ) : (
                  <span>
                    🎉 You have unlocked <strong>FREE Standard Shipping!</strong>
                  </span>
                )}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#78B82A] transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / freeShippingThreshold) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Items Card List */}
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-3.5 sm:p-5 flex gap-3 sm:gap-4 items-center">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Title & Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#064B35] uppercase">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="block text-sm font-bold text-[#111111] hover:text-[#064B35] transition-colors truncate"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.selectedColor} • {item.selectedSize}
                    </p>
                    <p className="text-xs font-semibold text-gray-700 sm:hidden mt-1">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>

                  {/* Stepper */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-9">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2.5 h-full hover:bg-gray-200 text-gray-600 text-xs font-bold"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold text-gray-900 select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2.5 h-full hover:bg-gray-200 text-gray-600 text-xs font-bold"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px] sm:min-w-[90px]">
                    <p className="text-sm font-bold text-[#111111]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart button */}
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/shop"
                className="text-xs font-bold text-[#064B35] hover:underline"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:underline font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#FFFDF8] rounded-2xl p-6 border border-[#EDE4D5] space-y-5 sticky top-24">
              <h2 className="text-base font-extrabold text-[#111111] uppercase tracking-wider pb-3 border-b border-[#E8DEC8]">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (try WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#064B35]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-500 font-medium">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-[11px] text-[#064B35] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {promoSuccess}
                  </p>
                )}
              </form>

              {/* Price Details */}
              <div className="space-y-2.5 text-xs pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#064B35] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-[#E8DEC8] flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-[#111111]">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-3 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Recommended additions */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-[#111111] mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
