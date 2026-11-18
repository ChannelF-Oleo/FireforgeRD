import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { getClients } from "@/lib/clients";
import type { Client } from "@/types";
import { GoogleReviewsWidget } from "./GoogleReviewsWidget";
import { SectionHeader } from "./SectionHeader";
import { container, ctaAccent, focusRing, heading } from "./ui";

// Si Firestore falla, el home no se cae: se muestra la sección sin el grid
// (las reseñas de Google se cargan aparte, desde Elfsight).
async function loadClients(): Promise<Client[]> {
  try {
    return await getClients();
  } catch (error) {
    console.error("[home] No se pudieron cargar los clientes:", error);
    return [];
  }
}

function ProjectCard({ client }: { client: Client }) {
  return (
    <article className="flex h-full flex-col border border-(--ds-border) bg-(--ds-card)">
      <div className="relative aspect-video border-b border-(--ds-border) bg-(--ds-muted)">
        {client.image ? (
          <Image
            src={client.image}
            alt={`Captura del proyecto de ${client.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Briefcase className="size-10 text-(--ds-muted-fg)" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--ds-primary-text)">
          {client.tag || client.category}
        </p>
        <h3 className={`${heading} mt-2 text-xl font-semibold`}>{client.name}</h3>
        {/* Descripción completa: ya no hay modal de detalle donde leerla. */}
        <p className="mt-2 flex-1 leading-relaxed text-(--ds-muted-fg)">{client.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href={`/contacto?similar=${encodeURIComponent(client.name)}`}
            className={`${ctaAccent} px-4 text-sm`}
          >
            Quiero algo similar
            <span className="sr-only"> a {client.name}</span>
          </Link>
          {client.websiteUrl && (
            <a
              href={client.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 cursor-pointer items-center gap-1 text-sm font-medium hover:text-(--ds-primary-text) ${focusRing}`}
            >
              Ver el sitio <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">de {client.name} (se abre en otra pestaña)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- Prueba social: proyectos reales (Firestore) + reseñas de Google ---------- */
export async function Projects() {
  const clients = await loadClients();

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="scroll-mt-20 bg-(--ds-muted) py-24">
      <div className={container}>
        <SectionHeader
          id="proyectos-title"
          eyebrow="Clientes"
          title="Proyectos entregados"
          intro="Sitios y sistemas que ya están funcionando para negocios dominicanos."
        />

        {clients.length > 0 && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <li key={client.id}>
                <ProjectCard client={client} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-20">
          <h3 id="resenas-title" className={`${heading} text-2xl font-semibold tracking-tight`}>
            Lo que dicen en Google
          </h3>
          <p className="mt-2 max-w-[65ch] text-(--ds-muted-fg)">
            Reseñas reales de clientes en nuestro perfil de Google.
          </p>
          <div className="mt-8 border border-(--ds-border) bg-(--ds-card) p-4 sm:p-6" aria-labelledby="resenas-title" role="region">
            <GoogleReviewsWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
