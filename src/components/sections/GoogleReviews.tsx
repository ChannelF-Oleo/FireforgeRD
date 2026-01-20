"use client";

import { useEffect } from "react";
import { Star } from "lucide-react";

export function GoogleReviews() {
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Cargar el script de Elfsight solo una vez
    if (
      !document.querySelector(
        'script[src="https://static.elfsight.com/platform/platform.js"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#1A1818]/5 mb-6 text-[#FF4D00]">
            <Star className="w-5 h-5 fill-current" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1818] mb-4">
            Confianza{" "}
            <span className="text-[#FF4D00] font-medium">Forjada</span>
          </h2>

          <p className="text-[#5C5850] text-lg max-w-xl mx-auto">
            Lo que dicen quienes han construido su futuro digital con nosotros.
          </p>
        </div>

        {/* Widget de Elfsight Google Reviews */}
        <div className="max-w-5xl mx-auto">
          <div
            className="elfsight-app-df23be39-2807-4e2f-8500-472a12fef93c"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
