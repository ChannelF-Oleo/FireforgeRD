"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  // createPortal necesita document, que no existe durante el render del
  // servidor: se monta recién en el cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const contenido = (
    <AnimatePresence>
      {client && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // z-[60] para quedar por encima del header (z-50). Sin el portal
          // de abajo este número no alcanzaría: el modal se renderiza dentro
          // de <main class="relative z-10">, que abre su propio contexto de
          // apilamiento, así que a nivel documento competiría main (10)
          // contra header (50) y el botón de cerrar quedaría tapado.
          className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
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
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen Header.
                shrink-0 para que el flex no la aplaste cuando el texto es
                largo; el scroll va en el bloque de contenido, así el botón
                de cerrar queda siempre visible. */}
            <div className="relative aspect-video shrink-0 bg-[#F9F8F6]">
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

            {/* Content.
                min-h-0 es lo que permite que este hijo flex se encoja por
                debajo de su altura natural; sin eso overflow-y-auto no
                llega a activarse nunca. */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
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

  if (!mounted) return null;

  return createPortal(contenido, document.body);
}
