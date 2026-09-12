'use client';

import React from 'react';
import { Sparkles, Check } from 'lucide-react';

interface EditionSwitcherProps {
  currentEdition: 'cbse' | 'sql';
  onSelectEdition: (edition: 'cbse' | 'sql') => void;
}

export const EditionSwitcher: React.FC<EditionSwitcherProps> = ({
  currentEdition,
  onSelectEdition
}) => {
  return (
    <aside aria-label="Edition Switcher" className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40">
      <div className="bg-[#1F1714]/90 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-1.5 transition-all hover:bg-[#1F1714]">
        <div className="flex items-center gap-1 px-2 text-xs font-bold text-[#E5A835]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Theme:</span>
        </div>

        <button
          onClick={() => onSelectEdition('cbse')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentEdition === 'cbse'
              ? 'bg-[#7C2928] text-white shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {currentEdition === 'cbse' && <Check className="w-3 h-3" />}
          <span>CBSE Class 7</span>
        </button>

        <button
          onClick={() => onSelectEdition('sql')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentEdition === 'sql'
              ? 'bg-[#7C2928] text-white shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {currentEdition === 'sql' && <Check className="w-3 h-3" />}
          <span>SQL Ebook</span>
        </button>
      </div>
    </aside>
  );
};
