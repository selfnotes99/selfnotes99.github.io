'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ProductEdition, BUY_URL } from '@/config/product';

interface ProductOfferProps {
  edition: ProductEdition;
  onBuy?: () => void;
}

export const ProductOffer: React.FC<ProductOfferProps> = ({
  edition,
  onBuy
}) => {
  return (
    <section id="offer" className="bg-[#EBAF87] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1714] tracking-tight uppercase">
            {edition.offerSectionTitle}
          </h2>
        </div>

        {/* Main Cream Offer Card */}
        <div className="bg-[#F7E5D3] rounded-3xl border-2 border-[#E2BEA2]/60 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Complete Original Handwritten Notes Sheet (Flat, Clean, Responsive) */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="w-full max-w-[440px] bg-white rounded-2xl p-3 shadow-2xl border-2 border-white/80 transition-all duration-300 hover:scale-[1.02] group">
                <div className="bg-[#7C2928] text-white px-3 py-1.5 rounded-lg mb-2 flex items-center justify-between text-xs font-bold">
                  <span>UNIT 14: SQL JOINS &amp; VENN DIAGRAMS</span>
                  <span className="text-amber-200">100% REAL NOTE</span>
                </div>
                <div className="relative w-full aspect-[1568/2400] rounded-lg overflow-hidden bg-neutral-50 shadow-inner">
                  <Image
                    src="/assets/sql/05_sql_joins_concept.png"
                    alt="Complete original handwritten SQL Joins note sheet"
                    fill
                    className="object-contain object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 95vw, 440px"
                    priority
                  />
                </div>
                <div className="mt-2 text-center text-xs font-bold text-[#7C2928]">
                  <span>📄 Complete Uncut Page from 16-Unit Ebook</span>
                </div>
              </div>
            </div>

            {/* Right Column: Offer Details */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1F1714] leading-tight mb-4">
                {edition.productCardTitle}
              </h3>

              {/* Price Row */}
              <div className="flex items-baseline flex-wrap gap-2.5 sm:gap-3 mb-3">
                <span className="text-xl sm:text-2xl line-through text-[#665348] font-medium">
                  ₹{edition.originalPrice.toLocaleString('en-IN')}.00
                </span>
                <span className="text-3xl sm:text-5xl font-extrabold text-[#7C2928]">
                  ₹{edition.currentPrice.toLocaleString('en-IN')}.00
                </span>
                <span className="bg-[#7C2928]/15 text-[#7C2928] text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Save {Math.round(((edition.originalPrice - edition.currentPrice) / edition.originalPrice) * 100)}%
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#E5A835] text-lg tracking-wider font-bold">★★★★★</span>
                <span className="text-sm font-bold text-[#4A392F]">
                  {edition.ratingText.replace('★★★★★', '').trim()}
                </span>
              </div>

              {/* Feature Bullets with Maroon Circle Checks */}
              <ul className="space-y-3.5 mb-8 w-full">
                {edition.productFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#2D201A] font-semibold text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-[#7C2928] shrink-0 mt-0.5 fill-[#7C2928]/10" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Buy Now CTA */}
              <div className="w-full space-y-4">
                <a
                  href={BUY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#7C2928] hover:bg-[#521B18] text-white text-lg font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-102 active:scale-98"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>Buy Now (₹99)</span>
                </a>

                {/* Indian Payment Badges */}
                <div className="pt-2">
                  <div className="relative w-72 sm:w-80 h-14">
                    <Image
                      src="/assets/payment_icons.png"
                      alt="Accepted Payments: Paytm, PhonePe, BHIM UPI, GPay, NetBanking, VISA, Mastercard"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#6B574C] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    <span>256-Bit SSL Encrypted Instant & Secure Checkout</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
