"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Briefcase, X, ChevronRight } from "lucide-react";
import type { Client } from "@/types";

interface ClientsGridUIProps {
  initialClients: Client[];
}

export function ClientsGridUI({ initialClients }: ClientsGridUIProps) {
  const [filter, setFilter] = useState<string>("todos");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Cerrar modal con Escape
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof document === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedClient(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const categories = [
    "todos",
    ...new Set(initialClients.map((c) => c.category)),
  ];
  const filteredClients =
    filter === "todos"
      ? initialClients
      : initialClients.filter((c) => c.category === filter);

  return (
    <>
      {/* Filtros */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-[#1A1818] text-white"
                  : "bg-[#F9F8F6] text-[#5C5850] hover:bg-[#1A1818]/5"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#5C5850]">No hay clientes para mostrar aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedClient(client)}
            >
              <div className="bg-white rounded-2xl border border-[#1A1818]/5 overflow-hidden hover:shadow-xl hover:shadow-[#FF4D00]/5 transition-all duration-300 hover:border-[#FF4D00]/20">
                {/* Imagen */}
                <div className="relative aspect-video overflow-hidden bg-[#F9F8F6]">
                  {client.image ? (
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-[#9C9890]" />
                    </div>
                  )}

                  {client.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#FF4D00] text-white text-xs font-bold rounded-full">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
                    {client.category}
                  </span>

                  <h3 className="font-display text-xl font-medium text-[#1A1818] mt-2 mb-2">
                    {client.name}
                  </h3>

                  <p className="text-[#5C5850] text-sm mb-4 line-clamp-2">
                    {client.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1A1818] group-hover:text-[#FF4D00] transition-colors">
                      Ver detalles
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
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
                {selectedClient.image ? (
                  <Image
                    src={selectedClient.image}
                    alt={selectedClient.name}
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
                  onClick={() => setSelectedClient(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5 text-[#1A1818]" aria-hidden="true" />
                </button>

                {selectedClient.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF4D00] text-white text-xs font-bold rounded-full">
                    Proyecto Destacado
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
                  {selectedClient.category}
                </span>

                <h2
                  id="modal-title"
                  className="font-display text-2xl sm:text-3xl font-medium text-[#1A1818] mt-2 mb-4"
                >
                  {selectedClient.name}
                </h2>

                {selectedClient.tag && (
                  <div className="inline-block px-3 py-1 bg-[#F9F8F6] rounded-full text-sm text-[#5C5850] mb-4">
                    {selectedClient.tag}
                  </div>
                )}

                <p className="text-[#3D3A36] leading-relaxed mb-6">
                  {selectedClient.description || "Sin descripción disponible."}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {selectedClient.websiteUrl && (
                    <Link
                      href={selectedClient.websiteUrl}
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
    </>
  );
}
