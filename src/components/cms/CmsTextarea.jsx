import React from 'react';

export default function CmsTextarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  error,
  helperText,
  monospace = false,
  className = '',
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="cms-label">
          {label}
          {required && <span style={{ color: '#b91c1c', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`cms-textarea ${monospace ? 'cms-textarea-code' : ''} ${className}`}
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
