'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dish } from '@/data/dishes';
import { useCart } from '@/context/CartContext';
import Tilt3DCard from '@/components/3d/Tilt3DCard';
import { Plus, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Tilt3DCard maxTilt={8}>
      <div className="bg-[#FFFDF9] rounded-xl overflow-hidden border border-[#C5A059]/25 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative">
        {/* Chef Special Badge */}
        {dish.isChefSpecial && (
          <div className="absolute top-3 right-3 z-10 bg-[#0B201A] text-[#C5A059] border border-[#C5A059] text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>Chef's Signature</span>
          </div>
        )}

        {/* Image Container */}
        <Link href={`/dish/${dish.slug}`} className="block relative h-56 sm:h-64 w-full overflow-hidden bg-[#F4EFE6]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B201A]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Origin Badge on Bottom Image */}
          <div className="absolute bottom-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-sans font-medium text-[#0B201A] border border-[#C5A059]/30">
            {dish.origin}
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans tracking-widest uppercase text-[#C5A059] font-bold">
                {dish.course}
              </span>
              <span className="text-xs font-sans text-[#2B4C40] italic">
                Prep: {dish.prepTime}
              </span>
            </div>

            <Link href={`/dish/${dish.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
              <h3 className="font-serif text-xl font-bold text-[#0B201A] leading-snug">
                {dish.name}
              </h3>
            </Link>

            <p className="font-sans text-xs text-[#2B4C40] line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Price & Action CTA */}
          <div className="pt-3 border-t border-[#C5A059]/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-sans text-[#2B4C40] uppercase block tracking-wider">Starting at</span>
              <span className="font-serif text-lg font-bold text-[#0B201A]">
                {formatPrice(dish.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/dish/${dish.slug}`}
                className="p-2 rounded-full border border-[#C5A059]/40 text-[#0B201A] hover:bg-[#F4EFE6] transition-colors"
                title="View origin story"
                aria-label={`View story for ${dish.name}`}
              >
                <BookOpen className="w-4 h-4 text-[#C5A059]" />
              </Link>

              <button
                onClick={() => addToCart(dish)}
                className="inline-flex items-center gap-1.5 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] text-xs font-sans font-medium uppercase tracking-wider px-3.5 py-2.5 rounded-md border border-[#C5A059] transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 text-[#C5A059]" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
}
