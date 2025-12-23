"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Globe, Cpu, Bot, ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import type { Variants } from "framer-motion";

/* ------------------ TYPES & DATA ------------------ */
type ServiceCategory = {
  id: number;
  pricingTabId: string;
  name: string;
  tag: string;
  description: string;
  icon: any;
};

const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    pricingTabId: "web",
    name: "Arquitectura Web",
    tag: "Frontend / Backend",
    description:
      "Activos digitales de alto rendimiento. Velocidad crítica y SEO técnico avanzado para dominar tu nicho.",
    icon: Globe,
  },
  {
    id: 2,
    pricingTabId: "saas",
    name: "Software a Medida",
    tag: "SaaS / Dashboards",
    description:
      "Ecosistemas internos y herramientas de gestión diseñadas para escalar operaciones complejas sin fricción.",
    icon: Cpu,
  },
  {
    id: 3,
    pricingTabId: "automation",
    name: "Automatización",
    tag: "AI / Workflows",
    description:
      "Sistemas autónomos que reducen costos operativos y eliminan el error humano, trabajando 24/7 por ti.",
    icon: Bot,
  },
];

/* ------------------ ANIMATIONS ------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* ------------------ COMPONENT ------------------ */
export function ServicesGrid() {
  const handleNavigation = (tabId: string) => {
    scrollToElement("precios");
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("changePricingTab", { detail: tabId }),
      );
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="servicios"
        // AJUSTE 1: Padding vertical reducido en móvil (py-16) para no dejar tanto espacio vacío
        className="relative overflow-hidden bg-[#F9F8F6] py-16 md:py-32"
      >
        {/* --- FONDO AMBIENTAL RESPONSIVO --- */}
        {/* AJUSTE 2: Usamos vw/vh para que los blobs escalen con el dispositivo */}
        <div className="pointer-events-none absolute top-0 right-0 h-[40vh] w-[40vh] md:h-[800px] md:w-[800px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(255,77,0,0.08)] via-transparent to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[30vh] w-[30vh] md:h-[600px] md:w-[600px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(255,77,0,0.05)] via-transparent to-transparent blur-3xl" />

        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* --- HEADER --- */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="font-display mb-6 md:mb-8 text-4xl font-light tracking-tight text-[#1A1818] md:text-6xl lg:text-7xl">
              Infraestructura Digital
              <br className="hidden md:block" />
              {/* Ajuste: whitespace-normal en móvil para evitar scroll horizontal si la frase es larga */}
              <span className="block mt-2 md:mt-0 md:inline whitespace-normal md:whitespace-nowrap bg-gradient-to-r from-[#FF4D00] via-[#FF6B2C] to-[#FF4D00] bg-clip-text text-transparent animate-[ember-flow_3s_ease-in-out_infinite]">
                Eficiente & Segura
              </span>
            </h2>

            {/* Ajuste: text-balance mejora mucho la lectura en párrafos cortos centrados */}
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-[#6F6B65] md:text-xl text-balance px-4">
              Diseñamos soluciones web para{" "}
              <span className="font-medium text-[#1A1818]">escalar</span>,
              automatizar y{" "}
              <span className="font-medium text-[#FF4D00]">
                proteger tu ventaja competitiva
              </span>
              .
            </p>
          </m.div>

          {/* --- GLASS CARDS GRID --- */}
          {/* AJUSTE 3: md:grid-cols-2 para tablets, lg:grid-cols-3 para desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceCategories.map((service, i) => (
              <m.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                // AJUSTE 4: h-full asegura que todas las cards en una fila tengan la misma altura
                className="h-full"
              >
                <div className="group relative flex flex-col justify-between h-full min-h-[320px] md:min-h-[380px] p-6 md:p-8 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-sm transition-all duration-500 hover:bg-white/80 hover:shadow-[0_20px_40px_-10px_rgba(255,77,0,0.1)] overflow-hidden">
                  
                  {/* GRADIENTE INTERNO AL HOVER */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* CONTENIDO SUPERIOR */}
                  <div className="relative z-10 flex-grow">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                      <span className="inline-block px-3 py-1 rounded-full border border-[#1A1818]/5 bg-[#1A1818]/5 text-[10px] uppercase tracking-widest text-[#6F6B65] font-bold">
                        {service.tag}
                      </span>

                      <service.icon
                        className="w-6 h-6 text-[#1A1818]/30 group-hover:text-[#FF4D00] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light text-[#1A1818] mb-4 tracking-tight">
                      {service.name}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#6F6B65] text-balance">
                      {service.description}
                    </p>
                  </div>

                  {/* CONTENIDO INFERIOR / CTA */}
                  <div className="relative z-10 mt-8 pt-8 border-t border-[#1A1818]/5">
                    <button
                      onClick={() => handleNavigation(service.pricingTabId)}
                      className="group/btn w-full flex items-center justify-between text-sm text-[#1A1818] transition-all hover:text-[#FF4D00]"
                    >
                      <span className="font-medium tracking-wide">
                        Explorar Solución
                      </span>
                      {/* Círculo del icono */}
                      <div className="w-8 h-8 rounded-full border border-[#1A1818]/10 flex items-center justify-center bg-white transition-all group-hover/btn:bg-[#FF4D00] group-hover/btn:border-[#FF4D00] group-hover/btn:text-white group-hover/btn:translate-x-1">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  </div>

                  {/* Borde brillante superior */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50" />
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

