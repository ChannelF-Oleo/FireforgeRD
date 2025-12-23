"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowRight,
  Globe,
  ShoppingCart,
  Cpu,
  Bot,
  HelpCircle,
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { serviceCategories } from "@/lib/services-data";

// --- ICONOS ---
const categoryIcons: Record<string, React.ReactNode> = {
  web: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
  ecommerce: <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />,
  saas: <Cpu className="w-4 h-4 md:w-5 md:h-5" />,
  automation: <Bot className="w-4 h-4 md:w-5 md:h-5" />,
};

const formatDOP = (amount: number) => {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("DOP", "RD$");
};

export function PricingMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>(
    serviceCategories[0].id,
  );
  const activeData = serviceCategories.find((cat) => cat.id === activeCategory);

  // --- LÓGICA DE EVENTOS (Correcta y limpia) ---
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      const tabId = event.detail;
      if (serviceCategories.some((cat) => cat.id === tabId)) {
        setActiveCategory(tabId);
      }
    };

    window.addEventListener("changePricingTab", handleTabChange as EventListener);

    return () => {
      window.removeEventListener(
        "changePricingTab",
        handleTabChange as EventListener
      );
    };
  }, []);

  // --- LOGICA SPOTLIGHT OPTIMIZADA (CSS VARIABLES) ---
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const div = containerRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Actualizamos variables CSS directamente en el DOM
    // Esto NO provoca un re-render de React
    div.style.setProperty("--mouse-x", `${x}px`);
    div.style.setProperty("--mouse-y", `${y}px`);
    div.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--spotlight-opacity", "0");
    }
  };

  return (
    <section
      id="precios"
      className="relative overflow-hidden bg-[#F9F8F6] py-24 md:py-32"
    >
      {/* Fondos */}
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(255,77,0,0.08)] via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[rgba(255,77,0,0.05)] via-transparent to-transparent blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="font-display mb-4 text-4xl font-light tracking-tight text-[#1A1818] md:text-6xl">
            Inversión
            <span className="bg-gradient-to-r from-[#FF4D00] via-[#FF6B2C] to-[#FF4D00] bg-clip-text text-transparent">
              {" "}
              Inteligente
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-[#6F6B65] font-light">
            Selecciona tu industria para ver la tabla oficial.
          </p>
        </div>

        {/* --- TABS --- */}
        <div 
            className="mb-16 md:mb-24 flex flex-wrap justify-center gap-2 md:gap-4"
            role="tablist" // Accesibilidad añadida
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-white shadow-[0_10px_30px_-10px_rgba(255,77,0,0.5)]"
                  : "bg-white text-[#6F6B65] hover:bg-gray-50"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-[#1A1818]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {categoryIcons[cat.id]}
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* --- TABLA GLASS CON SPOTLIGHT OPTIMIZADO --- */}
        <div className="relative mx-auto max-w-[1400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              
              className="relative rounded-3xl border border-white/50 bg-white/40 backdrop-blur-2xl shadow-sm pt-8 md:pt-0 group/spotlight overflow-hidden"
            >
              {/* SPOTLIGHT GRADIENT OVERLAY (CSS VARS)
                  Usamos opacity-0 por defecto y transition-opacity para suavizar la entrada/salida
              */}
              <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30 rounded-3xl opacity-0"
                style={{
                    opacity: "var(--spotlight-opacity, 0)",
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,77,0,0.06), transparent 40%)`
                }}
              />

              <div
                className={`relative z-10 grid grid-cols-1 divide-y divide-[#1A1818]/5 md:divide-y-0 md:divide-x ${
                  activeData && activeData.services.length === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {activeData?.services.map((plan) => (
                  <div
                    key={plan.id}
                    className={`group relative flex flex-col p-6 lg:p-5 xl:p-8 transition-all duration-500 ${
                      plan.isRecommended
                        ? "bg-white/80 z-20 shadow-xl border-y md:border-y-0 md:border-x border-[#FF4D00]/10 lg:scale-[1.05] lg:-my-4 lg:py-12 lg:rounded-2xl lg:shadow-[0_20px_50px_-12px_rgba(255,77,0,0.2)]"
                        : "hover:bg-white/60"
                    }`}
                  >
                    {/* El resto del contenido de la Card se mantiene igual... */}
                    {/* ... Badge, Header, Price, Features, Button ... */}
                    
                    {/* (He resumido esta parte para no repetir todo el código anterior, 
                         ya que la lógica interna de la card estaba perfecta) */}
                    
                    {plan.isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A1818] text-white pl-3 pr-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.5)] whitespace-nowrap z-50 ring-4 ring-[#F9F8F6]">
                        <span className="text-sm animate-[pulse_1.5s_ease-in-out_infinite]">
                          🔥
                        </span>
                        On Fire
                      </div>
                    )}

                    <div className="mb-6 relative z-10">
                      <h3 className={`text-lg lg:text-xl font-display font-medium mb-2 truncate ${plan.isRecommended ? "text-[#FF4D00]" : "text-[#1A1818]"}`}>
                        {plan.name}
                      </h3>
                      {/* ... resto del contenido ... */}
                      <div className="inline-block px-2 py-1 bg-[#1A1818]/5 rounded-md mb-4">
                        <p className="text-[10px] text-[#6F6B65] uppercase tracking-wider font-medium">
                          {plan.idealFor}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl lg:text-3xl xl:text-4xl font-light tracking-tight text-[#1A1818]">
                            {formatDOP(plan.price)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Features loop ... */}
                    <div className="flex-1 space-y-3 mb-8 relative z-10">
                        {plan.features.map((f, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm text-[#6F6B65]">
                                <Check size={14} className="mt-0.5 text-[#FF4D00]" />
                                <span className="text-[13px]">{f}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-5 border-t border-[#1A1818]/5 relative z-10">
                        <Button 
                            onClick={() => scrollToElement("contact")}
                            className={`w-full ${plan.isRecommended ? "bg-gradient-to-r from-[#FF4D00] to-[#FF6B2C] text-white" : "bg-[#F0EFED] text-[#1A1818]"}`}
                        >
                            Solicitar Ahora <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 text-center">
          <button
            onClick={() => scrollToElement("faq")}
            className="group flex items-center gap-2 rounded-full border border-[#1A1818]/10 bg-white px-5 py-2.5 text-sm font-medium text-[#6F6B65] transition-all hover:border-[#FF4D00]/30 hover:bg-[#fff5f0] hover:text-[#FF4D00] hover:shadow-md"
          >
            <HelpCircle className="w-4 h-4" />
            <span>
              ¿Tienes dudas sobre pagos o entregas?{" "}
              <span className="underline decoration-dotted underline-offset-4">
                Lee nuestras Preguntas Frecuentes
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

