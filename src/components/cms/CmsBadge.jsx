import React from 'react';

export default function CmsBadge({
  children,
  variant = 'blue', // 'blue', 'green', 'amber', 'gray'
  className = '',
  ...props
}) {
  const variantClass = {
    blue: 'cms-badge-blue',
    green: 'cms-badge-green',
    amber: 'cms-badge-amber',
    gray: 'cms-badge-gray',
  }[variant] || 'cms-badge-blue';

  return (
    <span className={`cms-badge ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
