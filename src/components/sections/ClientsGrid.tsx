import { Briefcase } from "lucide-react";
import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";
import { ClientsGridUI } from "./ClientsGridUI";
import type { Client } from "@/types";

// ── Data fetching ─────────────────────────────────────────────────────────────
async function getClients(): Promise<Client[]> {
  const snapshot = await adminDb
    .collection("clients")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc): Client => {
    const d = doc.data();
    return {
      id: doc.id,
      name: d.name,
      description: d.description,
      category: d.category,
      image: d.image ?? null,
      websiteUrl: d.websiteUrl ?? null,
      tag: d.tag ?? null,
      featured: d.featured ?? false,
      order: d.order ?? 0,
      createdAt: d.createdAt?.toDate() ?? new Date(),
    };
  });
}

// ── Componente ────────────────────────────────────────────────────────────────
export async function ClientsGrid() {
  const clients = await getClients();

  return (
    <section
      className="clients-section"
      aria-labelledby="clients-heading"
    >
      {/* Gradiente decorativo */}
      <div className="clients-gradient" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <header className="clients-header">
          <div className="clients-icon" aria-hidden="true">
            <Briefcase className="w-5 h-5" />
          </div>

          <h1
            id="clients-heading"
            className="font-display text-4xl md:text-5xl font-light text-[#1A1818]"
          >
            Nuestros{" "}
            <span className="text-[#FF4D00] font-medium">Clientes</span>
          </h1>

          <p className="text-[#5C5850] text-lg max-w-2xl mx-auto">
            Empresas que han confiado en nosotros para transformar su presencia
            digital.
          </p>
        </header>

        <ClientsGridUI initialClients={clients} />

        {/* CTA */}
        <footer className="clients-cta">
          <p className="text-[#5C5850]">
            ¿Quieres que tu empresa esté aquí?
          </p>
          <Link
            href="/contacto"
            className="clients-cta-link"
          >
            Hablemos de tu proyecto
          </Link>
        </footer>

      </div>
    </section>
  );
}
