"use client";

import React, { useState } from "react";
import { Gift, Check, Sparkles, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [purchased, setPurchased] = useState(false);

  const amounts = [25, 50, 100, 150];

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;
    setPurchased(true);
    setTimeout(() => setPurchased(false), 3500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          The Gift of Choice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          ShopifyRetail Digital Gift Cards
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Delivered instantly via email with no expiration date or added fees. Perfect for any lifestyle celebration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
          <form onSubmit={handlePurchase} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Select Gift Card Amount
              </label>
              <div className="grid grid-cols-4 gap-2.5 mb-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-xl text-sm font-black transition-all ${
                      amount === amt && !customAmount
                        ? "bg-[#064B35] text-white shadow-sm"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">$</span>
                <input
                  type="number"
                  placeholder="Or enter custom amount (e.g. 75)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full text-xs pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                />
              </div>
            </div>

            {/* Recipient details */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient's Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recipient@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Personal Note (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Wishing you a wonderful celebration! Enjoy picking out something you love..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl outline-none focus:border-[#064B35]"
                />
              </div>
            </div>

            {/* Action */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              {purchased ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Gift Card Added to Order!</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Send Gift Card • {formatPrice(effectiveAmount)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Live Interactive Card Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Live Card Preview
          </h3>

          <div className="relative aspect-[1.6/1] rounded-3xl p-6 sm:p-8 bg-gradient-to-tr from-[#064B35] via-[#0B6B47] to-[#128156] text-white shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -left-12 -top-12 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold tracking-tight">
                Shopify<span className="text-[#78B82A]">Retail</span>
              </span>
              <Sparkles className="w-5 h-5 text-[#78B82A]" />
            </div>

            <div>
              <p className="text-[11px] text-white/70 uppercase tracking-widest font-semibold">
                Digital Gift Card
              </p>
              <p className="text-3xl sm:text-4xl font-black mt-1">
                {formatPrice(effectiveAmount)}
              </p>
            </div>

            <div className="text-xs text-white/90 space-y-1">
              <p className="font-semibold truncate">
                For: {recipientName || "Valued Recipient"}
              </p>
              {message && (
                <p className="text-[11px] text-white/75 italic line-clamp-1">
                  &ldquo;{message}&rdquo;
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#FFFDF8] rounded-2xl p-4 border border-[#EDE4D5] text-xs text-gray-600 space-y-1.5">
            <p className="font-bold text-gray-900">How redemption works:</p>
            <p>1. Recipient receives a branded gift email immediately with their unique 16-digit code.</p>
            <p>2. Applies instantly toward any product or collection at checkout.</p>
            <p>3. Balances never expire and carry over across multiple visits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
