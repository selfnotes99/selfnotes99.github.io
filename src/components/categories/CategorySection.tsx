"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

// SVG Line Icons matching the exact green outline icons in the screenshot
const CategoryIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const iconColor = "#78B82A"; // Bright brand green from screenshot

  switch (icon) {
    case "dress":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a2 2 0 0 0-2 2c0 .74.4 1.39 1 1.73V7l-4 3 2 12h10l2-12-4-3V5.73A2 2 0 0 0 12 2z" />
          <path d="M10 7h4" />
        </svg>
      );
    case "shirt":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.25 1.54L6 11.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8.5l1.89-.77a2 2 0 0 0 1.25-1.54l.58-3.5a2 2 0 0 0-1.34-2.23z" />
        </svg>
      );
    case "sneakers":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18h18v-3c0-1.5-1.5-3-3.5-3.5L14 10l-4 3H3v5z" />
          <path d="M3 18v2h18v-2" />
          <circle cx="7" cy="14" r="1" fill={iconColor} />
          <circle cx="11" cy="14" r="1" fill={iconColor} />
        </svg>
      );
    case "bag":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9V7a6 6 0 0 1 12 0v2" />
          <rect x="3" y="9" width="18" height="13" rx="2" />
          <circle cx="12" cy="14" r="1.5" fill={iconColor} />
        </svg>
      );
    case "glasses":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="14" r="4" />
          <circle cx="18" cy="14" r="4" />
          <path d="M10 14h4" />
          <path d="M2 14l2-6" />
          <path d="M22 14l-2-6" />
        </svg>
      );
    case "home":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "percent":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5 5 19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    default:
      return null;
  }
};

export const CategorySection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pause on user touch or interaction, and resume smoothly when released
  const handleUserInteractionStart = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleUserInteractionEnd = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  };

  const scroll = (direction: "left" | "right") => {
    handleUserInteractionStart();
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.9;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
    handleUserInteractionEnd();
  };

  // Automatic infinite loop smooth sliding
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;

      // Only run auto-slide if scrollable (mobile view)
      if (el.scrollWidth <= el.clientWidth) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const step = el.clientWidth * 0.52; // advance roughly 1 category card

      // When near or at the end, smoothly loop back to start
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Section Header with Decorative Green Horizontal Lines & Mobile Slide Navigation */}
      <div className="flex items-center justify-between sm:justify-center mb-6 relative">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mx-auto">
          <span className="h-[1.5px] w-8 sm:w-16 md:w-20 bg-[#064B35]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight text-center">
            Shop by Category
          </h2>
          <span className="h-[1.5px] w-8 sm:w-16 md:w-20 bg-[#064B35]" />
        </div>

        {/* Mobile slide navigation arrows */}
        <div className="flex sm:hidden items-center gap-1.5 absolute right-0">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous categories"
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#EAF4D5] text-gray-700 hover:text-[#064B35] flex items-center justify-center transition-colors shadow-2xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next categories"
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#EAF4D5] text-gray-700 hover:text-[#064B35] flex items-center justify-center transition-colors shadow-2xs active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile: 2 Categories Visible Horizontal Slider with Auto-Slide Loop
          Desktop/Tablet: Full Grid */}
      <div
        ref={sliderRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleUserInteractionStart}
        onTouchMove={handleUserInteractionStart}
        onTouchEnd={handleUserInteractionEnd}
        onTouchCancel={handleUserInteractionEnd}
        className="flex sm:grid overflow-x-auto sm:overflow-visible no-scrollbar scroll-smooth snap-x snap-mandatory sm:snap-none sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 pb-2 sm:pb-0"
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className="group flex flex-col bg-[#FFFDF8] hover:bg-white rounded-2xl border border-[#ECE6DC] hover:border-[#78B82A] p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover text-center select-none w-[calc(50%-6px)] sm:w-auto shrink-0 snap-start"
          >
            {/* Top Image Container */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white mb-2.5">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Bottom: Green Line Icon + Label */}
            <div className="flex flex-col items-center justify-center gap-1 py-1">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <CategoryIcon icon={cat.icon} />
              </div>
              <span className="text-[12px] sm:text-[13px] font-bold text-[#111111] group-hover:text-[#064B35] transition-colors leading-tight px-1 truncate w-full">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Swipe Cue */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2 text-[11px] text-gray-400 font-medium">
        <span>← Swipe to explore categories →</span>
      </div>
    </section>
  );
};
