"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, ChevronRight } from "lucide-react";
import { ClientDetailModal } from "./ClientDetailModal";
import type { Client } from "@/types";

interface ClientsGridUIProps {
  initialClients: Client[];
}

export function ClientsGridUI({ initialClients }: ClientsGridUIProps) {
  const [filter, setFilter] = useState<string>("todos");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const closeModal = useCallback(() => setSelectedClient(null), []);

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
      <ClientDetailModal client={selectedClient} onClose={closeModal} />
    </>
  );
}
