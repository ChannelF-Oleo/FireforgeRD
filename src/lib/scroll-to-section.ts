"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToElement } from "@/lib/utils";

/**
 * Navegación a secciones del home (#servicios, #precios, #faq, #contact).
 *
 * Esas secciones solo existen en "/", así que un scroll directo falla en
 * silencio desde cualquier otra ruta (/clientes, /blog, /diagnostico...).
 * Este hook centraliza la decisión: si estamos en el home hace scroll suave,
 * y si no, navega a /#id y deja que el router haga el scroll al llegar.
 *
 * Antes esta lógica vivía solo en el Header; Hero y PricingMatrix llamaban a
 * scrollToElement() directo y por eso quedaban rotos fuera del home.
 */
export function useScrollToSection() {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (sectionId: string) => {
      if (pathname !== "/") {
        router.push(`/#${sectionId}`);
        return;
      }

      if (typeof window === "undefined") return;

      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      scrollToElement(sectionId);
    },
    [pathname, router],
  );
}
