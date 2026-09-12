'use client';

import React from 'react';
import { Link2, Mail, CreditCard, FileCheck2 } from 'lucide-react';
import { PRODUCT_CONFIG } from '@/config/product';

export const HowToPurchase: React.FC = () => {
  const steps = PRODUCT_CONFIG.howToPurchaseSteps;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'link':
        return <Link2 className="w-8 h-8 text-[#2563EB]" />;
      case 'mail':
        return <Mail className="w-8 h-8 text-[#1F1714]" />;
      case 'credit-card':
        return <CreditCard className="w-8 h-8 text-[#059669]" />;
      case 'file-check':
        return <FileCheck2 className="w-8 h-8 text-[#7C2928]" />;
      default:
        return <Link2 className="w-8 h-8 text-[#7C2928]" />;
    }
  };

  return (
    <section className="bg-[#EBAF87] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-[#1F1714] mb-10 tracking-tight">
          How To Purchase
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-[#1F1714]/90 p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Maroon ring around icon */}
              <div className="w-20 h-20 rounded-full border-4 border-[#7C2928] flex items-center justify-center mb-5 bg-[#FAF0E9]/50 shadow-inner">
                {renderIcon(item.icon)}
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-[#1F1714] mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-[#4A392F] font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
