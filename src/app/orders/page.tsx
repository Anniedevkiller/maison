import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ShoppingBag, Calendar, MapPin, ArrowRight, Lock, Clock, UtensilsCrossed } from 'lucide-react';

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-36 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-[#0B201A] text-[#C5A059] border border-[#C5A059] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0B201A]">Sign In Required</h2>
          <p className="font-sans text-xs text-[#2B4C40]">
            Please sign in with your Google account to view your private dining pre-order history.
          </p>
          <div className="pt-2">
            <Link
              href="/login?next=/orders"
              className="inline-flex items-center gap-2 bg-[#0B201A] text-[#FAF7F2] px-6 py-3 rounded-md text-xs font-sans font-medium uppercase tracking-wider border border-[#C5A059]"
            >
              Sign In to View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch signed-in user's orders from Supabase with RLS
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const getStatusBadgeColor = (status: string) => {
    switch ((status || 'pending').toLowerCase()) {
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-sans tracking-widest uppercase text-[#C5A059] font-bold block">
            Guest History
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B201A] mt-1">
            My Pre-Order <span className="gold-gradient-text">Reservations</span>
          </h1>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            Failed to load your orders from Supabase. Please try again.
          </div>
        )}

        {!orders || orders.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 text-center space-y-4 shadow-md">
            <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0B201A]">No Pre-Orders Yet</h2>
            <p className="font-sans text-xs text-[#2B4C40] max-w-sm mx-auto">
              You haven't placed any fine dining pre-orders yet. Explore our seasonal menu cards and reserve your feast.
            </p>
            <div className="pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#0B201A] text-[#FAF7F2] px-6 py-3 rounded-md text-xs font-sans font-medium uppercase tracking-wider border border-[#C5A059]"
              >
                Browse Culinary Menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord: any) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#C5A059]/30 shadow-lg hover:shadow-xl transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C5A059]/15">
                  <div>
                    <span className="text-[11px] font-sans text-[#2B4C40] block">Order Ref</span>
                    <h3 className="font-serif font-bold text-lg text-[#0B201A]">
                      #{ord.id.slice(0, 8)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full border text-[11px] font-sans font-bold uppercase tracking-wider ${getStatusBadgeColor(
                        ord.status
                      )}`}
                    >
                      {ord.status || 'Pending'}
                    </span>

                    <Link
                      href={`/order/${ord.id}`}
                      className="inline-flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-wider text-[#0B201A] hover:text-[#C5A059] transition-colors"
                    >
                      <span>Receipt</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-[#2B4C40]">
                  <div>
                    <span className="block text-[10px] text-[#2B4C40]/70 uppercase">Pre-Order Date & Slot</span>
                    <span className="font-medium text-[#0B201A] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      {ord.preorder_date} ({ord.time_slot})
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-[#2B4C40]/70 uppercase">Fulfilment</span>
                    <span className="font-medium text-[#0B201A] flex items-center gap-1 mt-0.5 capitalize">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      {ord.fulfilment_type}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-[#2B4C40]/70 uppercase">Total Paid</span>
                    <span className="font-serif font-bold text-sm text-[#C5A059] mt-0.5 block">
                      {formatPrice(ord.total)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                {ord.order_items && ord.order_items.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {ord.order_items.map((item: any) => (
                      <span
                        key={item.id}
                        className="px-3 py-1 rounded-full bg-[#FAF7F2] text-[#0B201A] text-[11px] font-sans border border-[#C5A059]/20"
                      >
                        {item.dish_name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
