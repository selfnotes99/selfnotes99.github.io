'use client';

import React from 'react';
import {
  BookOpen,
  Library,
  Microscope,
  Calculator,
  Globe2,
  Laptop,
  Code2,
  Database,
  ShieldCheck,
  FileCode2
} from 'lucide-react';
import { ProductEdition } from '@/config/product';

interface SubjectsSectionProps {
  edition: ProductEdition;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({ edition }) => {
  const getIcon = (iconName: string, isMaroon: boolean) => {
    const iconClass = `w-12 h-12 ${isMaroon ? 'text-white' : 'text-[#7C2928]'}`;
    switch (iconName) {
      case 'lamp':
      case 'book':
        return <BookOpen className={iconClass} />;
      case 'library':
        return <Library className={iconClass} />;
      case 'microscope':
        return <Microscope className={iconClass} />;
      case 'calculator':
        return <Calculator className={iconClass} />;
      case 'globe':
        return <Globe2 className={iconClass} />;
      case 'laptop':
        return <Laptop className={iconClass} />;
      case 'code':
        return <Code2 className={iconClass} />;
      case 'database':
        return <Database className={iconClass} />;
      default:
        return <FileCode2 className={iconClass} />;
    }
  };

  return (
    <section id="subjects" className="bg-[#EBAF87] py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-[#1F1714] mb-12 tracking-tight">
          {edition.subjectsTitle}
        </h2>

        {/* Checkerboard 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {edition.subjects.map((sub, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 hover:scale-103 hover:-translate-y-1 ${
                sub.isMaroon
                  ? 'bg-[#7C2928] text-white'
                  : 'bg-white text-[#1F1714] border border-[#E2BEA2]/60'
              }`}
            >
              <div className="mb-4">
                {getIcon(sub.icon, sub.isMaroon)}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase">
                {sub.name}
              </h3>
              <a
                href="#sample-notes"
                className={`mt-3 text-xs font-bold transition-opacity flex items-center gap-1 ${
                  sub.isMaroon ? 'text-amber-200 hover:text-white' : 'text-[#7C2928] hover:underline'
                }`}
              >
                <span>Read Note Sheet Sample</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
