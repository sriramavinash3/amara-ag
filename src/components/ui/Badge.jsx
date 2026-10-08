import React from 'react';

export default function Badge({
  children,
  variant = 'primary', // 'primary', 'secondary', 'accent', 'success', 'warning', 'neutral'
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300';
  
  const variants = {
    primary: 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40',
    secondary: 'bg-[#454242] text-emerald-300 border border-[#585454]',
    accent: 'bg-[#454242] text-[#FFFFFF] border border-[#585454]',
    success: 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40',
    warning: 'bg-amber-950/50 text-amber-200 border border-amber-500/40',
    neutral: 'bg-[#363434] text-[#F0F0F0] border border-[#585454]',
    'graphite-green': 'bg-[#323030] text-emerald-300 border border-emerald-500/40 shadow-inner',
    'warm-offwhite': 'bg-[#454242] text-emerald-300 border border-[#585454]',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
