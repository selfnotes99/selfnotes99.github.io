"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, ArrowRight } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function FAQsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [openId, setOpenId] = useState<string>("faq-1");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Orders", "Shipping", "Returns", "Payment", "Products"];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCat !== "All" && faq.category !== selectedCat) return false;
    if (
      searchQuery &&
      !faq.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-3.5 py-1 rounded-full">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-3 mb-2">
          How Can We Help You?
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          Find instant answers to common questions about orders, shipping rates, product sizing, and returns.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search question keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs sm:text-sm outline-none focus:border-[#064B35] shadow-xs"
        />
      </div>

      {/* Category Pills */}
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

      {/* Accordion List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 divide-y divide-gray-100 shadow-xs">
        {filteredFaqs.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-xs">
            No questions matched your search query. Try typing another term.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#064B35] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#064B35]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Contact box */}
      <div className="bg-[#FFF9EF] rounded-2xl p-6 sm:p-8 border border-[#EFE5D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-base text-gray-900">
            Still Have Questions?
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Our 24/7 concierge support team is always available to assist.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          Contact Concierge
        </Link>
      </div>
    </div>
  );
}
