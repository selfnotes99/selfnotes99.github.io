'use client';

import React from 'react';
import Image from 'next/image';
import { Lightbulb, Flag, Trophy } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface TrustSectionProps {
  edition: ProductEdition;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ edition }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lightbulb':
        return <Lightbulb className="w-8 h-8 text-white fill-white" />;
      case 'flag':
        return <Flag className="w-8 h-8 text-white fill-white" />;
      case 'trophy':
        return <Trophy className="w-8 h-8 text-white fill-white" />;
      default:
        return <Lightbulb className="w-8 h-8 text-white fill-white" />;
    }
  };

  return (
    <section className="bg-[#EBAF87] pt-12 pb-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Description */}
        <div className="max-w-4xl mb-10 text-left sm:text-left">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1714] tracking-tight mb-4">
            {edition.trustTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#3E2D24] font-medium leading-relaxed">
            {edition.trustSubtitle}
          </p>
        </div>

        {/* Visual Banner Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-[-48px] sm:mb-[-60px] z-10 border border-[#E2BEA2]/60">
          <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] bg-[#EBB561]">
            <Image
              src="/assets/trust_banner.png"
              alt="Happy students and study strategy banner"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 3 Overlapping Outcome Cards */}
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-2">
          {edition.trustCards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-xl border transition-all duration-300 hover:-translate-y-2 ${
                card.isMaroon
                  ? 'bg-[#7C2928] text-white border-[#521B18]'
                  : 'bg-white text-[#1F1714] border-[#E2BEA2]/80'
              }`}
            >
              {/* Yellow Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-[#E5A835] flex items-center justify-center mb-4 shadow-md">
                {getIcon(card.icon)}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                {card.title}
              </h3>

              <p className={`text-xs sm:text-sm font-medium leading-relaxed ${
                card.isMaroon ? 'text-white/90' : 'text-[#4A392F]'
              }`}>
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
