"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, ArrowRight } from "lucide-react";
import { faqs } from "@/data/faqs";

export default function FaqsClient() {
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
          Find instant answers to common questions about orders, digital notes downloads, study materials, and returns.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by keyword, topic or question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#064B35] shadow-xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? "bg-[#064B35] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
            <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-700">No matching questions found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try searching with different keywords or contact our support team.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl overflow-hidden transition-colors bg-white"
              >
                <button
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111111] hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#064B35]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FFFDF8]">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-[#064B35] bg-[#EAF4D5] px-2 py-0.5 rounded">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help banner */}
      <div className="bg-[#FFF9EF] rounded-2xl p-6 sm:p-8 text-center border border-[#EFE5D5]">
        <h3 className="text-lg font-bold text-[#111111] mb-2">Still have questions?</h3>
        <p className="text-xs text-gray-600 max-w-sm mx-auto mb-4">
          Our dedicated student support team is available 24/7 to help you with instant order queries and notes downloads.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <span>Contact Student Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
