import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // 'sm', 'md', 'lg', 'xl', 'full'
  className = '',
  ...props
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full h-full rounded-none',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#3A3838]/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full bg-[#454242] rounded-2xl shadow-2xl border border-[#585454] flex flex-col max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 animate-slide-up ${sizes[size]} ${className}`}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#585454]">
            {title && (
              <h3 className="text-[16px] md:text-[18px] font-bold font-heading text-[#FFFFFF]">
                {title}
              </h3>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#514E4E] text-[#D1D5DB] hover:text-[#FFFFFF] transition-colors focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-[#F0F0F0]">
          {children}
        </div>
      </div>
    </div>
  );
}
