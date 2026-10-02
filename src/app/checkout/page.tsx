'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, User as UserIcon, ShieldCheck, CheckCircle2, ShoppingBag, LogIn, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { user, loading, signInWithGoogle } = useAuth();

  // Min date (at least 48 hours / 2 days ahead)
  const minDateObj = new Date();
  minDateObj.setDate(minDateObj.getDate() + 2);
  const minDateStr = minDateObj.toISOString().split('T')[0];

  const [fulfilmentType, setFulfilmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: minDateStr,
    timeSlot: '18:00 - 20:00 (Evening Feast)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Auto populate user info when logged in
  useEffect(() => {
    if (user) {
      const defaultName = user.user_metadata?.full_name || user.user_metadata?.name || '';
      const defaultEmail = user.email || '';
      setFormData((prev) => ({
        ...prev,
        name: prev.name || defaultName,
        email: prev.email || defaultEmail,
      }));
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = fulfilmentType === 'delivery' ? 5000 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleGoogleAuth = async () => {
    try {
      setIsLoggingIn(true);
      await signInWithGoogle('/checkout');
    } catch (e) {
      console.error(e);
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!user) {
      handleGoogleAuth();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        items: cart.map((item) => ({
          dishId: item.dish.id,
          dishSlug: item.dish.slug,
          dishName: item.dish.name,
          portionName: item.portionName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        customer: formData,
        fulfilmentType,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place pre-order.');
      }

      // Success: clear cart and redirect to /order/[id]
      clearCart();
      router.push(`/order/${data.orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setServerError(err.message || 'Failed to submit pre-order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-36 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0B201A]">Your bag is currently empty</h2>
          <p className="font-sans text-xs text-[#2B4C40]">
            Please select your desired courses from our culinary menu before reserving a pre-order slot.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-6 py-3 rounded-md text-xs font-sans font-medium uppercase tracking-wider border border-[#C5A059]"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 sm:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#0B201A] hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Return to Menu</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A] mb-8">
          Pre-Order <span className="gold-gradient-text">Reservation</span>
        </h1>

        {/* Require Sign-in Notice Banner if Signed Out */}
        {!user && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-[#FFFDF9] border-2 border-[#C5A059] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-[#0B201A] text-[#C5A059] border border-[#C5A059] flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B201A]">Authentication Required</h3>
                <p className="font-sans text-xs text-[#2B4C40] mt-0.5">
                  Google Sign-In is required to secure your pre-order reservation window in Supabase.
                </p>
              </div>
            </div>

            <button
              onClick={handleGoogleAuth}
              disabled={isLoggingIn}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-6 py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider border border-[#C5A059] shadow-lg flex-shrink-0 transition-all active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoggingIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>
          </motion.div>
        )}

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-3 font-sans">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Fulfilment Method */}
            <div className="p-6 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-md space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#0B201A] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                1. Fulfilment Option
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfilmentType('delivery')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    fulfilmentType === 'delivery'
                      ? 'bg-[#0B201A] text-[#FAF7F2] border-[#C5A059]'
                      : 'bg-[#FAF7F2] text-[#0B201A] border-[#C5A059]/30'
                  }`}
                >
                  <p className="font-serif font-bold text-sm">Private Delivery</p>
                  <p className={`text-[11px] mt-1 ${fulfilmentType === 'delivery' ? 'text-[#C5A059]' : 'text-[#2B4C40]'}`}>
                    Insulated luxury thermal box (₦5,000)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentType('pickup')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    fulfilmentType === 'pickup'
                      ? 'bg-[#0B201A] text-[#FAF7F2] border-[#C5A059]'
                      : 'bg-[#FAF7F2] text-[#0B201A] border-[#C5A059]/30'
                  }`}
                >
                  <p className="font-serif font-bold text-sm">Maison Pickup</p>
                  <p className={`text-[11px] mt-1 ${fulfilmentType === 'pickup' ? 'text-[#C5A059]' : 'text-[#2B4C40]'}`}>
                    Victoria Island Promenade (Complimentary)
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Date & Time Slot (Minimum 48 Hours Ahead) */}
            <div className="p-6 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-md space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#0B201A] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
                2. Select Date & Time Slot (Min 48 Hours Ahead)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                    Pre-Order Date
                  </label>
                  <input
                    type="date"
                    min={minDateStr}
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                  <p className="text-[10px] text-[#2B4C40] mt-1 italic">
                    Requires 48h advance window for slow-woodfire cooking.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  >
                    <option value="12:00 - 14:00 (Lunch Service)">12:00 – 14:00 (Lunch Service)</option>
                    <option value="14:00 - 16:00 (Afternoon Service)">14:00 – 16:00 (Afternoon Service)</option>
                    <option value="18:00 - 20:00 (Evening Feast)">18:00 – 20:00 (Evening Feast)</option>
                    <option value="20:00 - 22:00 (Late Supper)">20:00 – 22:00 (Late Supper)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Guest Details */}
            <div className="p-6 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-md space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#0B201A] flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#C5A059]" />
                3. Customer Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Chief Adebayo Alaba"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="adebayo@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>

              {fulfilmentType === 'delivery' && (
                <div>
                  <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Penthouse 4, Queen's Drive, Ikoyi, Lagos"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-sans font-bold uppercase text-[#0B201A] mb-1">
                  Chef Instructions & Dietary Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Extra scotch bonnet reduction on the side, nut allergy preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#C5A059]/30 rounded-md px-3.5 py-2.5 text-xs text-[#0B201A] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-xl space-y-6 sticky top-28">
              <h3 className="font-serif font-bold text-xl text-[#0B201A] border-b border-[#C5A059]/20 pb-3">
                Reservation Summary
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs border-b border-[#C5A059]/10 pb-3">
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

              <div className="space-y-2 text-xs font-sans text-[#2B4C40] pt-2">
                <div className="flex justify-between">
                  <span>Courses Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfilment ({fulfilmentType})</span>
                  <span>{deliveryFee === 0 ? 'Complimentary' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="gold-divider my-2" />
                <div className="flex justify-between text-base font-serif font-bold text-[#0B201A]">
                  <span>Total Amount</span>
                  <span className="text-[#C5A059]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#F3E9D2]/40 border border-[#C5A059]/30 text-[11px] text-[#0B201A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>Pre-Order confirmation will be recorded directly into Supabase.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoggingIn}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] py-4 rounded-md font-sans text-xs font-medium uppercase tracking-widest border border-[#C5A059] shadow-xl disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span>Submitting Pre-Order to Kitchen...</span>
                ) : !user ? (
                  <>
                    <span>Sign in with Google to Reserve</span>
                    <LogIn className="w-4 h-4 text-[#C5A059]" />
                  </>
                ) : (
                  <>
                    <span>Confirm Pre-Order</span>
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
