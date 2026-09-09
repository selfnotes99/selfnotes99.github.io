"use client";

import React from "react";
import { Check, X, ShieldAlert, Sparkles, Award } from "lucide-react";
import { Product } from "@/types";

interface WhyBuyComparisonProps {
  product: Product;
  className?: string;
}

export const WhyBuyComparison: React.FC<WhyBuyComparisonProps> = ({
  product,
  className = "",
}) => {
  return (
    <section aria-label="Why Choose selfnotes99" className={`mb-12 sm:mb-16 ${className}`}>
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 p-4 sm:p-7 lg:p-9 shadow-xs">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4D5] text-[#064B35] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#78B82A]" />
            <span>Smart Buyer's Comparison</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            Why Buy from selfnotes99 vs. Free Internet Notes?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            See the difference between random unverified online files and our curated official package.
          </p>
        </div>

        {/* 2-Column Comparison Grid (Side by side on tablet/desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Column 1: Free / Random Internet Notes */}
          <div className="rounded-2xl border border-red-200/80 bg-red-50/25 p-4 sm:p-5">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-red-100">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0">
                ✕
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-red-950">
                  Free / Random Internet Notes
                </h3>
                <span className="text-[10px] text-red-600 font-bold block">
                  Risky &amp; Waste of Study Time
                </span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-red-900/80">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Blurry scans:</strong> Low quality pictures, hard to read on phone or laptop.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Incomplete syllabus:</strong> Important topics and chapters missing midway.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Full of spam watermarks:</strong> Annoying channel logos across every page.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Outdated content:</strong> Old editions without latest syllabus patterns.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero support:</strong> Broken links with nobody to assist or fix corrupt files.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: selfnotes99 Verified Package */}
          <div className="rounded-2xl border-2 border-[#78B82A] bg-[#FAFDF8] p-4 sm:p-5 shadow-xs relative">
            {/* Top Recommended Tag */}
            <span className="absolute -top-3 right-4 bg-[#064B35] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
              ✓ 100% Verified
            </span>

            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#E3EDD6]">
              <span className="w-6 h-6 rounded-full bg-[#064B35] text-white flex items-center justify-center font-black text-xs shrink-0">
                ✓
              </span>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-[#064B35]">
                  selfnotes99 Official Package
                </h3>
                <span className="text-[10px] text-[#78B82A] font-bold block">
                  Curated, HD Quality &amp; Complete
                </span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-gray-800">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[3]" />
                <span>
                  <strong>Ultra HD 4K Quality:</strong> Crystal clear text, vector diagrams &amp; fully printable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[3]" />
                <span>
                  <strong>100% Complete Syllabus:</strong> Chapter-by-chapter organized from basic to advanced.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[3]" />
                <span>
                  <strong>Clean &amp; Distraction Free:</strong> No annoying ads, clean reading design.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[3]" />
                <span>
                  <strong>Lifetime Free Updates:</strong> Any future addition delivered free forever.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#78B82A] shrink-0 mt-0.5 stroke-[3]" />
                <span>
                  <strong>Dedicated WhatsApp Support:</strong> Instant help whenever you need via +91-8595403030.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
