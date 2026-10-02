'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CHAPTERS, DISHES } from '@/data/dishes';
import DishCard from '@/components/DishCard';
import ChapterIndicator from '@/components/ChapterIndicator';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Flame, Sparkles, Utensils, Calendar, ChevronRight } from 'lucide-react';

const MainScrollStoryScene = dynamic(() => import('@/components/3d/MainScrollStoryScene'), {
  ssr: false,
});

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [currentProgress, setCurrentProgress] = useState(0);

  // Reliably update 3D scroll progress on every scroll tick
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setCurrentProgress(latest);
  });

  const featuredDishes = DISHES.filter((d) => d.isChefSpecial || d.course === 'Plats').slice(0, 3);

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      {/* 1. SINGLE FIXED 3D CANVAS BEHIND PAGE CONTENT */}
      <MainScrollStoryScene scrollProgress={currentProgress} />

      {/* 2. STICKY CHAPTER INDICATOR */}
      <ChapterIndicator progress={currentProgress} />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left bg-[#FFFDF9]/80 backdrop-blur-md p-8 rounded-2xl border border-[#C5A059]/30 shadow-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E9D2] border border-[#C5A059]/40 text-[#0B201A] text-xs font-sans tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>West African Gastronomy & European Fine Dining</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0B201A] leading-[1.1]">
              MAISON <span className="gold-gradient-text">JOLLOF</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-[#C5A059] tracking-wide">
              &ldquo;From the pot to the table.&rdquo;
            </p>

            <p className="font-sans text-base sm:text-lg text-[#2B4C40] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              An haute cuisine experience celebrating West African woodfire heritage. Prepared from scratch for your specified date with double-reduced peppers, smoked stockfish, and Parisian precision.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/checkout"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-8 py-4 rounded-md font-sans text-xs tracking-widest uppercase font-medium border border-[#C5A059] shadow-xl group transition-all"
              >
                <span>Pre-Order Your Feast</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] text-[#0B201A] hover:bg-[#F4EFE6] px-8 py-4 rounded-md font-sans text-xs tracking-widest uppercase font-medium border border-[#C5A059]/40 transition-colors"
              >
                <span>Explore Menu Cards</span>
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-5 h-[350px] sm:h-[450px]" />
        </div>
      </section>

      {/* Decorative Gold Divider */}
      <div className="max-w-4xl mx-auto my-4 gold-divider" />

      {/* --- CHAPTER 1: THE POT --- */}
      <section id="pot" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 bg-[#FFFDF9]/85 backdrop-blur-md p-8 rounded-2xl border border-[#C5A059]/30 shadow-xl relative overflow-hidden adire-border-top"
          >
            <div className="absolute top-2 right-4 chapter-number-huge pointer-events-none text-outline-gold">
              01
            </div>

            <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059] relative z-10">
              Chapter 01
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A] relative z-10">
              The Pot: Ancestral Roots & Firewood Heritage
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#2B4C40] leading-relaxed relative z-10">
              {CHAPTERS[1].story}
            </p>
            <blockquote className="border-l-2 border-[#C5A059] pl-4 italic font-serif text-lg text-[#0B201A] relative z-10">
              &ldquo;{CHAPTERS[1].quote}&rdquo;
            </blockquote>
          </motion.div>

          <div className="lg:col-span-6 h-[350px] sm:h-[450px]" />
        </div>
      </section>

      {/* --- CHAPTER 2: THE FIRE --- */}
      <section id="fire" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 h-[350px] sm:h-[450px]" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6 bg-[#0B201A]/80 backdrop-blur-md text-[#FAF7F2] p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-2 right-4 chapter-number-huge pointer-events-none text-outline-gold">
                02
              </div>

              <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059] relative z-10">
                Chapter 02
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF7F2] relative z-10">
                The Fire: The Craft of Patience
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed relative z-10">
                {CHAPTERS[2].story}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 relative z-10">
                <div className="p-4 rounded-lg bg-[#0B201A]/90 border border-[#C5A059]/30">
                  <Flame className="w-5 h-5 text-[#C5A059] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-[#FAF7F2]">Hickory Smoke</h4>
                  <p className="font-sans text-xs text-[#FAF7F2]/70">Infused slowly under lid pressure.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#0B201A]/90 border border-[#C5A059]/30">
                  <Utensils className="w-5 h-5 text-[#C5A059] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-[#FAF7F2]">Hand-Pounded Yaji</h4>
                  <p className="font-sans text-xs text-[#FAF7F2]/70">Roasted ginger, kuli-kuli & uda.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURED DISHES PREVIEW --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-[#FFFDF9]/60 backdrop-blur-sm rounded-3xl border border-[#C5A059]/20 my-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059]">
            Haute Culinary Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A]">
            Signature Creations
          </h2>
          <p className="font-sans text-sm text-[#2B4C40]">
            Each dish tells a story of heritage, prepared exclusively for your pre-ordered moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#0B201A] hover:text-[#C5A059] transition-colors group"
          >
            <span>View Full Menu Cards</span>
            <ChevronRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
        </div>
      </section>

      {/* --- CHAPTER 3: THE TABLE --- */}
      <section id="table" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6 bg-[#0B201A]/80 backdrop-blur-md text-[#FAF7F2] p-8 rounded-2xl border border-[#C5A059]/40 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-2 right-4 chapter-number-huge pointer-events-none text-outline-gold">
                03
              </div>

              <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059] relative z-10">
                Chapter 03
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF7F2] relative z-10">
                The Table: The Art of Shared Communion
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed relative z-10">
                {CHAPTERS[3].story}
              </p>
              <blockquote className="border-l-2 border-[#C5A059] pl-4 italic font-serif text-lg text-[#C5A059] relative z-10">
                &ldquo;{CHAPTERS[3].quote}&rdquo;
              </blockquote>
            </motion.div>

            <div className="lg:col-span-6 h-[350px] sm:h-[450px]" />
          </div>
        </div>
      </section>

      {/* --- CHAPTER 4: THE ORDER --- */}
      <section id="order" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 bg-[#FFFDF9]/90 backdrop-blur-md p-8 rounded-2xl border border-[#C5A059]/30 shadow-xl relative overflow-hidden adire-border-top">
            <div className="absolute top-2 right-4 chapter-number-huge pointer-events-none text-outline-gold">
              04
            </div>

            <div className="relative z-10">
              <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059]">
                Chapter 04
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A] mt-2">
                How Pre-Ordering Works
              </h2>
              <p className="font-sans text-sm text-[#2B4C40] mt-3">
                To preserve peak flavors and firewood aroma, all dishes are cooked to order with a minimum 48-hour advance window.
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              {CHAPTERS[4].steps?.map((st) => (
                <div key={st.step} className="flex gap-4 p-5 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#0B201A] text-[#C5A059] flex items-center justify-center font-serif font-bold text-sm flex-shrink-0">
                    {st.step}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0B201A]">{st.title}</h3>
                    <p className="font-sans text-xs text-[#2B4C40] mt-1">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 relative z-10">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-8 py-4 rounded-md font-sans text-xs tracking-widest uppercase font-medium border border-[#C5A059] shadow-xl transition-all"
              >
                <span>Reserve Your Date Now</span>
                <Calendar className="w-4 h-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-[350px] sm:h-[450px]" />
        </div>
      </section>
    </div>
  );
}
