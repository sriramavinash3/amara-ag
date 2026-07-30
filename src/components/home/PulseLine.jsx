import React from 'react';
import { motion } from 'framer-motion';

// The signature element: a single continuous EKG trace that stitches the
// headline to the syringe.
export default function PulseLine({ className = '' }) {
  const d = 'M0,40 L120,40 L145,10 L170,70 L195,40 L260,40 L285,20 L305,55 L330,40 L1000,40';

  return (
    <svg
      viewBox="0 0 1000 80"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke="url(#pulseGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
      />
      <defs>
        <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1baa9c" stopOpacity="0" />
          <stop offset="15%" stopColor="#1baa9c" />
          <stop offset="50%" stopColor="#4fa4e0" />
          <stop offset="100%" stopColor="#4fa4e0" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
