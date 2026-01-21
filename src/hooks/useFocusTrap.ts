import { useEffect, useRef, useCallback } from 'react';

interface UseFocusTrapOptions {
  isActive: boolean;
  initialFocus?: boolean;
  restoreFocus?: boolean;
}

/**
 * Hook para implementar focus trap en modales y componentes overlay
 * Mantiene el foco dentro del elemento contenedor cuando está activo
 */
export function useFocusTrap({
  isActive,
  initialFocus = true,
  restoreFocus = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Elementos focusables
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors))
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

  // Manejar tecla Tab
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || !containerRef.current || event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(containerRef.current);
      
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      // Si no hay elemento activo dentro del contenedor, enfocar el primero
      if (!containerRef.current.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // Tab hacia adelante desde el último elemento -> ir al primero
      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      // Shift+Tab hacia atrás desde el primer elemento -> ir al último
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }
    },
    [isActive, getFocusableElements]
  );

  // Manejar tecla Escape
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (isActive && event.key === 'Escape') {
        // Permitir que el componente padre maneje el escape
        // Este hook solo maneja el focus trap
      }
    },
    [isActive]
  );

  // Configurar focus trap cuando se activa
  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    // Guardar el elemento activo anterior
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Enfocar el primer elemento focusable si se solicita
    if (initialFocus) {
      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length > 0) {
        // Pequeño delay para asegurar que el modal esté completamente renderizado
        setTimeout(() => {
          focusableElements[0].focus();
        }, 10);
      }
    }

    // Agregar event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleEscapeKey);

      // Restaurar foco al elemento anterior si se solicita
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, initialFocus, restoreFocus, handleKeyDown, handleEscapeKey, getFocusableElements]);

  return containerRef;
}

/**
 * Hook simplificado para casos básicos de focus trap
 */
export function useSimpleFocusTrap(isActive: boolean) {
  return useFocusTrap({
    isActive,
    initialFocus: true,
    restoreFocus: true,
  });
}