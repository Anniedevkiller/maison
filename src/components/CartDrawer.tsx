'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#0B201A]/60 backdrop-blur-sm z-50 transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FFFDF9] border-l border-[#C5A059]/30 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C5A059]/20 flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                <h2 className="font-serif text-xl font-bold text-[#0B201A]">Your Culinary Bag</h2>
                <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-[#0B201A] text-[#C5A059] font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#0B201A]/70 hover:text-[#0B201A] hover:bg-[#F4EFE6] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#0B201A]">Your bag is empty</h3>
                  <p className="font-sans text-xs text-[#2B4C40] max-w-xs">
                    Explore our fine-dining West African creations and curate your private dining experience.
                  </p>
                  <Link
                    href="/menu"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 inline-flex items-center gap-2 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-6 py-3 rounded-md text-xs tracking-wider uppercase font-medium border border-[#C5A059] transition-all"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-[#C5A059]/15 group relative"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#F4EFE6] flex-shrink-0 border border-[#C5A059]/20">
                      <Image
                        src={item.dish.image}
                        alt={item.dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif font-semibold text-sm text-[#0B201A] line-clamp-1">
                            {item.dish.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-700/60 hover:text-red-700 p-1 rounded transition-colors"
                            aria-label={`Remove ${item.dish.name} from bag`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] font-sans text-[#2B4C40] italic">
                          {item.portionName}
                        </p>
                        <p className="text-xs font-semibold text-[#C5A059] mt-1">
                          {formatPrice(item.unitPrice)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#C5A059]/30 rounded bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-[#0B201A] hover:bg-[#F4EFE6] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#0B201A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-[#0B201A] hover:bg-[#F4EFE6] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#0B201A]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#C5A059]/20 bg-[#FAF7F2] space-y-4">
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#F3E9D2]/50 border border-[#C5A059]/30 text-[11px] text-[#0B201A]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Freshly cooked to order. Minimum 48h advance reservation.</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#2B4C40]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#2B4C40]">
                    <span>Artisanal Packaging</span>
                    <span className="text-[#C5A059] font-medium">Complimentary</span>
                  </div>
                  <div className="gold-divider my-2" />
                  <div className="flex justify-between text-base font-serif font-bold text-[#0B201A]">
                    <span>Estimated Total</span>
                    <span className="text-[#C5A059]">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] py-3.5 rounded-md text-xs font-medium uppercase tracking-widest border border-[#C5A059] shadow-lg group transition-all"
                >
                  <span>Proceed to Pre-Order</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
