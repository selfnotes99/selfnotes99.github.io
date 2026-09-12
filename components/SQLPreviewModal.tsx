'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, BookOpen, Download } from 'lucide-react';
import { PRODUCT_CONFIG, BUY_URL } from '@/config/product';

interface SQLPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const SQLPreviewModal: React.FC<SQLPreviewModalProps> = ({ isOpen, onClose, initialIndex = 0 }) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const samples = PRODUCT_CONFIG.sqlSamples;

  React.useEffect(() => {
    if (isOpen && typeof initialIndex === 'number') {
      setActiveIdx(initialIndex);
    }
  }, [isOpen, initialIndex]);

  if (!isOpen) return null;

  const current = samples[activeIdx];

  const prev = () => {
    setActiveIdx((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIdx((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-[#F7E5D3] rounded-2xl sm:rounded-3xl max-w-4xl w-full border-2 border-[#7C2928] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Modal Header */}
        <div className="bg-[#521B18] text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#E5A835]" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                {current.title}
              </h3>
              <p className="text-xs text-neutral-300">
                Sample {activeIdx + 1} of {samples.length} — Practical Visual Notes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body / Image Viewer */}
        <div className="relative flex-1 bg-neutral-900 flex items-center justify-center p-2 sm:p-4 overflow-auto min-h-[400px]">
          <div className="relative w-full max-w-[620px] aspect-[9/14] sm:aspect-[9/13] rounded-lg overflow-hidden shadow-2xl bg-white">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Left / Right Nav Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#1F1714] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous sample"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#1F1714] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
            aria-label="Next sample"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E2BEA2]">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
            {samples.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
                  idx === activeIdx
                    ? 'bg-[#7C2928] text-white shadow'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Page {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#4A392F] hover:bg-neutral-100 transition-colors"
            >
              Close
            </button>
            <a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex-1 sm:flex-initial text-center bg-[#7C2928] hover:bg-[#521B18] text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow transition-all hover:scale-105 active:scale-95"
            >
              Get Full Ebook (₹99)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
