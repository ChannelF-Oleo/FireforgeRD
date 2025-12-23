'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'muted';
}

// EMBER GLASS: Spinner elegante
export function LoadingSpinner({ 
  className, 
  size = 'md', 
  variant = 'primary',
  ...props 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variants = {
    primary: 'border-[#FF4D00] border-t-transparent',
    muted: 'border-[#1A1818]/20 border-t-transparent'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// EMBER GLASS: Pantalla de carga luminosa
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#F9F8F6]/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-[#6F6B65] text-sm font-medium">Cargando...</p>
      </div>
    </div>
  );
}
