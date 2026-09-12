'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F1714] text-neutral-400 pt-6 pb-24 sm:pb-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
        <p>© 2026 SQL Mastery. All Rights Reserved. Practical SQL Learning &amp; Database Guide.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-neutral-300">
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <span>•</span>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
