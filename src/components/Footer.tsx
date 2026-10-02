'use client';

import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Phone, Mail, MapPin, Globe, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#0B201A] text-[#FAF7F2] border-t border-[#C5A059]/30 relative overflow-hidden">
      {/* Gold decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & 3D Spinning Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border border-[#C5A059] bg-[#163E32] flex items-center justify-center text-[#C5A059] shadow-lg flex-shrink-0"
              >
                <UtensilsCrossed className="w-5 h-5 text-[#C5A059]" />
              </motion.div>
              <div>
                <span className="font-serif text-xl tracking-widest uppercase font-bold text-[#FAF7F2] block">
                  MAISON <span className="text-[#C5A059]">JOLLOF</span>
                </span>
                <span className="font-sans text-[10px] tracking-widest text-[#C5A059] uppercase">
                  From the pot to the table
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-[#FAF7F2]/70 leading-relaxed pt-2">
              An haute cuisine tribute to West African culinary roots, prepared with ancestral smoke and European fine-dining elegance.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B201A] transition-colors" aria-label="Global Dining">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B201A] transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B201A] transition-colors" aria-label="Maison Journal">
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-serif text-base text-[#C5A059] font-semibold tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 font-sans text-xs text-[#FAF7F2]/80">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition-colors">Home & Story</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#C5A059] transition-colors">Culinary Menu</Link>
              </li>
              <li>
                <Link href="/#pot" className="hover:text-[#C5A059] transition-colors">Chapter I: The Pot</Link>
              </li>
              <li>
                <Link href="/#fire" className="hover:text-[#C5A059] transition-colors">Chapter II: The Fire</Link>
              </li>
              <li>
                <Link href="/#table" className="hover:text-[#C5A059] transition-colors">Chapter III: The Table</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#C5A059] transition-colors">Pre-Order Reservation</Link>
              </li>
            </ul>
          </div>

          {/* Hours & Policy */}
          <div>
            <h3 className="font-serif text-base text-[#C5A059] font-semibold tracking-wider uppercase mb-4">
              Service Hours
            </h3>
            <div className="space-y-2 font-sans text-xs text-[#FAF7F2]/80">
              <p className="font-medium text-[#FAF7F2]">Pre-Orders Only</p>
              <p className="text-[#FAF7F2]/60">Minimum 48 Hours Advance Reservation</p>
              <div className="pt-2 border-t border-[#C5A059]/20 space-y-1">
                <p>Tuesday — Sunday: 12:00 – 22:00</p>
                <p>Monday: Kitchen Resting</p>
              </div>
              <p className="text-[11px] text-[#C5A059] pt-2 italic">
                Exclusive private dining & catering services available upon request.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-base text-[#C5A059] font-semibold tracking-wider uppercase mb-4">
              Private Concierge
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#FAF7F2]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>14 Victoria Island Promenade, Lagos / 8 Rue de la Paix, Paris</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>+234 800 MAISON (+234 800 624 766)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>concierge@maisonjollof.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-8 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#FAF7F2]/50 gap-4">
          <p>© {new Date().getFullYear()} MAISON JOLLOF. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            <span>Crafted with passion for African Gastronomy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Pre-Order Experience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
