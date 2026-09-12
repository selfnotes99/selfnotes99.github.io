'use client';

import React from 'react';
import Image from 'next/image';
import { ProductEdition } from '@/config/product';

interface BeforeAfterSectionProps {
  edition: ProductEdition;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ edition }) => {
  return (
    <section className="bg-[#EBAF87] py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#1F1714] mb-14 tracking-tight flex items-center justify-center gap-2 flex-wrap">
          <span>📝</span>
          <span>{edition.beforeAfterTitle}</span>
        </h2>

        {/* 2 Framed Photo Cards with Overlapping Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          
          {/* Left: BEFORE Card */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-xl overflow-hidden border-4 border-[#1F1714] shadow-2xl bg-neutral-100">
              <Image
                src="/assets/before_photo.png"
                alt="Student before using study notes"
                fill
                className="object-cover"
              />
            </div>

            {/* BEFORE Tag Card */}
            <div className="w-full max-w-[420px] bg-[#E5A882] rounded-2xl p-5 sm:p-6 border-2 border-[#1F1714]/20 shadow-lg mt-4 sm:mt-6 relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-center text-[#1F1714] mb-3 tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="text-red-600">✕</span> BEFORE
              </h3>
              <ul className="space-y-2 text-sm sm:text-base font-bold text-[#2D201A]">
                {edition.beforePoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-600 font-extrabold text-lg leading-none shrink-0">×</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: AFTER Card */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-xl overflow-hidden border-4 border-[#1F1714] shadow-2xl bg-neutral-100">
              <Image
                src="/assets/after_photo.png"
                alt="Student after using study notes"
                fill
                className="object-cover"
              />
            </div>

            {/* AFTER Tag Card */}
            <div className="w-full max-w-[420px] bg-[#E5A882] rounded-2xl p-5 sm:p-6 border-2 border-[#7C2928]/40 shadow-lg mt-4 sm:mt-6 relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-center text-[#1F1714] mb-3 tracking-wider uppercase flex items-center justify-center gap-2">
                <span className="text-emerald-700">✓</span> AFTER
              </h3>
              <ul className="space-y-2 text-sm sm:text-base font-bold text-[#1F1714]">
                {edition.afterPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-extrabold text-lg leading-none shrink-0">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Social Proof & Strikethrough Badge */}
        <div className="text-center flex flex-col items-center">
          {/* Pill Badge */}
          <div className="inline-block bg-[#E5A882] px-6 py-2 rounded-full border border-[#D49572] shadow-sm mb-4">
            <span className="text-lg sm:text-xl font-black text-[#1F1714]">
              One Payment.{' '}
              <span className="strikethrough-red text-[#6B574C]">Full Access</span>
            </span>
          </div>

          {/* Huge Number */}
          <div className="text-5xl sm:text-7xl font-black text-[#1F1714] tracking-tight">
            {edition.socialProofCount}
          </div>

          <p className="text-base sm:text-lg font-bold text-[#4A392F] mt-1">
            {edition.socialProofSubtext}
          </p>
        </div>

      </div>
    </section>
  );
};
