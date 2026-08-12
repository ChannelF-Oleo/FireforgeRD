import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";

interface LegalPageShellProps {
  title: string;
  /** Bajada corta que resume de qué trata la página. */
  intro: string;
  children: React.ReactNode;
}

/**
 * Envoltorio compartido por /aviso-legal y /privacidad.
 * El contenido legal definitivo está en redacción; esta estructura queda
 * lista para reemplazar solo el cuerpo cuando llegue el texto final.
 */
export function LegalPageShell({
  title,
  intro,
  children,
}: LegalPageShellProps) {
  return (
    <section className="bg-[#F9F8F6] py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[#1A1818] mb-4">
            {title}
          </h1>
          <p className="text-[#5C5850] text-lg font-light mb-10">{intro}</p>

          <div className="rounded-2xl border border-[#1A1818]/5 bg-white p-6 md:p-8 space-y-4 text-[#5C5850] text-sm leading-relaxed">
            {children}
          </div>

          {/* Datos de contacto de la empresa */}
          <div className="mt-10 rounded-2xl border border-[#1A1818]/5 bg-white p-6 md:p-8">
            <h2 className="font-display text-xl font-medium text-[#1A1818] mb-4">
              Datos de contacto
            </h2>
            <p className="text-sm text-[#5C5850] mb-5">
              Para cualquier consulta sobre este documento, escríbenos por
              alguno de estos medios:
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 text-[#FF4D00] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:hola@fireforgerd.com"
                  className="text-[#1A1818] hover:text-[#FF4D00] transition-colors"
                >
                  hola@fireforgerd.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle
                  className="w-4 h-4 text-[#FF4D00] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="https://wa.me/18498534067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1818] hover:text-[#FF4D00] transition-colors"
                >
                  WhatsApp: +1 (849) 853-4067
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  className="w-4 h-4 text-[#FF4D00] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[#5C5850]">
                  FireforgeRD — Santo Domingo, República Dominicana
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-10 text-sm">
            <Link
              href="/contacto"
              className="text-[#FF4D00] hover:text-[#1A1818] transition-colors border-b border-[#FF4D00]/30 hover:border-[#1A1818]"
            >
              Ir al formulario de contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
