import React from 'react';

/**
 * Utility functions for debugging hydration issues
 */

export function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Safe way to access window properties
 */
export function safeWindow<T>(callback: (window: Window) => T, fallback?: T): T | undefined {
  if (isClient()) {
    return callback(window);
  }
  return fallback;
}

/**
 * Debug hydration mismatches in development
 */
export function debugHydration(componentName: string, serverValue: any, clientValue: any) {
  if (process.env.NODE_ENV === 'development' && isClient()) {
    if (serverValue !== clientValue) {
      console.warn(`[Hydration Mismatch] ${componentName}:`, {
        server: serverValue,
        client: clientValue,
      });
    }
  }
}

/**
 * Suppress hydration warnings for known safe mismatches
 * Use this sparingly and only when you're certain the mismatch is safe
 */
export function suppressHydrationWarning<T extends React.ReactElement>(element: T): T {
  return React.cloneElement(element, { 
    suppressHydrationWarning: true 
  } as React.HTMLAttributes<any>) as T;
}