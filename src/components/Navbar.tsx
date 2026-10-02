'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu as MenuIcon, X, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Our Story', href: '/#pot' },
    { name: 'Pre-Order', href: '/checkout' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#C5A059] rounded-md p-1">
            <div className="w-10 h-10 rounded-full border border-[#C5A059]/40 bg-[#0B201A] flex items-center justify-center text-[#C5A059] shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-widest uppercase font-bold text-[#0B201A]">
                MAISON <span className="text-[#C5A059]">JOLLOF</span>
              </span>
              <span className="font-sans text-[10px] tracking-widest text-[#2B4C40] uppercase">
                From the pot to the table
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm tracking-wider uppercase transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-[#C5A059] rounded ${
                    isActive ? 'text-[#C5A059] font-medium' : 'text-[#0B201A] hover:text-[#C5A059]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Bag Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059] flex items-center gap-2 px-4 shadow-sm"
              aria-label={`Open shopping bag with ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">Bag</span>
              {totalItems > 0 && (
                <span className="bg-[#C5A059] text-[#0B201A] text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#0B201A] hover:bg-[#F4EFE6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[#C5A059]/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-lg text-[#0B201A] hover:text-[#C5A059] transition-colors py-2 border-b border-[#C5A059]/10"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0B201A] text-[#FAF7F2] py-3 rounded-md text-sm font-medium tracking-wider uppercase border border-[#C5A059]"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  Browse Culinary Menu
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
