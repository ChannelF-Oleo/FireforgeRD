'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
    
    // TODO: Send to error tracking service (Sentry)
    if (typeof window !== 'undefined') {
      // Client-side error logging
      const errorData = {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
      
      // Send to analytics or error service
      console.error('Error details:', errorData);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-200 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl font-medium text-[#1A1818] mb-4">
            Algo salió mal
          </h1>
          
          <p className="text-[#5C5850] mb-2">
            Ocurrió un error inesperado. Nuestro equipo ha sido notificado.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <summary className="cursor-pointer text-sm font-medium text-red-800 mb-2">
                Detalles del error (desarrollo)
              </summary>
              <pre className="text-xs text-red-700 overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-[#FF4D00] hover:bg-[#E64500] text-white"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Button>
          
          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full border-[#1A1818]/20 text-[#1A1818] hover:bg-[#1A1818]/5"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1A1818]/10">
          <p className="text-sm text-[#9C9890] mb-2">
            ¿Necesitas ayuda inmediata?
          </p>
          <a
            href="https://wa.me/18498534067?text=Hola,%20tuve%20un%20error%20en%20la%20página%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#FF4D00] hover:text-[#E64500] font-medium"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}