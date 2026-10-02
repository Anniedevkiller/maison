'use client';

import React, { useState } from 'react';
import { DISHES, Dish } from '@/data/dishes';
import DishCard from '@/components/DishCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, UtensilsCrossed } from 'lucide-react';

const COURSES = ['All', 'Entrées', 'Plats', 'Desserts', 'Boissons'] as const;

export default function MenuPage() {
  const [activeCourse, setActiveCourse] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = DISHES.filter((dish) => {
    const matchesCourse = activeCourse === 'All' || dish.course === activeCourse;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 sm:pt-36 pb-24">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E9D2] text-[#0B201A] border border-[#C5A059]/40 text-xs font-sans tracking-widest uppercase">
          <UtensilsCrossed className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>La Carte Haute Cuisine</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#0B201A]">
          Our Culinary <span className="gold-gradient-text">Menu</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#2B4C40] max-w-2xl mx-auto leading-relaxed">
          Organized in traditional European course style: Entrées, Plats, Desserts, and artisanal Boissons. All dishes prepared fresh to pre-order.
        </p>

        {/* Search Bar & Course Selector */}
        <div className="pt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish, ingredient, or spice..."
              className="w-full bg-[#FFFDF9] border border-[#C5A059]/30 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#0B201A] placeholder-[#2B4C40]/50 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
          </div>
        </div>

        {/* Course Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {COURSES.map((course) => {
            const isActive = activeCourse === course;
            return (
              <button
                key={course}
                onClick={() => setActiveCourse(course)}
                className={`px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0B201A] text-[#C5A059] border border-[#C5A059] font-bold shadow-md'
                    : 'bg-[#FFFDF9] text-[#0B201A] hover:bg-[#F4EFE6] border border-[#C5A059]/20'
                }`}
              >
                {course}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {filteredDishes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-3"
            >
              <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#0B201A]">No dishes matched your search</h3>
              <p className="font-sans text-xs text-[#2B4C40]">Try adjusting your search keywords or filter tab.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
