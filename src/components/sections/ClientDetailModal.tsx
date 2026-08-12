"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Briefcase, X } from "lucide-react";
import type { Client } from "@/types";

interface ClientDetailModalProps {
  /** Cliente a mostrar, o null para mantener el modal cerrado. */
  client: Client | null;
  onClose: () => void;
}

/**
 * Modal de detalle de un cliente, con el CTA "Quiero algo similar".
 * Compartido por el grid de /clientes y el carrusel de destacados del home.
 */
export function ClientDetailModal({ client, onClose }: ClientDetailModalProps) {
  // Cerrar modal con Escape
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof document === "undefined") return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {client && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen Header */}
            <div className="relative aspect-video bg-[#F9F8F6]">
              {client.image ? (
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Briefcase
                    className="w-16 h-16 text-[#9C9890]"
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 text-[#1A1818]" aria-hidden="true" />
              </button>

              {client.featured && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF4D00] text-white text-xs font-bold rounded-full">
                  Proyecto Destacado
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
                {client.category}
              </span>

              <h2
                id="modal-title"
                className="font-display text-2xl sm:text-3xl font-medium text-[#1A1818] mt-2 mb-4"
              >
                {client.name}
              </h2>

              {client.tag && (
                <div className="inline-block px-3 py-1 bg-[#F9F8F6] rounded-full text-sm text-[#5C5850] mb-4">
                  {client.tag}
                </div>
              )}

              <p className="text-[#3D3A36] leading-relaxed mb-6">
                {client.description || "Sin descripción disponible."}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {client.websiteUrl && (
                  <Link
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1818] text-white rounded-xl font-medium hover:bg-[#FF4D00] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar Sitio Web
                  </Link>
                )}
                <Link
                  href="/contacto"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#F9F8F6] text-[#1A1818] rounded-xl font-medium hover:bg-[#1A1818]/5 transition-colors"
                >
                  Quiero algo similar
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
