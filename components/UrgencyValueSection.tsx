'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { ProductEdition, BUY_URL } from '@/config/product';

interface UrgencyValueSectionProps {
  edition: ProductEdition;
}

export const UrgencyValueSection: React.FC<UrgencyValueSectionProps> = ({ edition }) => {
  return (
    <section className="bg-[#EBAF87] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main White Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl border border-[#E2BEA2]/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-3xl sm:text-4xl">🎯</span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1714] leading-tight">
                  {edition.urgencyTitle}
                </h2>
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#7C2928] leading-tight mb-6">
                {edition.urgencyHighlight}
              </h3>

              <p className="text-[#3E2E25] text-base sm:text-lg font-medium leading-relaxed mb-4">
                {edition.urgencyDesc1}
              </p>

              <p className="text-[#1F1714] font-bold text-base sm:text-lg leading-relaxed mb-6">
                {edition.urgencyDesc2}
              </p>

              <div className="w-full pt-2">
                <h4 className="text-base sm:text-lg font-extrabold text-[#1F1714] mb-3">
                  {edition.urgencyReasonTitle}
                </h4>

                <ul className="space-y-3">
                  {edition.urgencyBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#2D201A] font-semibold text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-[#7C2928] shrink-0 mt-0.5 fill-[#7C2928]/10" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href={BUY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7C2928] hover:bg-[#521B18] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  Invest in Success Now (₹99)
                </a>
              </div>

            </div>

            {/* Right Visual (Popcorn, Tickets, Laptop Mockup, Doodles) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-[560px] aspect-[7/8] sm:aspect-[4/5] drop-shadow-lg transition-transform duration-300 hover:scale-102">
                <Image
                  src={edition.urgencyImage}
                  alt={edition.urgencyBadgeText}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
