'use client';

import React from 'react';

interface AnnouncementBarProps {
  text: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ text }) => {
  return (
    <div className="bg-[#521B18] text-white py-2.5 px-4 overflow-hidden border-b border-[#3E1311] relative z-40 text-xs sm:text-sm font-medium tracking-wide">
      <div className="flex items-center justify-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2">
            <span className="text-base">🎉</span> {text}
          </span>
          <span className="text-white/40">✦</span>
          <span className="flex items-center gap-2">
            <span className="text-base">🚨</span> {text}
          </span>
          <span className="text-white/40">✦</span>
          <span className="flex items-center gap-2">
            <span className="text-base">🎉</span> {text}
          </span>
          <span className="text-white/40">✦</span>
          <span className="flex items-center gap-2">
            <span className="text-base">🚨</span> {text}
          </span>
        </div>
      </div>
    </div>
  );
};
