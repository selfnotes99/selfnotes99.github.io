'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle2, Zap } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface ComboOfferProps {
  edition: ProductEdition;
}

export const ComboOffer: React.FC<ComboOfferProps> = ({ edition }) => {
  // Countdown timer initialized to 14 minutes 59 seconds
  const [secondsLeft, setSecondsLeft] = useState(899);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="combo" className="bg-[#EBAF87] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1714] tracking-tight">
            {edition.comboTitle}
          </h2>
        </div>

        {/* Urgency Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#7C2928] bg-white/80 px-4 py-1.5 rounded-full border border-[#7C2928]/30 shadow-sm animate-pulse">
            <span>⏰</span>
            <span>{edition.comboUrgencyBadge}</span>
          </div>
        </div>

        {/* Countdown Timer Boxes */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="bg-[#7C2928] rounded-xl p-3 sm:p-4 text-center min-w-[80px] sm:min-w-[96px] shadow-lg border border-[#521B18]">
            <div className="bg-white rounded-lg py-1 px-3 text-2xl sm:text-4xl font-black text-[#1F1714] mb-1">
              {padZero(minutes)}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Minutes
            </div>
          </div>

          <div className="bg-[#7C2928] rounded-xl p-3 sm:p-4 text-center min-w-[80px] sm:min-w-[96px] shadow-lg border border-[#521B18]">
            <div className="bg-white rounded-lg py-1 px-3 text-2xl sm:text-4xl font-black text-[#1F1714] mb-1">
              {padZero(seconds)}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
              Seconds
            </div>
          </div>
        </div>

        {/* Combo Card */}
        <div className="bg-[#F7E5D3] rounded-3xl border-2 border-[#E2BEA2]/80 shadow-xl overflow-hidden p-6 sm:p-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Complete Original Note Sheet (Flat, Clean, Responsive) */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[420px] bg-white rounded-2xl p-3 shadow-2xl border-2 border-white/80 transition-all duration-300 hover:scale-[1.02] group">
                <div className="bg-[#7C2928] text-white px-3 py-1.5 rounded-lg mb-2 flex items-center justify-between text-xs font-bold">
                  <span>UNIT 14: INNER JOIN (PARTY METAPHOR)</span>
                  <span className="text-amber-200">BUNDLE PREVIEW</span>
                </div>
                <div className="relative w-full aspect-[1568/2400] rounded-lg overflow-hidden bg-neutral-50 shadow-inner">
                  <Image
                    src="/assets/sql/06_inner_join_match.png"
                    alt="Complete original handwritten INNER JOIN note sheet"
                    fill
                    className="object-contain object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 95vw, 420px"
                  />
                </div>
                <div className="mt-2 text-center text-xs font-bold text-[#7C2928]">
                  <span>📄 Real Illustrated Visual Study Sheet</span>
                </div>
              </div>
            </div>

            {/* Right Column: Combo Details */}
            <div className="md:col-span-6 flex flex-col items-start">
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1714] leading-tight mb-6">
                {edition.comboCardTitle}
              </h3>

              {/* Bullet list */}
              <ul className="space-y-3 mb-6 w-full">
                {edition.comboBullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-bold text-[#2D201A]">
                    <CheckCircle2 className="w-5 h-5 text-[#7C2928] shrink-0 mt-0.5 fill-[#7C2928]/10" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xl line-through text-[#665348] font-medium">
                  ₹{edition.comboOriginalPrice.toLocaleString('en-IN')}.00
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#1F1714]">
                  ₹{edition.comboCurrentPrice.toLocaleString('en-IN')}.00
                </span>
              </div>

              {/* Buy Combo CTA */}
              <a
                href="#purchase"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#521B18] hover:bg-[#7C2928] text-white text-base sm:text-lg font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>{edition.comboCtaText}</span>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
