'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChapterIndicatorProps {
  progress: number; // 0 to 1
}

const CHAPTER_ITEMS = [
  { id: 'hero', number: '00', label: 'Intro', targetProgress: 0.05 },
  { id: 'pot', number: 'I', label: 'The Pot', targetProgress: 0.28 },
  { id: 'fire', number: 'II', label: 'The Fire', targetProgress: 0.52 },
  { id: 'table', number: 'III', label: 'The Table', targetProgress: 0.72 },
  { id: 'order', number: 'IV', label: 'The Order', targetProgress: 0.90 },
];

export default function ChapterIndicator({ progress }: ChapterIndicatorProps) {
  const getActiveIndex = () => {
    if (progress < 0.20) return 0;
    if (progress < 0.40) return 1;
    if (progress < 0.65) return 2;
    if (progress < 0.83) return 3;
    return 4;
  };

  const activeIdx = getActiveIndex();

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Sticky Side Indicator (Right side) */}
      <aside className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col space-y-5 items-end">
        {CHAPTER_ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={item.id}
              onClick={() => scrollToChapter(item.id)}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label={`Jump to Chapter ${item.number}`}
            >
              <span
                className={`font-sans text-[11px] uppercase tracking-widest transition-all ${
                  isActive
                    ? 'text-[#C5A059] font-bold opacity-100'
                    : 'text-[#0B201A]/50 group-hover:text-[#0B201A] opacity-0 group-hover:opacity-100'
                }`}
              >
                {item.label}
              </span>

              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center font-serif text-xs font-bold transition-all ${
                  isActive
                    ? 'border-[#C5A059] bg-[#0B201A] text-[#C5A059] scale-110 shadow-lg'
                    : 'border-[#C5A059]/30 bg-[#FFFDF9]/80 text-[#0B201A]/70 hover:border-[#C5A059]'
                }`}
              >
                {item.number}
              </div>
            </button>
          );
        })}
      </aside>

      {/* Mobile Sticky Bottom Bar Indicator */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#0B201A]/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full py-2 px-4 shadow-xl flex items-center justify-around">
        {CHAPTER_ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={item.id}
              onClick={() => scrollToChapter(item.id)}
              className={`font-serif text-xs font-bold px-2 py-1 rounded-full transition-all ${
                isActive ? 'bg-[#C5A059] text-[#0B201A]' : 'text-[#FAF7F2]/70'
              }`}
            >
              {item.number}
            </button>
          );
        })}
      </div>
    </>
  );
}
