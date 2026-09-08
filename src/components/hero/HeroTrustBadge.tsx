import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const HeroTrustBadge: React.FC = () => {
  const avatars = [
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      alt: "Customer 1",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      alt: "Customer 2",
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
      alt: "Customer 3",
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl py-2 px-3 sm:py-2.5 sm:px-3.5 shadow-trustBadge border border-white/80 flex items-center gap-2.5 sm:gap-3 select-none">
      {/* 3 Overlapping Avatars */}
      <div className="flex -space-x-2 shrink-0">
        {avatars.map((av, idx) => (
          <div
            key={idx}
            className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white ring-1 ring-black/5"
          >
            <Image
              src={av.src}
              alt={av.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Text & 5 Stars */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-[11px] sm:text-[12px] font-bold text-[#111111] leading-tight">
            Trusted by 30,000+
          </span>
        </div>
        <span className="text-[10px] text-gray-500 font-medium leading-none mb-1">
          Happy Customers
        </span>
        <div className="flex items-center gap-0.5 text-[#F5A623]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-[#F5A623] text-[#F5A623]" />
          ))}
        </div>
      </div>
    </div>
  );
};
