'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface FAQSectionProps {
  edition: ProductEdition;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ edition }) => {
  // First item open by default matching screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="bg-[#EBAF87] pt-12 pb-0 sm:pt-16 sm:pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-[#1F1714] mb-12 tracking-tight">
          {edition.faqTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Column: Accordion */}
          <div className="lg:col-span-7 space-y-3 pb-12 sm:pb-16">
            {edition.faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md border border-[#E2BEA2]/60 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-extrabold text-base sm:text-lg text-[#1F1714] hover:bg-neutral-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-[#1F1714]">
                      {isOpen ? (
                        <ArrowDown className="w-5 h-5 text-[#7C2928]" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-[#1F1714]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-sm sm:text-base font-semibold text-[#3A2C25] leading-relaxed border-t border-neutral-100 pt-3 whitespace-pre-line bg-neutral-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Smiling Student Pointing to FAQ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative">
            <div className="relative w-full max-w-[420px] aspect-[7/9] sm:aspect-[3/4]">
              <Image
                src="/assets/faq_student.webp"
                alt="Student smiling with study notes"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
