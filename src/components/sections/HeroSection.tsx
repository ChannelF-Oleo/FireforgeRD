"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#F9F8F6] py-12 md:py-0">
        {/* Fondos optimizados con will-change para GPU */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[400px] md:h-[600px] bg-gradient-to-b from-[rgba(255,77,0,0.06)] via-[rgba(255,77,0,0.02)] to-transparent rounded-full blur-3xl pointer-events-none"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gradient-to-tl from-[rgba(255,77,0,0.04)] to-transparent rounded-full blur-3xl pointer-events-none"
          style={{ willChange: "transform" }}
        />

        <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl mx-auto"
          >
            {/* TÍTULO */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[4.5rem] font-light tracking-tight text-[#1A1818] mb-4 md:mb-6 leading-[1.1] md:leading-[0.95]">
              Desarrollo Web.
              <span className="block mt-2 mx-auto text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] md:leading-[1] max-w-5xl whitespace-normal sm:whitespace-nowrap bg-gradient-to-r from-[#FF4D00] via-[#FF6B2C] to-[#FF4D00] bg-clip-text text-transparent bg-[length:200%_auto] animate-[ember-flow_3s_ease-in-out_infinite]">
                Sistemas & Automatización.
              </span>
            </h1>

            {/* SUBTÍTULO */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-2xl text-[#5C5850] mb-8 md:mb-10 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light px-2"
            >
              Desarrollamos{" "}
              <span className="text-[#1A1818] font-medium">
                soluciones modernas, seguras y escalables
              </span>{" "}
              para posicionar tu negocio.
            </m.p>

            {/* BOTONES */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
            >
              <Button
                onClick={() => scrollToElement("servicios")}
                size="lg"
                className="w-full sm:w-auto text-base px-8 md:px-10 py-6 font-medium bg-[#FF4D00] hover:bg-[#E64500] text-white rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Nuestras Soluciones
              </Button>

              <Button
                onClick={() => scrollToElement("contact")}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 md:px-10 py-6 font-medium bg-transparent text-[#1A1818] rounded-full border border-[#1A1818]/20 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all"
              >
                Agendar Consultoría
              </Button>
            </m.div>

            {/* FOOTER */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-12 md:mt-16 text-center px-4"
            >
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#9C9890] leading-loose">
                Software a Medida · UI/UX · Automatización
              </p>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
