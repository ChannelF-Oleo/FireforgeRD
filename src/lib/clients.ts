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
      // Sin try/catch en el home: un createdAt que no sea Timestamp (string o
      // número de una importación) no debe tumbar la página.
      createdAt: toDate(d.createdAt),
    };
  });
}

function toDate(value: unknown): Date {
  if (value && typeof (value as { toDate?: unknown }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }
  const date = new Date(value as string | number);
  return value != null && !isNaN(date.getTime()) ? date : new Date();
}
