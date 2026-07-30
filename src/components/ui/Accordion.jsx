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
      className={`border-b border-slate-100 last:border-0 overflow-hidden ${className}`}
      {...props}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left font-medium text-primary-900 hover:text-medical-600 transition-colors focus:outline-none cursor-pointer group"
      >
        <span className={`text-base md:text-lg font-semibold pr-4 group-hover:translate-x-0.5 transition-transform ${titleClassName}`}>
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 group-hover:text-medical-600 transition-all duration-300 transform shrink-0 ${
            isOpen ? 'rotate-180 text-medical-600' : ''
          }`}
        />
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-primary-700 leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}
