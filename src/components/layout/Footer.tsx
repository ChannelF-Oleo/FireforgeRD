'use client';

import { FireLogo } from '@/components/ui/animated-logo';
// Cambiamos Linkedin por Github en los imports
import { Instagram, Github, MessageCircle, MapPin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: 'Páginas Web', href: '#servicios' },
      { name: 'Tiendas Online', href: '#servicios' },
      { name: 'Sistemas a Medida', href: '#servicios' },
      { name: 'Automatización', href: '#servicios' },
    ],
    legal: [
      { name: 'Aviso Legal', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Garantía de Servicio', href: '#' },
    ]
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
              <span className="text-2xl font-semibold tracking-tight">FireforgeRD</span>
            </div>
            
            <p className="text-[#9C9890] leading-relaxed max-w-sm text-sm font-light">
              Dejamos de lado el "tecnicismo" para enfocarnos en lo que importa: 
              <span className="text-white font-medium"> Que tu negocio venda más.</span>
              <br />
              Desarrollo web y estrategias digitales que posicionan tu negocio.
            </p>

            {/* Ubicación */}
            <div className="flex items-start gap-3 text-sm text-[#9C9890] pt-2">
                <MapPin className="w-4 h-4 mt-1 text-[#FF4D00]" />
                <span>
                  Santo Domingo, Distrito Nacional.<br/>
                  República Dominicana.
                </span>
            </div>
          </div>

          {/* 2. MENÚ RÁPIDO */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-medium tracking-wider uppercase text-xs text-[#6F6B65]">Explorar</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#9C9890] hover:text-[#FF4D00] transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-[#FF4D00]"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTO & SOCIAL */}
          <div className="md:col-span-4 space-y-6">
            
            <h4 className="font-medium tracking-wider uppercase text-xs text-[#6F6B65]">Hablemos de negocios</h4>
            
            <div className="space-y-4">
                {/* WhatsApp */}
                <a 
                    href="https://wa.me/18094202288" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-white hover:text-[#FF4D00] transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF4D00]/10 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>Chat vía WhatsApp</span>
                </a>

                {/* Email */}
                <a 
                    href="mailto:hola@fireforgerd.com" 
                    className="flex items-center gap-3 text-sm text-[#9C9890] hover:text-white transition-colors group"
                >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <span>hola@fireforgerd.com</span>
                </a>
            </div>

            {/* REDES SOCIALES (Github Integrado) */}
            <div className="pt-6 border-t border-white/5">
                <div className="flex gap-4">
                    <a 
                      href="https://www.instagram.com/fireforgerd/" 
                      target="_blank"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9C9890] hover:bg-[#E1306C] hover:text-white transition-all duration-300"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                    
                    {/* GITHUB: Hover blanco con texto negro (Clean & Techy) */}
                    <a 
                      href="https://github.com/ChannelF-Oleo" 
                      target="_blank" 
                      aria-label="Github"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#9C9890] hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>

          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
              <p className="text-[#6F6B65] text-xs">
                © {currentYear} FireforgeRD.
              </p>
              <span className="hidden md:inline text-[#6F6B65] text-xs">•</span>
              <div className="flex gap-4">
                  {links.legal.map((link) => (
                      <a key={link.name} href={link.href} className="text-[#6F6B65] hover:text-white text-xs transition-colors">
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
