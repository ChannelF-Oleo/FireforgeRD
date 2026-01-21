"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
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
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1A1818] focus:text-white focus:rounded-lg focus:outline-none"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-grow pt-20 relative z-10 min-h-screen"
        role="main"
      >
        {children}
      </main>
      <Footer />
      <ClientOnly>
        <FloatingWhatsApp />
      </ClientOnly>
    </>
  );
}
