import React from 'react';

export default function CmsButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger-outline', 'ghost-danger'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  ...props
}) {
  const variantClass = {
    primary: 'cms-button-primary',
    secondary: 'cms-button-secondary',
    'danger-outline': 'cms-button-danger-outline',
    'ghost-danger': 'cms-button-ghost-danger',
  }[variant] || 'cms-button-primary';

  const sizeClass = {
    sm: 'cms-button-sm',
    md: '',
    lg: 'cms-button-lg',
  }[size] || '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cms-button ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
