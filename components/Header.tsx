'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, BookOpen } from 'lucide-react';
import { BUY_URL } from '@/config/product';

interface HeaderProps {
  currentEdition: 'cbse' | 'sql';
  onToggleEdition: () => void;
  ctaText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentEdition,
  onToggleEdition,
  ctaText = 'Get SQL Ebook ₹99'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Offer', href: '#offer' },
    { label: 'Sample Notes', href: '#sample-notes' },
    { label: 'Modules', href: '#subjects' },
    { label: 'Why This Ebook', href: '#why-need' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#EBAF87]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#D49F7B]'
          : 'bg-[#EBAF87] py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - SQL Mastery 2026 */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#521B18] text-white flex items-center justify-center font-black shadow-md transition-transform group-hover:scale-105 border border-[#7C2928]">
            <span className="text-base sm:text-lg">⚡</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-xl font-black tracking-tight text-[#1F1714]">
              SQL<span className="text-[#7C2928]">Mastery</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#521B18] uppercase tracking-wider">
              2026 Practical Edition
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#1F1714]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#7C2928] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#7C2928] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA + Preview Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onToggleEdition}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white/90 hover:bg-white text-[#7C2928] border border-[#7C2928]/30 shadow-sm transition-all hover:scale-105"
            title="Preview sample pages from the SQL Ebook"
          >
            <BookOpen className="w-4 h-4 text-[#7C2928]" />
            <span>Preview Sample Notes</span>
          </button>

          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#7C2928] hover:bg-[#521B18] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{ctaText}</span>
          </a>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleEdition}
            className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-lg text-[11px] font-bold bg-white text-[#7C2928] border border-[#7C2928]/30 shadow-sm active:scale-95"
            aria-label="Preview sample notes"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <a
            href={BUY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 min-h-[36px] flex items-center justify-center rounded-lg text-xs font-black bg-[#7C2928] text-white shadow-sm active:scale-95"
            aria-label="Buy SQL Ebook for 99 rupees"
          >
            ₹99
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#521B18] text-white hover:bg-[#7C2928] transition-colors active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7E5D3] border-b border-[#D49F7B] px-5 py-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-1.5 font-semibold text-[#1F1714]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-white/80 text-[#1F1714] hover:text-[#7C2928] transition-all text-sm font-bold min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#D49F7B]/50 flex flex-col gap-2">
              <button
                onClick={() => {
                  onToggleEdition();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-[#7C2928] border border-[#7C2928]/30 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-[#7C2928]" />
                <span>Preview All 7 Sample Notes (Full-Screen)</span>
              </button>

              <a
                href={BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#7C2928] text-white px-4 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{ctaText}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
