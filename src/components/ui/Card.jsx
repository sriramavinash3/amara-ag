import React from 'react';

export default function Card({
  children,
  className = '',
  hoverable = false,
  variant = 'white', // 'white', 'slate', 'glass', 'borderless'
  padding = 'md', // 'none', 'sm', 'md', 'lg'
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-2xl transition-all duration-300 overflow-hidden';
  
  const variants = {
    white: 'bg-[#454242] border border-[#585454] text-[#FFFFFF] shadow-premium',
    slate: 'bg-[#363434] border border-[#585454] text-[#FFFFFF]',
    'warm-offwhite': 'bg-[#454242] border border-[#585454] text-[#FFFFFF] shadow-premium',
    graphite: 'bg-[#454242] border border-[#585454] text-[#FFFFFF] shadow-graphite',
    'graphite-elevated': 'bg-[#514E4E] border border-[#585454] text-[#FFFFFF] shadow-graphite',
    glass: 'bg-[#454242]/90 backdrop-blur-md border border-[#585454] text-[#FFFFFF] shadow-premium',
    'glass-dark': 'bg-[#323030]/90 backdrop-blur-md border border-[#585454] text-[#FFFFFF]',
    borderless: 'bg-transparent shadow-none text-[#FFFFFF]',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4 md:p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  };

  const hoverStyles = hoverable && onClick
    ? 'hover:-translate-y-1 hover:shadow-premium-hover cursor-pointer'
    : hoverable
      ? 'hover:-translate-y-1 hover:shadow-premium-hover'
      : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
