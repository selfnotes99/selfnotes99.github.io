'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface TestimonialsProps {
  edition: ProductEdition;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ edition }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = edition.testimonials;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  return (
    <section className="bg-[#EBAF87] py-14 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1714] mb-12 tracking-tight">
          {edition.testimonialTitle}
        </h2>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#1F1714] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#1F1714] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Testimonial Content */}
        <div className="px-10 sm:px-16 flex flex-col items-center">
          
          {/* Circular Avatar with Maroon Ring */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#7C2928] shadow-xl mb-6 bg-white">
            <Image
              src={current.avatar}
              alt={current.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Student Name */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1714] mb-1">
            {current.name}
          </h3>

          {current.role && (
            <p className="text-xs sm:text-sm font-bold text-[#7C2928] mb-4 uppercase tracking-wider">
              {current.role}
            </p>
          )}

          {/* Quote Text */}
          <p className="text-base sm:text-xl text-[#2D201A] font-semibold leading-relaxed max-w-2xl italic">
            &ldquo;{current.quote}&rdquo;
          </p>

          {/* Dots Indicator */}
          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-[#7C2928] w-6' : 'bg-[#1F1714]/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
