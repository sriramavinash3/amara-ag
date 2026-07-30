import React from 'react';

export default function Badge({
  children,
  variant = 'primary', // 'primary', 'secondary', 'accent', 'success', 'warning', 'neutral'
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300';
  
  const variants = {
    primary: 'bg-cta-100 text-cta-700',
    secondary: 'bg-medical-100 text-medical-700',
    accent: 'bg-accent-100 text-accent-700',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    neutral: 'bg-slate-100 text-slate-700',
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
