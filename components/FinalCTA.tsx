'use client';

import React from 'react';
import { ShoppingBag, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { ProductEdition, BUY_URL } from '@/config/product';

interface FinalCTAProps {
  edition: ProductEdition;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ edition }) => {
  return (
    <section id="purchase" className="bg-[#521B18] py-14 sm:py-20 text-white relative overflow-hidden border-t-4 border-[#7C2928]">
      {/* Decorative glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7C2928]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E5A835]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#E5A835] mb-6">
          <Zap className="w-4 h-4 fill-current" />
          <span>Instant Digital Access • 2026 Edition</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          Start Smarter Preparation Today.
        </h2>

        <p className="text-base sm:text-xl text-neutral-200 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
          {edition.id === 'cbse'
            ? 'Give your child the ultimate Class 7 CBSE Study Kit with 2-3 page smart notes, mind maps, and solved papers at less than the price of a movie ticket.'
            : 'Master SQL fundamentals, table relationships, queries, and JOINs step-by-step with practical visual guides and illustrated examples.'}
        </p>

        {/* Pricing & CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl text-neutral-400 line-through">
              ₹{edition.originalPrice}.00
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#E5A835]">
              ₹{edition.currentPrice}.00
            </span>
          </div>

          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#E5A835] hover:bg-[#F59E0B] text-[#1F1714] font-black text-lg px-8 py-4 rounded-xl shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Get Notes Now (₹{edition.currentPrice})</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-neutral-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant PDF Download</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Lifetime Access & Free Updates</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp & Email Delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
};
