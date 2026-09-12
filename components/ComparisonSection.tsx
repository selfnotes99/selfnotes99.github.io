'use client';

import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface ComparisonSectionProps {
  edition: ProductEdition;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ edition }) => {
  return (
    <section id="comparison" className="bg-[#EBAF87] pt-20 pb-12 sm:pt-28 sm:pb-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1714] tracking-tight flex items-center justify-center gap-2 flex-wrap">
            <span>💰</span>
            <span>{edition.comparisonTitle}</span>
          </h2>
        </div>

        {/* 2 Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left: Competitors / Other */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E2BEA2]/60">
            <div className="bg-[#7C2928] text-white py-4 px-6 text-center font-extrabold text-lg sm:text-xl flex items-center justify-center gap-2">
              <span className="text-red-300">✕</span>
              <span>{edition.competitorHeader}</span>
            </div>
            
            <div className="bg-white p-6 sm:p-8 space-y-4">
              {edition.competitorPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-bold text-[#2D201A]">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Our Product Kit */}
          <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-[#7C2928]">
            <div className="bg-[#521B18] text-white py-4 px-6 text-center font-extrabold text-lg sm:text-xl flex items-center justify-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>{edition.ourProductHeader}</span>
            </div>
            
            <div className="bg-white p-6 sm:p-8 space-y-4">
              {edition.ourPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 fill-emerald-100" />
                  <span className="text-sm sm:text-base font-bold text-[#1F1714]">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
