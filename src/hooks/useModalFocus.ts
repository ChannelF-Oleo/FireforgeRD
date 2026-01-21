import { useEffect, useRef, useCallback } from 'react';

interface UseModalFocusOptions {
  isOpen: boolean;
  onClose?: () => void;
  restoreFocus?: boolean;
}

/**
 * Hook para manejar focus trap en modales
 * Implementa las mejores prácticas de accesibilidad para modales
 */
export function useModalFocus({ 
  isOpen, 
  onClose, 
  restoreFocus = true 
}: UseModalFocusOptions) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Obtener elementos focusables
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(modalRef.current.querySelectorAll(focusableSelectors))
      .filter((element) => {
        const el = element as HTMLElement;
        return (
          el.offsetWidth > 0 &&
          el.offsetHeight > 0 &&
          !el.hasAttribute('hidden') &&
          window.getComputedStyle(el).visibility !== 'hidden'
        );
      }) as HTMLElement[];
  }, []);

  // Manejar tecla Tab para focus trap
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Tab hacia adelante desde el último elemento
      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // Shift+Tab hacia atrás desde el primer elemento
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }
    },
    [isOpen, getFocusableElements]
  );

  // Manejar tecla Escape
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape' && onClose) {
        event.preventDefault();
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Configurar focus cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      // Guardar elemento activo anterior
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Enfocar el primer elemento focusable
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        setTimeout(() => {
          focusableElements[0].focus();
        }, 10);
      }

      // Agregar event listeners
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    } else if (restoreFocus && previousActiveElement.current) {
      // Restaurar foco cuando el modal se cierra
      previousActiveElement.current.focus();
    }
  }, [isOpen, restoreFocus, handleKeyDown, handleEscapeKey, getFocusableElements]);

  return modalRef;
}