import { Briefcase } from "lucide-react";
import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";
import { ClientsGridUI } from "./ClientsGridUI";
import type { Client } from "@/types";

async function getClients(): Promise<Client[]> {
  const snapshot = await adminDb
    .collection("clients")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      category: data.category,
      image: data.image || null,
      websiteUrl: data.websiteUrl || null,
      tag: data.tag || null,
      featured: data.featured || false,
      order: data.order || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Client;
  });
}

export async function ClientsGrid() {
  const clients = await getClients();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F9F8F6] to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F8F6] border border-[#1A1818]/5 mb-6 text-[#FF4D00]">
            <Briefcase className="w-5 h-5" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-light text-[#1A1818] mb-6">
            Nuestros{" "}
            <span className="text-[#FF4D00] font-medium">Clientes</span>
          </h1>

          <p className="text-[#6F6B65] text-lg max-w-2xl mx-auto">
            Empresas que han confiado en nosotros para transformar su presencia
            digital.
          </p>
        </div>

        <ClientsGridUI initialClients={clients} />

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#6F6B65] mb-4">
            ¿Quieres que tu empresa esté aquí?
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1818] text-white rounded-full hover:bg-[#FF4D00] transition-colors font-medium"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}
