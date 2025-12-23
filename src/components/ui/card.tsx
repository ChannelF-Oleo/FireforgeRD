'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glow' | 'elevated';
  hover?: boolean;
}

// EMBER GLASS: Cards con cristal cálido y bordes suaves
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const baseStyles = `
      rounded-3xl transition-all duration-400 ease-out
      transform-gpu will-change-transform
    `;
    
    const variants = {
      // Card básica - Superficie blanca sutil
      default: `
        bg-white/70 backdrop-blur-sm
        border border-text-main/5
        shadow-[0_4px_24px_rgba(26,24,24,0.06)]
      `,
      
      // Card glassmorphism - Cristal cálido esmerilado
      glass: `
        bg-white/60 backdrop-blur-glass
        border border-text-main/5
        shadow-[0_4px_24px_rgba(26,24,24,0.06)]
      `,
      
      // Card con glow - Resplandor de fuego sutil
      glow: `
        bg-white/80 backdrop-blur-sm
        border border-primary/10
        shadow-[0_4px_24px_rgba(255,77,0,0.08)]
      `,
      
      // Card elevada - Mayor prominencia
      elevated: `
        bg-white
        border border-text-main/5
        shadow-[0_8px_40px_rgba(26,24,24,0.1)]
      `
    };

    const hoverStyles = hover ? `
      hover:bg-white/90
      hover:border-primary/15
      hover:shadow-[0_12px_48px_rgba(255,77,0,0.1)]
      hover:-translate-y-1
      cursor-pointer
      active:scale-[0.99]
    ` : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-8 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-8 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-8 pt-4 flex items-center justify-between', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
