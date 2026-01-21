import { useEffect, useCallback, useState } from 'react';
import { useFocusTrap } from './useFocusTrap';

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  preventBodyScroll?: boolean;
  initialFocus?: boolean;
  restoreFocus?: boolean;
}

/**
 * Hook completo para manejar modales con focus trap, scroll lock y eventos
 */
export function useModal({
  isOpen,
  onClose,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  preventBodyScroll = true,
  initialFocus = true,
  restoreFocus = true,
}: UseModalOptions) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Focus trap
  const modalRef = useFocusTrap({
    isActive: isOpen,
    initialFocus,
    restoreFocus,
  });

  // Manejar tecla Escape
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && closeOnEscape && event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    },
    [isOpen, closeOnEscape, onClose]
  );

  // Manejar click en backdrop
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      // Guardar el scroll actual
      const scrollY = window.scrollY;
      
      // Aplicar estilos para prevenir scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restaurar estilos y posición de scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, preventBodyScroll]);

  // Event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, handleEscapeKey]);

  // Funciones de utilidad para animaciones
  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    modalRef,
    isAnimating,
    handleBackdropClick,
    handleAnimationStart,
    handleAnimationEnd,
  };
}

/**
 * Hook para manejar múltiples modales en stack
 */
export function useModalStack() {
  const [modalStack, setModalStack] = useState<string[]>([]);

  const openModal = useCallback((modalId: string) => {
    setModalStack(prev => [...prev, modalId]);
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setModalStack(prev => prev.filter(id => id !== modalId));
  }, []);

  const closeTopModal = useCallback(() => {
    setModalStack(prev => prev.slice(0, -1));
  }, []);

  const isModalOpen = useCallback((modalId: string) => {
    return modalStack.includes(modalId);
  }, [modalStack]);

  const isTopModal = useCallback((modalId: string) => {
    return modalStack[modalStack.length - 1] === modalId;
  }, [modalStack]);

  return {
    modalStack,
    openModal,
    closeModal,
    closeTopModal,
    isModalOpen,
    isTopModal,
  };
}