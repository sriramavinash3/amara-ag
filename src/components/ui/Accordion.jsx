import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  className = '',
  titleClassName = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border-b border-[#585454] last:border-0 overflow-hidden ${className}`}
      {...props}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left font-medium text-[#FFFFFF] hover:text-emerald-300 transition-colors focus:outline-none cursor-pointer group"
      >
        <span className={`text-base md:text-lg font-semibold pr-4 group-hover:translate-x-0.5 transition-transform ${titleClassName}`}>
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-[#D1D5DB] group-hover:text-emerald-300 transition-all duration-300 transform shrink-0 ${
            isOpen ? 'rotate-180 text-emerald-400' : ''
          }`}
        />
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-[#F0F0F0] leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
