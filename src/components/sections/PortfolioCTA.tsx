"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export function PortfolioCTA() {
  return (
    <section className="py-20 bg-[#F9F8F6] border-y border-[#1A1818]/5 relative overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icono flotante */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#1A1818]/5 shadow-sm mb-6 text-[#FF4D00]">
            <Briefcase className="w-5 h-5" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-light text-[#1A1818] mb-6">
            ¿Quieres ver nuestros <span className="font-medium">trabajos anteriores</span>?
          </h2>
          
          <p className="text-[#6F6B65] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            La mejor forma de entender lo que podemos hacer por tu empresa es viendo lo que ya hemos logrado para otros.
          </p>

          <div className="flex justify-center">
            <Link 
              href="https://portafolio-cfd.vercel.app" // <--- PON TU ENLACE AQUÍ
              target="_blank"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1818] rounded-full border border-[#1A1818]/10 hover:border-[#FF4D00]/30 hover:shadow-lg hover:shadow-[#FF4D00]/5 transition-all duration-300"
            >
              <span className="font-medium tracking-wide">¡Visita el portafolio!</span>
              <div className="w-8 h-8 rounded-full bg-[#F9F8F6] flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:text-white transition-colors duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}