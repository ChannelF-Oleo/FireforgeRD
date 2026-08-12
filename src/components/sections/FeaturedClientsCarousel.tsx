import { Sparkles } from "lucide-react";
import { adminDb } from "@/lib/firebase-admin";
import { FeaturedClientsCarouselUI } from "./FeaturedClientsCarouselUI";
import type { Client } from "@/types";

// ── Data fetching ─────────────────────────────────────────────────────────────
// Se ordena en Firestore y se filtra en memoria: un `where("featured")` junto al
// `orderBy("order")` exigiría un índice compuesto para un set de pocos docs.
async function getFeaturedClients(): Promise<Client[]> {
  const snapshot = await adminDb
    .collection("clients")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs
    .map((doc): Client => {
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
    })
    .filter((client) => client.featured === true);
}

// ── Componente ────────────────────────────────────────────────────────────────
export async function FeaturedClientsCarousel() {
  const clients = await getFeaturedClients();

  // Sin destacados no hay sección: no tiene sentido un carrusel vacío.
  if (clients.length === 0) return null;

  return (
    <section
      className="py-20 md:py-28 bg-white overflow-hidden"
      aria-labelledby="featured-clients-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <header className="mb-14 text-center">
          <div
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1818]/5 bg-[#F9F8F6] text-[#FF4D00] shadow-sm"
            aria-hidden="true"
          >
            <Sparkles className="h-5 w-5" />
          </div>

          <h2
            id="featured-clients-heading"
            className="font-display text-3xl md:text-4xl font-light text-[#1A1818]"
          >
            Proyectos <span className="font-medium">destacados</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5C5850]">
            Una selección del trabajo que ya está en producción. Toca una tarjeta
            para ver el detalle.
          </p>
        </header>

        <FeaturedClientsCarouselUI clients={clients} />
      </div>
    </section>
  );
}
