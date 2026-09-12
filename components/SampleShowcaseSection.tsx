'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, CheckCircle2, Sparkles, BookOpen, Download, ShieldCheck } from 'lucide-react';
import { BUY_URL } from '@/config/product';

interface SampleShowcaseSectionProps {
  onOpenModal: (index: number) => void;
}

export const SampleShowcaseSection: React.FC<SampleShowcaseSectionProps> = ({ onOpenModal }) => {
  const [activeTab, setActiveTab] = useState(0);

  const samples = [
    {
      id: 0,
      title: 'Unit 1: What is SQL?',
      badge: 'UNIT 1 • FOUNDATIONS',
      sub: 'The Language of Databases, RDBMS Architecture & History',
      image: '/assets/sql/01_what_is_sql.png',
      bullets: [
        'Declarative vs Imperative: Why you tell SQL "what to get", not how',
        'Codd\'s Relational Model (1970) & the birth of SEQUEL at IBM',
        'ANSI Standards & modern relational database engine evolution',
        'Why RDBMS forms the bridge between code and persistent data'
      ],
      tag: 'Core Foundation'
    },
    {
      id: 1,
      title: 'Unit 4: DDL, DML & DAL',
      badge: 'UNIT 4 • CRITICAL EXAM TOPIC',
      sub: 'The Language Within a Language: SQL Sublanguages',
      image: '/assets/sql/02_sql_sublanguages.png',
      bullets: [
        'Data Definition Language (DDL): CREATE, ALTER, DROP, TRUNCATE with Schema Blueprint',
        'Data Manipulation Language (DML): Complete CRUD process (INSERT, SELECT, UPDATE, DELETE)',
        'Data Administration Language (DAL): Access control, security, and permissions',
        'Clear distinction between structure modifications and data manipulation'
      ],
      tag: 'High-Yield Topic'
    },
    {
      id: 2,
      title: 'Unit 7: Constraints & Keys',
      badge: 'UNIT 7 • DATA INTEGRITY',
      sub: 'Core Concepts & Constraints: Primary, Foreign & Unique Keys',
      image: '/assets/sql/03_core_concepts_constraints.png',
      bullets: [
        'PRIMARY KEY vs FOREIGN KEY: Referential integrity rules explained visually',
        'Handling NULL values: Difference between NULL, 0, and an empty string',
        'UNIQUE, NOT NULL, CHECK and DEFAULT constraint definitions',
        'Parent-child table relationship diagram with foreign key pointers'
      ],
      tag: 'Interview Favorite'
    },
    {
      id: 3,
      title: 'Unit 5 & 10: Query Processing',
      badge: 'UNIT 5 & 10 • QUERY EXECUTION',
      sub: 'Logical Query Processing Order & SELECT Anatomy',
      image: '/assets/sql/04_query_processing_select.png',
      bullets: [
        'Exact order database engines process queries: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
        'Why column aliases defined in SELECT cannot be used in WHERE clauses',
        'SELECT statement anatomy with color-coded syntax breakdown',
        'Performance optimization tips for beginners'
      ],
      tag: 'Must-Know'
    },
    {
      id: 4,
      title: 'Unit 14: SQL Joins Family',
      badge: 'UNIT 14 • RELATIONAL JOINS',
      sub: 'What Are SQL Joins? The Complete Join Family Tree',
      image: '/assets/sql/05_sql_joins_concept.png',
      bullets: [
        'Fundamental concept: Why normalization requires joining related tables',
        'The ON search condition: Equality tests between FK and PK (Equi-Join)',
        'The JOIN Family Tree: Inner, Outer (Left/Right/Full), and Special Joins (Cross/Self)',
        'Hand-drawn Venn diagram classifications for instant visual retention'
      ],
      tag: 'Visual Diagrams'
    },
    {
      id: 5,
      title: 'Unit 14: INNER JOIN',
      badge: 'UNIT 14 • MATCHING RECORDS',
      sub: 'INNER JOIN: The Perfect Match & The Party Metaphor',
      image: '/assets/sql/06_inner_join_match.png',
      bullets: [
        'The Party Metaphor: Only guests invited to BOTH parties can enter!',
        'Step-by-step row comparison mechanism across two tables',
        'Handling unmatched rows: Why unmatched records disappear completely',
        'Practical query example with Customer and Order tables'
      ],
      tag: 'Most Popular'
    },
    {
      id: 6,
      title: 'Unit 14: LEFT OUTER JOIN',
      badge: 'UNIT 14 • NULL HANDLING',
      sub: 'LEFT OUTER JOIN: Anti-Join Pattern & Preserving Left Table',
      image: '/assets/sql/07_left_outer_join.png',
      bullets: [
        'Preserving every single row from Table 1, regardless of matches in Table 2',
        'Automatic NULL padding for missing values in Table 2',
        'The Famous Anti-Join Pattern: Finding "Customers Who Never Placed An Order"',
        'Venn diagram breakdown showing Left Join vs Anti-Join logic'
      ],
      tag: 'Advanced Pattern'
    }
  ];

  const current = samples[activeTab];

  return (
    <section id="sample-notes" className="bg-[#EBAF87] py-12 sm:py-20 border-t border-[#D49F7B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#7C2928] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md mb-4 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>100% Genuine Notes Preview</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1F1714] tracking-tight leading-tight mb-4">
            Look Inside: Real Handwritten Visual Notes
          </h2>

          <p className="text-base sm:text-lg font-semibold text-[#3A2D26]">
            Don&apos;t just take our word for it. Inspect the actual complete sample pages below from our 2026 edition. Every single topic is broken down with color-coded diagrams, clear handwriting, and intuitive real-world metaphors.
          </p>
        </div>

        {/* Tab Selector Buttons (Horizontal scroll on mobile, wrap on desktop) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {samples.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 shadow-sm ${
                  isActive
                    ? 'bg-[#7C2928] text-white shadow-md scale-105 ring-2 ring-white/50'
                    : 'bg-white/90 text-[#1F1714] hover:bg-white hover:text-[#7C2928]'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#7C2928]'}`} />
                <span>{item.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#7C2928]/10 text-[#7C2928]'
                }`}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Display Box: Complete Original Image + Topic Details */}
        <div className="bg-[#F7E5D3] rounded-3xl border-2 border-[#E2BEA2] p-4 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Complete Uncut Original Note Sheet */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                onClick={() => onOpenModal(activeTab)}
                className="w-full max-w-[480px] bg-white rounded-2xl p-2.5 sm:p-4 shadow-2xl border-2 border-white/80 cursor-pointer group relative transition-all duration-300 hover:scale-[1.01]"
                title="Click to view full-resolution zoom"
              >
                {/* Header banner on sheet */}
                <div className="bg-[#7C2928] text-white px-3 py-1.5 rounded-lg mb-2 flex items-center justify-between text-xs font-bold">
                  <span>{current.badge}</span>
                  <span className="text-amber-200">PAGE {activeTab + 1} OF 7</span>
                </div>

                {/* Complete Original Image Container (Mobile Responsive) */}
                <div className="relative w-full aspect-[1568/2450] rounded-lg overflow-hidden bg-neutral-100 shadow-inner">
                  <Image
                    src={current.image}
                    alt={current.sub}
                    fill
                    className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 95vw, 480px"
                    priority
                  />
                  
                  {/* Floating Zoom Button */}
                  <div className="absolute bottom-3 right-3 bg-[#1F1714]/85 hover:bg-[#7C2928] text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-md flex items-center gap-1.5 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Zoom Full-Screen</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-[#7C2928] px-1">
                  <span>✨ 100% Complete Original Sheet</span>
                  <span className="text-[#1F1714] group-hover:text-[#7C2928]">Tap image to expand ↗</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Breakdown of What You Learn */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              <div className="inline-block bg-[#7C2928]/15 text-[#7C2928] text-xs font-extrabold px-3 py-1 rounded-md mb-2 uppercase tracking-wide">
                {current.badge}
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1F1714] leading-tight mb-3">
                {current.sub}
              </h3>

              <p className="text-sm sm:text-base font-semibold text-[#5A4B43] mb-6">
                This sheet gives you immediate conceptual clarity without requiring hours of confusing video lectures. Look at the structured format:
              </p>

              {/* Bullets */}
              <div className="w-full space-y-3.5 mb-8">
                {current.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 bg-white/70 p-3 rounded-xl border border-[#E2BEA2]/60 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#7C2928] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-[#2D201A] leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust Guarantee Box */}
              <div className="w-full bg-[#7C2928]/10 rounded-2xl p-4 border border-[#7C2928]/20 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#7C2928] shrink-0" />
                <div className="text-xs sm:text-sm font-semibold text-[#3A2D26]">
                  <strong className="text-[#1F1714] block font-bold">16 Core Units in Full High-Resolution PDF</strong>
                  Instant download to your device immediately after payment.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={BUY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7C2928] hover:bg-[#521B18] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Get Complete Ebook (₹99)</span>
                </a>

                <button
                  onClick={() => onOpenModal(activeTab)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#7C2928] border border-[#7C2928]/30 font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-sm hover:bg-neutral-50 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read Full Page (High-Res)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Thumbnail Selector Strip for All 7 Sheets */}
        <div className="mt-8">
          <p className="text-center text-xs sm:text-sm font-extrabold text-[#1F1714] mb-3">
            SELECT ANY SHEET TO PREVIEW ORIGINAL CONTENT:
          </p>
          <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 sm:pb-0 px-1 scroll-smooth">
            {samples.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`relative w-20 sm:w-24 md:w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white shadow-md group ${
                  activeTab === idx
                    ? 'border-[#7C2928] ring-2 ring-[#7C2928] scale-105'
                    : 'border-white/80 hover:border-[#7C2928]/50 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="relative w-full aspect-[1568/2200] rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 30vw, 140px"
                  />
                </div>
                <p className="text-[11px] font-extrabold text-center text-[#1F1714] mt-1.5 truncate">
                  Sheet {idx + 1}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
