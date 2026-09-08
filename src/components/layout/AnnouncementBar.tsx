"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

export const AnnouncementBar = () => {
  const items = [
    {
      icon: <Truck className="w-3.5 h-3.5" />,
      text: "Free Shipping on Orders $50+",
    },
    {
      icon: <RotateCcw className="w-3.5 h-3.5" />,
      text: "30-Day Easy Returns",
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      text: "Secure Checkout",
    },
    {
      icon: <Headphones className="w-3.5 h-3.5" />,
      text: "24/7 Customer Support",
    },
  ];

  return (
    <div className="bg-[#064B35] text-white py-1.5 px-4 text-xs select-none border-b border-[#053A29]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center">
        {/* Desktop: Centered 4 items with subtle vertical dividers */}
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 font-medium tracking-normal text-[12px] leading-tight">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 text-white/95 hover:text-white transition-colors cursor-default">
                <span className="text-white shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </div>
              {idx < items.length - 1 && (
                <span className="text-white/30 h-3 w-[1px] bg-white/25 inline-block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: Horizontal smooth scroller without wrapping */}
        <div className="flex md:hidden items-center justify-start gap-5 overflow-x-auto no-scrollbar py-0.5 px-2 text-[11px] font-medium w-full">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap shrink-0 text-white/95">
              <span className="text-white">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
