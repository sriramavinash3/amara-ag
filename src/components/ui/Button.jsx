import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' (coral), 'secondary' (blue), 'outline', 'ghost', 'accent' (teal)
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
    primary: 'bg-cta-600 hover:bg-cta-700 text-white shadow-md hover:shadow-lg focus-visible:outline-cta-600 transform hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-medical-600 hover:bg-medical-700 text-white shadow-sm hover:shadow-md focus-visible:outline-medical-600 transform hover:-translate-y-0.5 active:translate-y-0',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white shadow-sm hover:shadow-md focus-visible:outline-accent-600 transform hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-primary-900/10 hover:border-medical-600 hover:bg-medical-50 text-primary-800 hover:text-medical-600 focus-visible:outline-medical-600',
    ghost: 'hover:bg-primary-900/5 text-primary-700 hover:text-primary-900 focus-visible:outline-primary-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-semibold',
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
        <Icon className={`h-5 w-5 ${children ? 'mr-2' : ''}`} aria-hidden="true" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`h-5 w-5 ${children ? 'ml-2' : ''}`} aria-hidden="true" />
      )}
    </button>
  );
}
