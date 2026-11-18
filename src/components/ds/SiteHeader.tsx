"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FireMark } from "@/components/ui/fire-mark";
import { dsRoot } from "./fonts";
import { contactHref, siteNav } from "./nav";
import { container, ctaAccent, focusRing, heading } from "./ui";

// Header sticky (patrón "CTA en hero sticky + bottom" del design system).
// Nav completo desde lg; por debajo, botón de menú que despliega un panel.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Cada link del panel lo cierra al hacer clic (onClick), así que no hace
  // falta escuchar cambios de ruta.
  return (
    <header className={`${dsRoot} sticky top-0 z-40 border-b border-(--ds-border) bg-(--ds-bg)`}>
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className={`${heading} inline-flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight ${focusRing}`}>
          <FireMark className="size-7" />
          FireforgeRD
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-7 text-sm font-medium">
            {siteNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`cursor-pointer text-(--ds-muted-fg) transition-colors duration-200 hover:text-(--ds-fg) ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={contactHref} className={`${ctaAccent} px-4 text-sm`}>
            <span className="sm:hidden">Cotiza</span>
            <span className="hidden sm:inline">Cotiza tu proyecto</span>
          </Link>
          <button
            type="button"
            className={`inline-flex size-11 cursor-pointer items-center justify-center border border-(--ds-border) lg:hidden ${focusRing}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id={panelId}
        aria-label="Menú móvil"
        hidden={!open}
        className="border-t border-(--ds-border) bg-(--ds-bg) lg:hidden"
      >
        <ul className={`${container} py-2`}>
          {siteNav.map((l) => (
            <li key={l.href} className="border-b border-(--ds-border) last:border-b-0">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-12 cursor-pointer items-center text-base font-medium ${focusRing}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
