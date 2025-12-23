import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency for Dominican Pesos
export function formatCurrency(amount: number): string {
  return `RD$ ${amount.toLocaleString('es-DO')}`;
}

// Format Dominican Republic timezone
export function formatDominicanTime(date: Date = new Date()): string {
  return date.toLocaleString("es-DO", { 
    timeZone: "America/Santo_Domingo",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Smooth scroll to element
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Generate WhatsApp URL with pre-filled message
export function generateWhatsAppURL(phoneNumber: string, message?: string): string {
  const baseURL = 'https://wa.me/';
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  
  return `${baseURL}${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Dominican phone number
export function isValidDominicanPhone(phone: string): boolean {
  const phoneRegex = /^(\+1)?[- ]?(\()?809|829|849(\))?[- ]?\d{3}[- ]?\d{4}$/;
  return phoneRegex.test(phone);
}

// Generate correlation ID for error tracking
export function generateCorrelationId(): string {
  return `ff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}