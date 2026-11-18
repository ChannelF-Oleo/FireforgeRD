import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { dsRoot } from "@/components/ds/fonts";
import { SectionHeader } from "@/components/ds/SectionHeader";
import { container, focusRing, heading } from "@/components/ds/ui";
import { email, whatsappHref } from "@/components/ds/nav";

interface LegalPageShellProps {
  title: string;
  /** Bajada corta que resume de qué trata la página. */
  intro: string;
  children: React.ReactNode;
}

const linkClass = `inline-flex min-h-11 items-center hover:text-(--ds-primary-text) ${focusRing}`;

/**
 * Envoltorio compartido por /aviso-legal y /privacidad.
 * El contenido legal definitivo está en redacción; esta estructura queda
 * lista para reemplazar solo el cuerpo cuando llegue el texto final.
 */
export function LegalPageShell({ title, intro, children }: LegalPageShellProps) {
  return (
    <div className={`${dsRoot} bg-(--ds-bg)`}>
      <section aria-labelledby="legal-title" className="py-16 md:py-24">
        <div className={container}>
          <SectionHeader as="h1" id="legal-title" eyebrow="Legal" title={title} intro={intro} />

          <div className="mt-12 md:ml-[25%] md:max-w-[65ch]">
            <div className="space-y-4 leading-relaxed text-(--ds-muted-fg) [&_strong]:text-(--ds-fg)">
              {children}
            </div>

            {/* Datos de contacto de la empresa */}
            <div className="mt-12 border-t border-(--ds-border) pt-8">
              <h2 className={`${heading} text-xl font-semibold`}>Datos de contacto</h2>
              <p className="mt-2 text-(--ds-muted-fg)">
                Para cualquier consulta sobre este documento, escríbenos por alguno de estos medios:
              </p>
              <ul className="mt-4">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    WhatsApp: +1 (849) 853-4067
                  </a>
                </li>
                <li className="flex min-h-11 items-center gap-3 text-(--ds-muted-fg)">
                  <MapPin className="size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                  FireforgeRD — Santo Domingo, República Dominicana
                </li>
              </ul>
            </div>

            <p className="mt-8">
              <Link href="/contacto" className={`${linkClass} font-medium underline underline-offset-4`}>
                Ir al formulario de contacto
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
