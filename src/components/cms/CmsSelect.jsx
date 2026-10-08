import React from 'react';

export default function CmsSelect({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  helperText,
  className = '',
  children,
  ...props
}) {
  const selectId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="cms-label">
          {label}
          {required && <span style={{ color: '#b91c1c', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`cms-select ${className}`}
        style={error ? { borderColor: '#ef4444', backgroundColor: '#ffffff' } : { backgroundColor: '#ffffff' }}
        {...props}
      >
        {children || options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val} style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
              {lbl}
            </option>
          );
        })}
      </select>
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
