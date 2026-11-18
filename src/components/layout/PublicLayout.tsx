"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { SiteFooter } from "@/components/ds/SiteFooter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { ClientOnly } from "@/components/ui/ClientOnly";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Si es ruta de admin, solo renderizar el contenido sin header/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip link para navegación por teclado */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1A1818] focus:text-white focus:outline-none"
      >
        Saltar al contenido principal
      </a>
      {/* Header sticky (no fixed): ya no hace falta el pt-20 que compensaba
          el header flotante anterior. */}
      <SiteHeader />
      <main id="main-content" className="relative z-10 min-h-screen flex-grow" role="main">
        {children}
      </main>
      <SiteFooter />
      <ClientOnly>
        <FloatingWhatsApp />
      </ClientOnly>
    </>
  );
}
