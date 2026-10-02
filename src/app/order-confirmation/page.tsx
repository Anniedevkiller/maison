'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, MapPin, Sparkles, UtensilsCrossed, ArrowRight, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('maison_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 sm:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden"
        >
          {/* Top Decorative Header */}
          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full bg-[#0B201A] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] mx-auto shadow-lg"
            >
              <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
            </motion.div>

            <span className="text-xs font-sans tracking-widest uppercase text-[#C5A059] font-bold block">
              Pre-Order Confirmed
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B201A]">
              Thank You, {order?.customer?.name || 'Valued Guest'}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#2B4C40] max-w-md mx-auto leading-relaxed">
              Your haute cuisine pre-order has been reserved. Our culinary team will slow-roast and woodfire your feast for your selected date.
            </p>
          </div>

          <div className="gold-divider" />

          {/* Reservation Card Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] p-5 rounded-xl border border-[#C5A059]/20 text-xs">
            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Reservation Reference</span>
              <span className="font-serif font-bold text-base text-[#0B201A]">
                {order?.orderId || 'MJ-892401'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Pre-Order Date & Slot</span>
              <span className="font-serif font-bold text-sm text-[#0B201A] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                {order?.customer?.date || 'Scheduled Date'} • {order?.customer?.timeSlot || 'Slot'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Fulfilment Method</span>
              <span className="font-serif font-bold text-sm text-[#0B201A] capitalize flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {order?.fulfilmentType === 'delivery' ? 'Private Delivery Service' : 'Maison Pickup'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Contact Phone</span>
              <span className="font-serif font-bold text-sm text-[#0B201A]">
                {order?.customer?.phone || '+234 800 000 0000'}
              </span>
            </div>
          </div>

          {/* Ordered Items Summary */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#0B201A] uppercase tracking-wider">
                Reserved Courses
              </h3>
              <div className="divide-y divide-[#C5A059]/15 border-t border-b border-[#C5A059]/20">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-serif font-bold text-[#0B201A]">{item.dish.name}</h4>
                      <p className="text-[11px] text-[#2B4C40] italic">
                        {item.portionName} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-[#0B201A]">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex justify-between items-center text-base font-serif font-bold text-[#0B201A]">
                <span>Total Paid</span>
                <span className="text-[#C5A059] text-xl">{formatPrice(order?.total)}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C5A059]/20">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-6 py-3 rounded-md text-xs font-sans tracking-widest uppercase font-medium border border-[#C5A059] shadow-md transition-all"
            >
              <span>Return Home</span>
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] text-[#0B201A] hover:bg-[#F4EFE6] px-6 py-3 rounded-md text-xs font-sans tracking-widest uppercase font-medium border border-[#C5A059]/40 transition-colors"
            >
              <span>Explore More Dishes</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
