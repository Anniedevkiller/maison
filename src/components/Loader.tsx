'use client';

import React, { useState, useEffect } from 'react';
import { Flame, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-[#0B201A] text-[#FAF7F2] flex flex-col items-center justify-center p-4"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-[#163E32] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-2xl mb-6"
          >
            <Flame className="w-8 h-8 text-[#C5A059] animate-pulse" />
          </motion.div>

          <h2 className="font-serif text-2xl font-bold tracking-widest uppercase text-[#FAF7F2]">
            MAISON <span className="text-[#C5A059]">JOLLOF</span>
          </h2>

          <p className="font-serif italic text-sm text-[#C5A059] mt-2 animate-pulse">
            Lighting the fire...
          </p>

          <div className="w-48 h-0.5 bg-[#FAF7F2]/20 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
