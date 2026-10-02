'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#C5A059] pointer-events-none z-[999] -ml-4 -mt-4 hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
      />
      {/* Inner Gold Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C5A059] pointer-events-none z-[999] -ml-1 -mt-1 hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.05 }}
      />
    </>
  );
}
