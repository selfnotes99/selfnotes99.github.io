'use client';

import React from 'react';
import { CheckCircle2, BookOpen, FileText, Network, Edit3, Layers, Zap } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface WhyKidNeedsProps {
  edition: ProductEdition;
}

export const WhyKidNeeds: React.FC<WhyKidNeedsProps> = ({ edition }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return <span className="text-2xl">📘</span>;
      case 'file-text':
        return <span className="text-2xl">📑</span>;
      case 'network':
        return <span className="text-2xl">🗺️</span>;
      case 'edit-3':
        return <span className="text-2xl">📝</span>;
      case 'layers':
        return <span className="text-2xl">📚</span>;
      case 'zap':
        return <span className="text-2xl">🚀</span>;
      default:
        return <span className="text-2xl">⭐</span>;
    }
  };

  return (
    <section id="why-need" className="bg-[#EBAF87] py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-[#1F1714] mb-12 tracking-tight">
          {edition.whyNeedTitle}
        </h2>

        {/* 6 Cards Grid (2 Columns x 3 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {edition.whyCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#E5A882]/85 hover:bg-[#E5A882] rounded-3xl p-6 sm:p-8 border border-[#D49572]/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header with Icon + Title */}
              <div className="flex items-center gap-3 mb-2">
                {renderIcon(card.icon)}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1714]">
                  {card.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-[#3A2A22] font-semibold text-sm sm:text-base leading-relaxed mb-5">
                {card.subtitle}
              </p>

              {/* 3 Bullets with Maroon Circle Checks */}
              <ul className="space-y-2.5">
                {card.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#221814]">
                    <CheckCircle2 className="w-4 h-4 text-[#7C2928] shrink-0 mt-0.5 fill-[#7C2928]/15" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
