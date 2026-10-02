'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CHAPTERS, DISHES } from '@/data/dishes';
import DishCard from '@/components/DishCard';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Sparkles, Utensils, Calendar, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

// Lazy-load 3D scenes with static SSR fallback for fast initial paint
const Hero3DScene = dynamic(() => import('@/components/3d/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const FloatingSpices3D = dynamic(() => import('@/components/3d/FloatingSpices3D'), {
  ssr: false,
});

const CalendarBox3D = dynamic(() => import('@/components/3d/CalendarBox3D'), {
  ssr: false,
});

export default function HomePage() {
  const featuredDishes = DISHES.filter((d) => d.isChefSpecial || d.course === 'Plats').slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] overflow-hidden">
      {/* Dynamic 3D Floating Spices Drifting Background */}
      <FloatingSpices3D />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
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

          {/* Right Interactive 3D Jollof Pot & Steam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <Hero3DScene />
          </motion.div>
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
            className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
              alt="Ancestral Cast Iron Pot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B201A]/80 via-[#0B201A]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel text-[#0B201A]">
              <span className="font-serif italic text-sm font-semibold text-[#C5A059]">
                CHAPTER I — ANCESTRAL HEARTH
              </span>
              <p className="font-serif text-lg font-bold mt-1">The Cast-Iron Pot</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059]">
              Chapter 01
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A]">
              The Pot: Ancestral Roots & Firewood Heritage
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#2B4C40] leading-relaxed">
              {CHAPTERS[1].story}
            </p>
            <blockquote className="border-l-2 border-[#C5A059] pl-4 italic font-serif text-lg text-[#0B201A]">
              &ldquo;{CHAPTERS[1].quote}&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* --- CHAPTER 2: THE FIRE --- */}
      <section id="fire" className="py-24 bg-[#F4EFE6] border-y border-[#C5A059]/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1 space-y-6"
            >
              <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059]">
                Chapter 02
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A]">
                The Fire: The Craft of Patience
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#2B4C40] leading-relaxed">
                {CHAPTERS[2].story}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#FFFDF9] border border-[#C5A059]/30">
                  <Flame className="w-5 h-5 text-[#C5A059] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-[#0B201A]">Hickory Smoke</h4>
                  <p className="font-sans text-xs text-[#2B4C40]">Infused slowly under lid pressure.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#FFFDF9] border border-[#C5A059]/30">
                  <Utensils className="w-5 h-5 text-[#C5A059] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-[#0B201A]">Hand-Pounded Yaji</h4>
                  <p className="font-sans text-xs text-[#2B4C40]">Roasted ginger, kuli-kuli & uda.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-1 lg:order-2 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop"
                alt="Woodfire Charred Cuisine"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURED DISHES PREVIEW --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* --- CHAPTER 3: THE TABLE --- */}
      <section id="table" className="py-24 bg-[#0B201A] text-[#FAF7F2] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
                alt="European Fine Dining Table Presentation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-sans font-bold tracking-widest uppercase text-[#C5A059]">
                Chapter 03
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF7F2]">
                The Table: The Art of Shared Communion
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed">
                {CHAPTERS[3].story}
              </p>
              <blockquote className="border-l-2 border-[#C5A059] pl-4 italic font-serif text-lg text-[#C5A059]">
                &ldquo;{CHAPTERS[3].quote}&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CHAPTER 4: THE ORDER (PRE-ORDER IN 3 STEPS + 3D BOX) --- */}
      <section id="order" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div>
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

            <div className="space-y-6">
              {CHAPTERS[4].steps?.map((st) => (
                <div key={st.step} className="flex gap-4 p-5 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-md">
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

            <div className="pt-4">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-8 py-4 rounded-md font-sans text-xs tracking-widest uppercase font-medium border border-[#C5A059] shadow-xl transition-all"
              >
                <span>Reserve Your Date Now</span>
                <Calendar className="w-4 h-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 rounded-2xl glass-panel border border-[#C5A059]/40 shadow-2xl">
            <CalendarBox3D />
            <h3 className="font-serif font-bold text-xl text-[#0B201A] mt-4">48-Hour Advance Notice</h3>
            <p className="font-sans text-xs text-[#2B4C40] mt-2 max-w-xs">
              Every order receives an assigned time slot and custom luxury heat-insulated packaging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
