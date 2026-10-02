'use client';

import React, { useState, use } from 'react';
import { DISHES, Dish } from '@/data/dishes';
import { useCart } from '@/context/CartContext';
import Dish3DViewer from '@/components/3d/Dish3DViewer';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Plus, Minus, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DishDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const dish = DISHES.find((d) => d.slug === slug) || DISHES[0];

  const [selectedPortion, setSelectedPortion] = useState(dish.portions[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const currentUnitPrice = Math.round(dish.price * selectedPortion.priceMultiplier);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAdd = () => {
    addToCart(dish, selectedPortion.name, selectedPortion.priceMultiplier, quantity);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#0B201A] hover:text-[#C5A059] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Menu</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive 3D Dish View */}
          <div className="lg:col-span-6 space-y-4">
            <Dish3DViewer course={dish.course} imageUrl={dish.image} name={dish.name} />

            {/* Sub-image preview */}
            <div className="relative h-48 rounded-xl overflow-hidden border border-[#C5A059]/30 shadow-md">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-[#0B201A]/90 text-[#FAF7F2] px-3 py-1 rounded text-[11px] font-sans">
                Real Cooking Showcase
              </div>
            </div>
          </div>

          {/* Right Column: Story & Selection */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-sans text-[#C5A059] font-bold uppercase tracking-widest">
                <span>{dish.course}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {dish.origin}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A] mt-2">
                {dish.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <span className="font-serif text-2xl font-bold text-[#C5A059]">
                  {formatPrice(currentUnitPrice * quantity)}
                </span>
                <span className="text-xs font-sans text-[#2B4C40] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  Prep Time: {dish.prepTime}
                </span>
              </div>
            </div>

            {/* Story Box */}
            <div className="p-5 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-sm space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#0B201A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                The Origin Story
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#2B4C40] leading-relaxed italic">
                &ldquo;{dish.story}&rdquo;
              </p>
            </div>

            {/* Ingredients Chips */}
            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#0B201A] mb-2">
                Artisanal Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3 py-1 rounded-full bg-[#F4EFE6] text-[#0B201A] text-[11px] font-sans border border-[#C5A059]/20"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Portion Selection */}
            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#0B201A] mb-3">
                Select Portion Size
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dish.portions.map((portion) => {
                  const isSelected = selectedPortion.name === portion.name;
                  const price = Math.round(dish.price * portion.priceMultiplier);
                  return (
                    <button
                      key={portion.name}
                      onClick={() => setSelectedPortion(portion)}
                      className={`p-3.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#0B201A] text-[#FAF7F2] border-[#C5A059] shadow-md'
                          : 'bg-[#FFFDF9] text-[#0B201A] border-[#C5A059]/30 hover:bg-[#F4EFE6]'
                      }`}
                    >
                      <div>
                        <p className="font-serif text-xs font-bold">{portion.name}</p>
                        <p className={`text-[11px] ${isSelected ? 'text-[#C5A059]' : 'text-[#2B4C40]'}`}>
                          {formatPrice(price)}
                        </p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#C5A059]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Add to Bag CTA */}
            <div className="pt-4 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border border-[#C5A059]/40 rounded-md bg-[#FFFDF9] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#0B201A] hover:bg-[#F4EFE6] rounded transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-sans font-bold text-sm text-[#0B201A]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#0B201A] hover:bg-[#F4EFE6] rounded transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] py-4 rounded-md font-sans text-xs font-medium uppercase tracking-widest border border-[#C5A059] shadow-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span>Add {quantity} to Bag • {formatPrice(currentUnitPrice * quantity)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
