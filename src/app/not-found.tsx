import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dsRoot } from "@/components/ds/fonts";
import { container, ctaAccent, ctaSecondary, focusRing, heading } from "@/components/ds/ui";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const sugerencias = [
  { href: "/#precios", label: "Precios" },
  { href: "/#subservicios", label: "Subservicios" },
  { href: "/blog", label: "Blog" },
  { href: "/#proyectos", label: "Proyectos" },
];

export default function NotFound() {
  return (
    <div className={`${dsRoot} bg-(--ds-bg)`}>
      <section aria-labelledby="nf-title" className="py-20 md:py-28">
        <div className={`${container} max-w-2xl`}>
          <div className="border-t border-(--ds-fg) pt-8">
            <p className="text-sm font-medium uppercase tracking-wider text-(--ds-primary-text)">Error 404</p>
            <h1 id="nf-title" className={`${heading} mt-4 text-3xl font-semibold tracking-tight md:text-4xl`}>
              No encontramos esta página
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-(--ds-muted-fg)">
              Puede que el enlace esté mal escrito o que la página ya no exista.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className={ctaAccent}>
                Ir al inicio
              </Link>
              <Link href="/contacto" className={ctaSecondary}>
                Contáctanos
              </Link>
            </div>

            <nav aria-label="Secciones sugeridas" className="mt-10 border-t border-(--ds-border) pt-6">
              <p className="text-(--ds-muted-fg)">O sigue por aquí:</p>
              <ul className="mt-2">
                {sugerencias.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className={`inline-flex min-h-11 items-center gap-1 font-medium hover:text-(--ds-primary-text) ${focusRing}`}>
                      {s.label} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
