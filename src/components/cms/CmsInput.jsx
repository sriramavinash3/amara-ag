import React from 'react';

export default function CmsInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="cms-label">
          {label}
          {required && <span style={{ color: '#b91c1c', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`cms-input ${className}`}
        style={error ? { borderColor: '#ef4444', backgroundColor: '#ffffff' } : { backgroundColor: '#ffffff' }}
        {...props}
      />
      {error && (
        <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="cms-muted" style={{ marginTop: '4px' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
