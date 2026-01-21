"use client";

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  preventBodyScroll?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

/**
 * Componente Modal accesible con focus trap automático
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnEscape = true,
  closeOnBackdropClick = true,
  preventBodyScroll = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
}: ModalProps) {
  const {
    modalRef,
    handleBackdropClick,
  } = useModal({
    isOpen,
    onClose,
    closeOnEscape,
    closeOnBackdropClick,
    preventBodyScroll,
  });

  const [isMounted, setIsMounted] = useState(false);

  // Solo renderizar en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
              relative w-full ${sizeClasses[size]} max-h-[90vh] 
              bg-white rounded-2xl shadow-2xl overflow-hidden
              ${className}
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1A1818]/5">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg sm:text-xl font-display font-medium text-[#1A1818]"
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-[#F9F8F6] rounded-lg transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5 text-[#5C5850]" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

/**
 * Componente ModalContent para estructurar el contenido del modal
 */
interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export function ModalContent({ children, className = '' }: ModalContentProps) {
  return (
    <div className={`p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Componente ModalFooter para acciones del modal
 */
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={`
      flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 
      p-4 sm:p-6 border-t border-[#1A1818]/5 bg-[#F9F8F6]/30
      ${className}
    `}>
      {children}
    </div>
  );
}