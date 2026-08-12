"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ClientDetailModal } from "./ClientDetailModal";
import type { Client } from "@/types";

interface FeaturedClientsCarouselUIProps {
  /** Clientes ya filtrados por `featured` en el componente padre. */
  clients: Client[];
}

/**
 * Carrusel coverflow 3D de clientes destacados.
 *
 * Adaptado de CardCoverFlow (@subhanhq/amicro, MIT) — reescalado de thumbnail
 * de galería a sección full-width, paleta del proyecto y accesibilidad.
 *
 * Interacción: la card activa abre el modal de detalle; las laterales solo
 * centran el carrusel.
 */
export function FeaturedClientsCarouselUI({
  clients,
}: FeaturedClientsCarouselUIProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const closeModal = useCallback(() => setSelectedClient(null), []);

  // Con un solo destacado no hay navegación: ni flechas, ni dots, ni teclado.
  const isNavigable = clients.length > 1;

  const toPrev = useCallback(
    () => setActiveIndex((prev) => Math.max(0, prev - 1)),
    [],
  );

  const toNext = useCallback(
    () => setActiveIndex((prev) => Math.min(clients.length - 1, prev + 1)),
    [clients.length],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isNavigable) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      toPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      toNext();
    }
  };

  // Click en la activa abre el detalle; en las laterales, solo centra.
  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedClient(clients[index]);
    } else {
      setActiveIndex(index);
    }
  };

  if (clients.length === 0) return null;

  const activeClient = clients[activeIndex] ?? clients[0];

  return (
    <>
      <div
        role="group"
        aria-roledescription="carrusel"
        aria-label="Clientes destacados"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D00]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
        style={{ perspective: "1400px" }}
      >
        {/* Pista del coverflow.
            pointer-events-none es necesario, no cosmético: las cards laterales
            se trasladan en Z negativo, o sea quedan detrás del plano de este
            contenedor, y sin esto el track gana el hit-test y se come sus
            clicks. Cada card vuelve a activarlos con pointerEvents: "auto". */}
        <div className="pointer-events-none relative flex h-[220px] w-full items-center justify-center sm:h-[290px] lg:h-[360px] [transform-style:preserve-3d]">
          {clients.map((client, i) => {
            const isActive = activeIndex === i;
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const isPast = i < activeIndex;

            return (
              <motion.button
                key={client.id}
                type="button"
                // Solo la card activa entra en el orden de tabulación.
                tabIndex={isActive ? 0 : -1}
                aria-hidden={absOffset > 2}
                aria-label={
                  isActive
                    ? `Ver detalles de ${client.name}`
                    : `Centrar ${client.name}`
                }
                className="absolute w-[220px] cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D00] focus-visible:ring-offset-2 sm:w-[300px] lg:w-[380px]"
                initial={false}
                animate={{
                  // Porcentaje del ancho de la propia card: mantiene la
                  // separación proporcional en los tres breakpoints.
                  // 62% deja el centro de cada lateral fuera de la activa
                  // (que escala 1.08 y va por encima), para que siga siendo
                  // clickeable y no solo por una franja al borde.
                  x: `${offset * 62}%`,
                  rotateY: isActive ? 0 : isPast ? 38 : -38,
                  z: isActive ? 60 : -absOffset * 70,
                  scale: isActive ? 1.08 : 1 - absOffset * 0.08,
                  opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{
                  zIndex: 100 - absOffset,
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
                onClick={() => handleCardClick(i)}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#1A1818]/10 bg-[#F9F8F6] shadow-2xl shadow-[#1A1818]/10">
                  {client.image ? (
                    <SafeImage
                      src={client.image}
                      // El nombre no depende del estado visual de la card.
                      alt={client.name}
                      fill
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 380px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Briefcase
                        className="h-10 w-10 text-[#9C9890]"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {!isActive && (
                    <div
                      className="absolute inset-0 bg-[#1A1818]/20"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Nombre + tag del cliente activo */}
        <div className="mt-6 text-center">
          <motion.div
            key={activeClient.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            <h3 className="font-display text-xl font-medium text-[#1A1818] md:text-2xl">
              {activeClient.name}
            </h3>
            {activeClient.tag && (
              <p className="mt-1 text-sm text-[#5C5850]">
                {activeClient.tag}
              </p>
            )}
          </motion.div>
        </div>

        {/* Controles */}
        {isNavigable && (
          <div className="mt-6 flex justify-center">
            <div className="flex w-fit items-center justify-center gap-3 rounded-full border border-[#1A1818]/10 bg-white px-3 py-2 shadow-sm">
              <button
                type="button"
                onClick={toPrev}
                disabled={activeIndex === 0}
                aria-label="Cliente anterior"
                className="rounded-full p-1 text-[#5C5850] transition-colors hover:bg-[#1A1818]/5 hover:text-[#1A1818] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center justify-center gap-1.5">
                {clients.map((client, i) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Ver ${client.name}`}
                    aria-current={activeIndex === i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-5 bg-[#FF4D00]"
                        : "w-1.5 bg-[#1A1818]/20 hover:bg-[#1A1818]/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={toNext}
                disabled={activeIndex === clients.length - 1}
                aria-label="Cliente siguiente"
                className="rounded-full p-1 text-[#5C5850] transition-colors hover:bg-[#1A1818]/5 hover:text-[#1A1818] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ClientDetailModal client={selectedClient} onClose={closeModal} />
    </>
  );
}
