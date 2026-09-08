"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { HeroSaleBadge } from "./HeroSaleBadge";
import { HeroTrustBadge } from "./HeroTrustBadge";

const slides = [
  {
    pill: "NEW ARRIVALS 2025",
    headingLine1: "Style Better.",
    headingLine2: "Live Better.",
    subtitle: "Discover premium products, handpicked for your lifestyle.",
    primaryCtaText: "Shop Now",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Explore Collections",
    secondaryCtaLink: "/collections",
  },
  {
    pill: "SUMMER ESSENTIALS",
    headingLine1: "Effortless Comfort.",
    headingLine2: "Timeless Quality.",
    subtitle: "Organic linens, handcrafted leather, and sustainable staples.",
    primaryCtaText: "View Summer",
    primaryCtaLink: "/collections/summer",
    secondaryCtaText: "Best Sellers",
    secondaryCtaLink: "/best-sellers",
  },
  {
    pill: "LIMITED EDITION",
    headingLine1: "Crafted With Care.",
    headingLine2: "Priced Fairly.",
    subtitle: "Direct-to-consumer luxury without the traditional markups.",
    primaryCtaText: "Claim Deals",
    primaryCtaLink: "/deals",
    secondaryCtaText: "Our Story",
    secondaryCtaLink: "/about",
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = slides[currentSlide];

  return (
    <section className="pt-3 pb-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Hero Outer Rounded Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative bg-[#FBF6EE] rounded-2xl border border-[#F0E8DC] overflow-hidden min-h-[380px] lg:min-h-[340px] flex flex-col justify-between shadow-card"
      >
        {/* Floating Top-Right Sale Badge */}
        <HeroSaleBadge />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:p-10 z-10">
          {/* Left Content Column (approx 5 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
            {/* Pill Badge */}
            <div>
              <span className="inline-block px-3 py-1 bg-[#EAF4D5] text-[#064B35] text-[11px] font-extrabold uppercase tracking-wider rounded-md">
                {slide.pill}
              </span>
            </div>

            {/* Main Editorial Serif Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#064B35] leading-[1.08] tracking-tight">
              <span>{slide.headingLine1}</span>
              <br />
              <span>{slide.headingLine2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-[15px] text-[#444444] font-normal leading-relaxed max-w-md">
              {slide.subtitle}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-[#064B35] hover:bg-[#0B6B47] text-white text-xs sm:text-[13px] font-bold rounded-lg shadow-sm hover:shadow transition-all hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>{slide.primaryCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={slide.secondaryCtaLink}
                className="inline-flex items-center px-5 py-2.5 sm:py-3 bg-white hover:bg-gray-50 text-[#111111] text-xs sm:text-[13px] font-bold rounded-lg border border-[#D5D5D5] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xs"
              >
                {slide.secondaryCtaText}
              </Link>
            </div>

            {/* Bottom Hero Benefits */}
            <div className="pt-3 border-t border-[#EAE2D5]/70 grid grid-cols-3 gap-2 sm:gap-4 text-[#111111]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#064B35] shrink-0" />
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#111111]">Free Shipping</p>
                  <p className="text-[10px] text-gray-500 font-medium hidden sm:block">On Orders $50+</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#064B35] shrink-0" />
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#111111]">Secure Payment</p>
                  <p className="text-[10px] text-gray-500 font-medium hidden sm:block">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#064B35] shrink-0" />
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#111111]">Easy Returns</p>
                  <p className="text-[10px] text-gray-500 font-medium hidden sm:block">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Photoshoot Composition Column (approx 6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]">
            {/* Studio Composition Visual Container */}
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[330px] rounded-xl overflow-hidden">
              {/* High-quality studio product layout matching the screenshot composition */}
              <div className="relative w-full h-full bg-gradient-to-tr from-[#EFE6D8] via-[#FBF7F0] to-[#EAE0CE] flex items-center justify-center">
                {/* Visual arrangement with composite product elements */}
                <div className="relative w-full h-full">
                  {/* Potted plant in background left */}
                  <div className="absolute top-2 left-6 sm:left-10 w-24 h-32 sm:w-28 sm:h-36 z-0 opacity-90 transition-transform duration-700 hover:scale-105">
                    <Image
                      src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=400&auto=format&fit=crop"
                      alt="Succulent Indoor Houseplant"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Dark green Shopify shopping bag */}
                  <div className="absolute top-4 sm:top-2 left-1/3 sm:left-[38%] w-28 sm:w-36 h-36 sm:h-44 z-10 transition-transform duration-700 hover:scale-105 drop-shadow-md">
                    <div className="relative w-full h-full bg-[#064B35] rounded-t-lg rounded-b-md shadow-md flex flex-col items-center justify-center p-3 text-white">
                      {/* Handle */}
                      <div className="absolute -top-5 w-14 h-8 border-4 border-[#064B35] rounded-t-full" />
                      {/* Bag stylized mark */}
                      <div className="w-10 h-12 bg-white/10 rounded border border-white/20 flex items-center justify-center">
                        <span className="font-extrabold text-2xl text-white">S</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold mt-2 text-[#78B82A]">
                        Self Notes 99
                      </span>
                    </div>
                  </div>

                  {/* Tan/Beige luxury handbag right */}
                  <div className="absolute top-8 sm:top-6 right-8 sm:right-14 w-32 sm:w-40 h-32 sm:h-40 z-10 transition-transform duration-700 hover:scale-105 drop-shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop"
                      alt="Luxury Tan Handbag"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Crisp white sneakers with green accents in foreground */}
                  <div className="absolute bottom-2 left-16 sm:left-24 w-36 sm:w-48 h-28 sm:h-36 z-20 transition-transform duration-700 hover:scale-105 drop-shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"
                      alt="Crisp White Leather Sneakers"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Folded ribbed olive sweater */}
                  <div className="absolute bottom-3 right-28 sm:right-36 w-28 sm:w-36 h-18 sm:h-22 z-15 transition-transform duration-700 hover:scale-105 drop-shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&auto=format&fit=crop"
                      alt="Ribbed Olive Knit Sweater"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Tortoiseshell sunglasses in front */}
                  <div className="absolute bottom-1 right-20 sm:right-28 w-16 sm:w-20 h-10 sm:h-12 z-25 drop-shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop"
                      alt="Tortoiseshell Sunglasses"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Floating Bottom-Right Trust Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30">
                  <HeroTrustBadge />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Slide Dots Indicators at Bottom Center */}
        <div className="flex items-center justify-center gap-2 pb-3 pt-1 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? "w-6 h-2 bg-[#064B35]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
