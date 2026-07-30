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
    white: 'bg-white border border-slate-100 shadow-premium',
    slate: 'bg-slate-50 border border-slate-100',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-premium',
    borderless: 'bg-transparent shadow-none',
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
