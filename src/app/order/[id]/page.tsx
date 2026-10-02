import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { CheckCircle2, Calendar, MapPin, ArrowRight, Clock, AlertCircle, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  const supabase = await createClient();

  // Query order and items from Supabase with RLS
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-36 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 p-8 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0B201A]">Order Not Found</h2>
          <p className="font-sans text-xs text-[#2B4C40]">
            The requested pre-order record could not be found or you do not have permission to view it.
          </p>
          <div className="pt-2">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 bg-[#0B201A] text-[#FAF7F2] px-6 py-3 rounded-md text-xs font-sans font-medium uppercase tracking-wider border border-[#C5A059]"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-900 text-emerald-200 border-emerald-500';
      case 'ready':
        return 'bg-blue-900 text-blue-200 border-blue-500';
      case 'confirmed':
        return 'bg-amber-900 text-amber-200 border-amber-500';
      default:
        return 'bg-[#0B201A] text-[#C5A059] border-[#C5A059]';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-28 sm:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Top Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#0B201A] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
            </div>

            <span className="text-xs font-sans tracking-widest uppercase text-[#C5A059] font-bold block">
              Pre-Order Record # {order.id.slice(0, 8)}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B201A]">
              Thank You, {order.name}
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#2B4C40] max-w-md mx-auto leading-relaxed">
              Your pre-order has been recorded in Supabase. Our culinary team will slow-roast and woodfire your feast for your selected date.
            </p>
          </div>

          <div className="gold-divider" />

          {/* Status & Reservation Meta Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF7F2] p-5 rounded-xl border border-[#C5A059]/20 text-xs">
            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Order Status</span>
              <span
                className={`inline-block px-3 py-1 rounded-full border text-[11px] font-sans font-bold uppercase tracking-wider ${getStatusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Pre-Order Date & Slot</span>
              <span className="font-serif font-bold text-sm text-[#0B201A] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                {order.preorder_date} • {order.time_slot}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Fulfilment Type</span>
              <span className="font-serif font-bold text-sm text-[#0B201A] capitalize flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {order.fulfilment_type === 'delivery' ? 'Private Delivery' : 'Maison Pickup'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[#2B4C40] block">Contact Phone</span>
              <span className="font-serif font-bold text-sm text-[#0B201A]">{order.phone}</span>
            </div>

            {order.fulfilment_type === 'delivery' && order.address && (
              <div className="sm:col-span-2 space-y-1 border-t border-[#C5A059]/15 pt-2">
                <span className="text-[#2B4C40] block">Delivery Address</span>
                <span className="font-sans font-medium text-xs text-[#0B201A]">{order.address}</span>
              </div>
            )}
          </div>

          {/* Ordered Items Summary */}
          {order.order_items && order.order_items.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#0B201A] uppercase tracking-wider">
                Reserved Courses
              </h3>
              <div className="divide-y divide-[#C5A059]/15 border-t border-b border-[#C5A059]/20">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-serif font-bold text-[#0B201A]">{item.dish_name}</h4>
                      <p className="text-[11px] text-[#2B4C40] italic">
                        Quantity: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <span className="font-bold text-[#0B201A]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center text-base font-serif font-bold text-[#0B201A]">
                <span>Total Recorded Amount</span>
                <span className="text-[#C5A059] text-2xl">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C5A059]/20">
            <Link
              href="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B201A] text-[#FAF7F2] hover:bg-[#163E32] px-6 py-3.5 rounded-md text-xs font-sans tracking-widest uppercase font-medium border border-[#C5A059] shadow-md transition-all"
            >
              <span>View All My Orders</span>
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] text-[#0B201A] hover:bg-[#F4EFE6] px-6 py-3.5 rounded-md text-xs font-sans tracking-widest uppercase font-medium border border-[#C5A059]/40 transition-colors"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
