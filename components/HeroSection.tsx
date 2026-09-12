'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { ProductEdition, BUY_URL } from '@/config/product';

interface HeroSectionProps {
  edition: ProductEdition;
  onOpenSqlPreview?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  edition,
  onOpenSqlPreview
}) => {
  return (
    <section id="hero" className="relative bg-[#EBAF87] overflow-hidden pt-6 pb-12 sm:py-16 lg:py-20">
      {/* Decorative subtle background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4DDCB]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#7C2928]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Badge */}
            <div className="inline-block mb-3">
              <span className="bg-[#521B18] text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm tracking-wider uppercase inline-flex items-center gap-1.5">
                <span>⚡</span>
                <span>{edition.badge}</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-black text-[#1F1714] tracking-tight leading-[1.08] text-3xl sm:text-5xl md:text-6xl mb-6">
              <span>{edition.heroHeadlinePrefix}</span>
              <br />
              <span className="text-[#7C2928]">{edition.heroHeadlineHighlight}</span>
            </h1>

            {/* Subtitles & Descriptions */}
            <div className="space-y-4 max-w-xl text-[#2D201A] font-medium text-base sm:text-lg leading-relaxed mb-8">
              <p className="font-semibold text-[#1F1714] text-lg sm:text-xl">
                {edition.heroSubtitles[0]}
              </p>
              <p className="text-[#3A2C25] leading-normal text-sm sm:text-base">
                {edition.heroSubtitles[1]}
              </p>
              {edition.heroSubtitles[2] && (
                <p className="font-bold text-[#1F1714] text-base sm:text-lg flex items-center gap-2">
                  <span className="text-[#7C2928]">✦</span> {edition.heroSubtitles[2]}
                </p>
              )}
            </div>

            {/* CTA Button & Secondary Link */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-3 bg-[#521B18] hover:bg-[#7C2928] text-white text-base sm:text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Get SQL Ebook (₹99)</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {edition.id === 'sql' && onOpenSqlPreview && (
                <button
                  onClick={onOpenSqlPreview}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#7C2928] font-bold px-6 py-4 rounded-xl border border-[#7C2928]/30 shadow-md transition-all duration-200 hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  <span>Preview Sample Pages</span>
                </button>
              )}
            </div>

            {/* Trust Mini-Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[#4A392F]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7C2928]" />
                <span>Instant PDF Download</span>
              </div>
              <span className="text-[#7C2928]/40">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7C2928]" />
                <span>Lifetime Access</span>
              </div>
              <span className="text-[#7C2928]/40">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7C2928]" />
                <span>Mobile & Print Friendly</span>
              </div>
            </div>

          </div>

          {/* Right Hero: Complete Original Handwritten Notes Sheet (Mobile Responsive) */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0">
            {/* Subtle warm glow backing shape */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] rounded-full bg-[#87A2FF]/40 blur-xl transform -translate-x-4 translate-y-6 pointer-events-none" />

            <div
              onClick={onOpenSqlPreview}
              className="relative z-10 w-full max-w-[460px] cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
              title="Click to zoom and view full sample sheets"
            >
              {/* Backing sheet for realistic paper stack effect */}
              <div className="absolute -top-3 -right-3 w-full h-full bg-[#F7E5D3] rounded-2xl shadow-md border border-[#D49F7B]/60 transform rotate-2 pointer-events-none opacity-80" />

              {/* Main Original Note Sheet Card */}
              <div className="relative bg-white rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-white/80 overflow-hidden">
                {/* Top Sheet Header Banner */}
                <div className="bg-[#7C2928] text-white px-3 py-1.5 rounded-lg mb-2 flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ACTUAL EBOOK SAMPLE PAGE
                  </span>
                  <span className="text-amber-200">UNIT 4 • 2026 EDITION</span>
                </div>

                {/* Complete Uncut Original Image from images folder */}
                <div className="relative w-full aspect-[1568/2400] rounded-lg overflow-hidden bg-neutral-50 shadow-inner">
                  <Image
                    src="/assets/sql/02_sql_sublanguages.png"
                    alt="Original SQL Sublanguages handwritten notes (DDL, DML, DAL)"
                    fill
                    className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 95vw, 460px"
                  />
                </div>

                {/* Bottom Click to Zoom Trigger */}
                <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#7C2928]">
                  <span className="flex items-center gap-1 text-[#1F1714]">
                    <span>🔍</span> Tap or Click to View High-Res
                  </span>
                  <span className="bg-[#7C2928]/10 hover:bg-[#7C2928] hover:text-white px-2.5 py-1 rounded-md transition-colors">
                    Preview All 7 Pages →
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
