'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Mail, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  // Calculate min date (at least 48 hours / 2 days ahead)
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = fulfilmentType === 'delivery' ? 5000 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save order details to sessionStorage for confirmation page display
    const orderDetails = {
      orderId: `MJ-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      customer: formData,
      fulfilmentType,
      subtotal,
      deliveryFee,
      total: grandTotal,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    sessionStorage.setItem('maison_latest_order', JSON.stringify(orderDetails));

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push('/order-confirmation');
    }, 1200);
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
                <User className="w-5 h-5 text-[#C5A059]" />
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
                <span>Pre-Order confirmation email will be generated instantly upon submission.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] py-4 rounded-md font-sans text-xs font-medium uppercase tracking-widest border border-[#C5A059] shadow-xl disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span>Reserving Your Feast...</span>
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
