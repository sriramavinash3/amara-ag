import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'accent', 'outline', 'outline-stone', 'outline-white', 'solid-white', 'ghost', 'ghost-dark'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-950/40 focus-visible:outline-emerald-500 transform hover:-translate-y-0.5 active:translate-y-0 font-semibold',
    secondary: 'bg-[#454242] border border-[#585454] hover:bg-[#514E4E] hover:border-emerald-500/50 text-[#FFFFFF] focus-visible:outline-emerald-500 transform hover:-translate-y-0.5 active:translate-y-0 font-semibold',
    accent: 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md focus-visible:outline-emerald-500 transform hover:-translate-y-0.5 active:translate-y-0 font-semibold',
    outline: 'bg-transparent border border-[#585454] hover:bg-[#454242] hover:border-[#6A6565] text-[#FFFFFF] focus-visible:outline-emerald-500 font-semibold',
    'outline-stone': 'bg-[#454242] border border-[#585454] hover:bg-[#514E4E] hover:border-[#6A6565] text-[#FFFFFF] focus-visible:outline-emerald-500 font-bold',
    'outline-graphite': 'bg-[#454242] border border-[#585454] hover:bg-[#514E4E] hover:border-[#6A6565] text-[#FFFFFF] focus-visible:outline-emerald-500 transition-colors',
    'outline-white': 'bg-transparent border border-white/40 hover:bg-white/10 text-[#FFFFFF] focus-visible:outline-white',
    'solid-white': 'bg-[#454242] border border-[#585454] hover:bg-[#514E4E] text-[#FFFFFF] focus-visible:outline-emerald-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'hover:bg-[#454242] text-[#F0F0F0] hover:text-[#FFFFFF] focus-visible:outline-emerald-500',
    'ghost-dark': 'hover:bg-[#514E4E] text-[#F0F0F0] hover:text-emerald-300 focus-visible:outline-emerald-500',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-semibold',
  };

  const iconSizes = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-5 w-5',
    lg: 'h-5 w-5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={`${iconSizes[size]} ${children ? 'mr-1.5' : ''}`} aria-hidden="true" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`${iconSizes[size]} ${children ? 'ml-1.5' : ''}`} aria-hidden="true" />
      )}
    </button>
  );
}
