"use client";

import Link from "next/link";
import { FireLogo } from "@/components/ui/animated-logo";
import { Instagram, Github, MessageCircle, MapPin, Mail } from "lucide-react";

// Componente del mapa con efecto grayscale
function LocationMap() {
  // URL del embed de Google Maps para FireforgeRD
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6637935566773!2d-69.92977352480885!3d18.498882082590516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf893f7b632bf9%3A0x36bc55434309055c!2sFireforgeRD!5e0!3m2!1ses-419!2sdo!4v1768481974792!5m2!1ses-419!2sdo";

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 group">
      <a
        href="https://www.google.com/maps/place/FireforgeRD/@18.498882,-69.9297735,17z"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
        aria-label="Ver ubicación de FireforgeRD en Google Maps"
      >
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de FireforgeRD"
          className="grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500 pointer-events-none"
        />
      </a>
      {/* Badge de ubicación */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1818]/80 backdrop-blur-sm border border-white/10 pointer-events-none">
        <MapPin className="w-3 h-3 text-[#FF4D00]" aria-hidden="true" />
        <span className="text-[10px] text-white font-medium uppercase tracking-wider">
          Santo Domingo, RD
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: "Páginas Web", href: "/#servicios" },
      { name: "Tiendas Online", href: "/#servicios" },
      { name: "Sistemas a Medida", href: "/#servicios" },
      { name: "Automatización", href: "/#servicios" },
    ],
    pages: [
      { name: "Diagnóstico Gratis", href: "/diagnostico" },
      { name: "Nuestros Clientes", href: "/clientes" },
      { name: "Blog", href: "/blog" },
      { name: "Contacto", href: "/contacto" },
    ],
    legal: [
      { name: "Aviso Legal", href: "#" },
      { name: "Privacidad", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#1A1818] pt-20 pb-10 overflow-hidden text-white">
      {/* LUZ AMBIENTAL */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(255,77,0,0.06)] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* 1. IDENTIDAD */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <FireLogo className="w-8 h-8" />
              <span className="text-2xl font-semibold tracking-tight">
                FireforgeRD
              </span>
            </div>

            <p className="text-[#9C9890] leading-relaxed max-w-sm text-sm font-light">
              Dejamos de lado el "tecnicismo" para enfocarnos en lo que importa:
              <span className="text-white font-medium">
                {" "}
                Que tu negocio venda más.
              </span>
              <br />
              Desarrollo web y estrategias digitales que posicionan tu negocio.
            </p>

            {/* Mapa con efecto grayscale */}
            <LocationMap />
          </div>

          {/* 2. MENÚ RÁPIDO */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium tracking-wider uppercase text-xs text-[#6F6B65]">
              Servicios
            </h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9C9890] hover:text-[#FF4D00] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-[#FF4D00]"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2.5 PÁGINAS */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium tracking-wider uppercase text-xs text-[#6F6B65]">
              Explorar
            </h4>
            <ul className="space-y-3">
              {links.pages.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9C9890] hover:text-[#FF4D00] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-[#FF4D00]"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTO & SOCIAL */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-medium tracking-wider uppercase text-xs text-[#6F6B65]">
              Hablemos de negocios
            </h4>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/18498534067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white hover:text-[#FF4D00] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF4D00]/10 transition-colors">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Chat vía WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:hola@fireforgerd.com"
                className="flex items-center gap-3 text-sm text-[#9C9890] hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>hola@fireforgerd.com</span>
              </a>
            </div>

            {/* REDES SOCIALES (Github Integrado) */}
            <div className="pt-6 border-t border-white/5">
              <div
                className="flex gap-4"
                role="list"
                aria-label="Redes sociales"
              >
                <a
                  href="https://www.instagram.com/fireforgerd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9C9890] hover:bg-[#E1306C] hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>

                {/* GITHUB: Hover blanco con texto negro (Clean & Techy) */}
                <a
                  href="https://github.com/ChannelF-Oleo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver nuestro Github"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9C9890] hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Link
              href="/admin/login"
              className="text-[#6F6B65] text-xs hover:text-[#6F6B65]"
            >
              © {currentYear} FireforgeRD.
            </Link>
            <span className="hidden md:inline text-[#6F6B65] text-xs">•</span>
            <div className="flex gap-4">
              {links.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#6F6B65] hover:text-white text-xs transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Indicador de Estado */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]"></span>
            </span>
            <span className="text-[10px] text-[#FF4D00] font-medium uppercase tracking-wider">
              Disponibles para proyectos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
