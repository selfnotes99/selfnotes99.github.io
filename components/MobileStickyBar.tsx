'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { ProductEdition, BUY_URL } from '@/config/product';

interface MobileStickyBarProps {
  edition: ProductEdition;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ edition }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past hero (e.g. 400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#521B18] text-white p-3 border-t-2 border-[#7C2928] shadow-2xl flex items-center justify-between gap-3 animate-slideUp">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-bold">
          One-Time Payment
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-[#E5A835]">
            ₹{edition.currentPrice}
          </span>
          <span className="text-xs line-through text-neutral-400">
            ₹{edition.originalPrice}
          </span>
        </div>
      </div>

      <a
        href={BUY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#E5A835] hover:bg-[#F59E0B] text-[#1F1714] font-black text-sm px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-all"
      >
        <Zap className="w-4 h-4 fill-current" />
        <span>Buy Now (₹99)</span>
      </a>
    </div>
  );
};
