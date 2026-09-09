"use client";

import React from "react";
import { BookOpen, CheckCircle2, ChevronRight, FileText, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Product } from "@/types";

interface ProductTableOfContentsProps {
  product: Product;
  className?: string;
}

interface ParsedChapter {
  index: number;
  chapterNumber: string;
  title: string;
  subtitle?: string;
  pageOrDuration?: string;
}

export const ProductTableOfContents: React.FC<ProductTableOfContentsProps> = ({
  product,
  className = "",
}) => {
  // If this product does not have any table of contents in Google Sheet, don't show the section
  const rawContents = product.tableOfContents;
  if (!rawContents || !Array.isArray(rawContents) || rawContents.length === 0) {
    return null;
  }

  // Smart Parser for user's Google Sheet entries (safely filters out pure digits/empty rows)
  const parsedChapters: ParsedChapter[] = rawContents
    .filter((raw) => typeof raw === "string" && raw.trim().length > 0 && !/^\d+$/.test(raw.trim()))
    .map((raw, idx) => {
      let text = raw.trim();
      let chapterNumber = String(idx + 1).padStart(2, "0");
      let title = text;
      let subtitle = "";
      let pageOrDuration = "";

      // Check for page count or duration in brackets e.g. "(24 Pages)" or "[45 mins]"
      const bracketMatch = text.match(/[\(\[](.*?(?:page|pg|min|hr|file|video|asset|sheet|template).*?)[\)\]]/i);
      if (bracketMatch) {
        pageOrDuration = bracketMatch[1].trim();
        text = text.replace(bracketMatch[0], "").trim();
      }

      // Check if title has prefix e.g. "Chapter 1: Intro to Market Research"
      const prefixMatch = text.match(/^(?:chapter|module|part|section|unit|ch|mod)?\s*([0-9]+)[\s.:\-]+(.*)$/i);
      if (prefixMatch) {
        chapterNumber = String(prefixMatch[1]).padStart(2, "0");
        text = prefixMatch[2].trim();
      }

      // Split title and subtitle if colon exists
      if (text.includes(":") && !text.startsWith("http")) {
        const parts = text.split(":");
        title = parts[0].trim();
        subtitle = parts.slice(1).join(":").trim();
      } else if (text.includes(" - ")) {
        const parts = text.split(" - ");
        title = parts[0].trim();
        subtitle = parts.slice(1).join(" - ").trim();
      } else {
        title = text;
      }

      return {
        index: idx + 1,
        chapterNumber,
        title,
        subtitle: subtitle || undefined,
        pageOrDuration: pageOrDuration || undefined,
      };
    });

  if (parsedChapters.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Table of Contents"
      className={`mb-10 sm:mb-16 scroll-mt-24 ${className}`}
      id="table-of-contents"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 p-3.5 sm:p-7 lg:p-9 shadow-xs">
        {/* Section Header (Centered on mobile, left on desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-100 text-center sm:text-left items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#EAF4D5] text-[#064B35] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#78B82A]" />
              <span>Complete Curriculum &amp; Syllabus</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight text-center sm:text-left">
              Table of Contents
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1 leading-relaxed max-w-2xl text-center sm:text-left">
              Complete chapter-by-chapter curriculum included in <span className="font-bold text-gray-800">{product.name}</span>.
            </p>
          </div>

          {/* Quick Metrics Badges (Centered on mobile) */}
          <div className="flex items-center justify-center sm:justify-start gap-2 shrink-0">
            <div className="bg-[#FAFDF8] border border-gray-200/80 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-center">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Curriculum</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-[#064B35] mt-0.5 block leading-none">
                {parsedChapters.length} Chapters
              </span>
            </div>
            <div className="bg-[#FAFDF8] border border-gray-200/80 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-center">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none">Access</span>
              <span className="text-xs sm:text-sm md:text-base font-black text-[#78B82A] mt-0.5 block leading-none">
                Instant (0s)
              </span>
            </div>
          </div>
        </div>

        {/* 6 col by 6 col Mobile Grid (2 columns on mobile, 3 columns on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-3.5 pt-4 sm:pt-6">
          {parsedChapters.map((chapter) => (
            <div
              key={chapter.index}
              className="group bg-[#FAFDF8] hover:bg-white hover:border-[#78B82A] border border-gray-200/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center justify-between gap-2 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                {/* Chapter Badge Number */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#064B35] to-[#0B6B47] text-white flex items-center justify-center shrink-0 font-black text-[10px] sm:text-xs shadow-xs">
                  {chapter.chapterNumber}
                </div>

                {/* Chapter Title & optional subtitle inline */}
                <div className="min-w-0 flex-1 leading-tight">
                  <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-900 group-hover:text-[#064B35] transition-colors leading-snug line-clamp-2" title={chapter.title}>
                    {chapter.title}
                  </h3>
                  {chapter.subtitle && (
                    <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 leading-tight truncate">
                      {chapter.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {chapter.pageOrDuration && (
                <span className="text-[9px] sm:text-[10px] font-bold text-[#064B35] bg-[#EAF4D5] px-1.5 py-0.5 rounded-md shrink-0">
                  {chapter.pageOrDuration}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* High-Converting Bottom Trust & Purchase Prompt */}
        <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-gray-600">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <Zap className="w-3.5 h-3.5 text-[#78B82A] shrink-0" />
            <span className="font-bold text-gray-900">
              Immediate Delivery:
            </span>
            <span className="text-gray-500">
              All {parsedChapters.length} chapters &amp; source files unlocked instantly upon checkout.
            </span>
          </div>

          <a
            href="#pricing"
            className="inline-flex items-center gap-1 font-bold text-[#064B35] hover:text-[#78B82A] transition-colors shrink-0 text-xs"
          >
            <span>Unlock Entire Package Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
