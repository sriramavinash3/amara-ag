import React from 'react';

export default function CmsCard({
  children,
  className = '',
  variant = 'default', // 'default', 'login'
  padding = 'md', // 'none', 'sm', 'md', 'lg'
  header,
  ...props
}) {
  const baseCardClass = variant === 'login' ? 'cms-card-login' : 'cms-card';

  const paddingStyle = {
    none: { padding: 0 },
    sm: { padding: '16px' },
    md: { padding: '24px' },
    lg: { padding: '32px' },
  }[padding] || { padding: '24px' };

  return (
    <div className={`${baseCardClass} ${className}`} {...props}>
      {header && <div className="cms-card-header">{header}</div>}
      <div style={paddingStyle}>{children}</div>
    </div>
  );
}
