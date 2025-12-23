'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

// EMBER GLASS: Select elegante con cristal cálido
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, placeholder, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[#1A1818] tracking-wide">
            {label}
          </label>
        )}
        <select
          className={cn(
            'w-full px-5 py-4',
            'bg-[#F9F8F6] backdrop-blur-sm',
            'border border-[#1A1818]/10 rounded-2xl',
            'text-[#1A1818]',
            'transition-all duration-300 cursor-pointer',
            'focus:outline-none focus:border-[#FF4D00]/30 focus:bg-white',
            'focus:shadow-[0_4px_20px_rgba(255,77,0,0.08)]',
            'hover:border-[#1A1818]/20',
            'appearance-none',
            'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236F6B65\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")] bg-[length:1.5rem] bg-[right_1rem_center] bg-no-repeat',
            error && 'border-red-400 focus:border-red-400',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-[#9C9890]">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
