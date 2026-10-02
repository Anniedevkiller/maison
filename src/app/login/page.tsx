'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { UtensilsCrossed, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/checkout';
  const errorMessage = searchParams.get('error');

  const { user, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(errorMessage);

  useEffect(() => {
    if (user) {
      router.push(nextPath);
    }
  }, [user, nextPath, router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setAuthError(null);
      await signInWithGoogle(nextPath);
    } catch (e: any) {
      console.error(e);
      setAuthError(e.message || 'Failed to initiate Google Sign-In');
      setIsSigningIn(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 shadow-2xl p-8 sm:p-10 space-y-8 text-center relative overflow-hidden"
    >
      {/* Top Brand Emblem */}
      <div className="space-y-3">
        <div className="w-14 h-14 rounded-full border border-[#C5A059] bg-[#0B201A] flex items-center justify-center text-[#C5A059] mx-auto shadow-lg">
          <UtensilsCrossed className="w-7 h-7 text-[#C5A059]" />
        </div>

        <span className="text-xs font-sans tracking-widest uppercase text-[#C5A059] font-bold block">
          Exclusive Guest Portal
        </span>

        <h1 className="font-serif text-3xl font-bold text-[#0B201A]">
          Sign In to <span className="gold-gradient-text">Maison Jollof</span>
        </h1>

        <p className="font-sans text-xs text-[#2B4C40] leading-relaxed max-w-xs mx-auto">
          Access your private pre-order reservations and haute dining preferences.
        </p>
      </div>

      {authError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 text-center font-sans">
          {authError}
        </div>
      )}

      {/* Google OAuth Button */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="w-full flex items-center justify-center gap-3 bg-[#FFFDF9] hover:bg-[#F4EFE6] text-[#0B201A] py-4 rounded-lg font-sans text-xs font-bold uppercase tracking-wider border border-[#C5A059]/60 shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          <span>{isSigningIn ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>
      </div>

      {/* Security Assurance */}
      <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-center gap-2 text-[11px] font-sans text-[#2B4C40]">
        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
        <span>Secure authentication via Supabase Auth</span>
      </div>

      <div className="pt-2 text-center">
        <Link
          href="/menu"
          className="text-xs font-sans text-[#0B201A] hover:text-[#C5A059] transition-colors uppercase tracking-wider font-bold inline-flex items-center gap-1"
        >
          <span>Browse Menu First</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-[#FFFDF9] rounded-2xl border border-[#C5A059]/40 p-8 text-center font-serif text-[#0B201A]">
            Loading Portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
