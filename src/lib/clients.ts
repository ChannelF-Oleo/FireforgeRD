import { adminDb } from "@/lib/firebase-admin";
import type { Client } from "@/types";

/**
 * Clientes del portafolio, en el orden definido en el admin.
 * La usa la sección de proyectos del home (src/components/ds/Projects.tsx).
 */
export async function getClients(): Promise<Client[]> {
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
