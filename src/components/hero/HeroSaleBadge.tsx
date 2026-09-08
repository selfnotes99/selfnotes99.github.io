"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const HeroSaleBadge: React.FC = () => {
  return (
    <div className="absolute top-3 sm:top-5 right-3 sm:right-6 z-20 select-none animate-bounce-subtle">
      {/* Decorative top right yellow sparkler rays */}
      <div className="absolute -top-2.5 -right-2.5 flex items-center justify-center text-[#FFD700] pointer-events-none">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="2" x2="14" y2="7" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22.5" y1="5.5" x2="19" y2="9" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="14" x2="21" y2="14" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Red/Orange Circular Badge */}
      <div className="w-[74px] h-[74px] sm:w-[86px] sm:h-[86px] rounded-full bg-gradient-to-br from-[#FF6A24] via-[#F4512A] to-[#D83A14] text-white flex flex-col items-center justify-center shadow-lg shadow-[#F4512A]/30 border-2 border-white/60 text-center leading-tight transform hover:scale-105 transition-transform">
        <span className="text-[10px] sm:text-[11px] font-medium opacity-95">Up to</span>
        <span className="text-[20px] sm:text-[24px] font-black tracking-tight leading-none my-0.5">50%</span>
        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">OFF</span>
      </div>
    </div>
  );
};
