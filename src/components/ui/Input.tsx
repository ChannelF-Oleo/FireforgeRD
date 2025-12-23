'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

// EMBER GLASS: Inputs elegantes con cristal cálido
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[#1A1818] tracking-wide">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-5 py-4',
            'bg-[#F9F8F6] backdrop-blur-sm',
            'border border-[#1A1818]/10 rounded-2xl',
            'text-[#1A1818] placeholder-[#9C9890]',
            'transition-all duration-300',
            'focus:outline-none focus:border-[#FF4D00]/30 focus:bg-white',
            'focus:shadow-[0_4px_20px_rgba(255,77,0,0.08)]',
            'hover:border-[#1A1818]/20',
            error && 'border-red-400 focus:border-red-400',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
