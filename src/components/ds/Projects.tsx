import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getClients } from "@/lib/clients";
import type { Client } from "@/types";
import { GoogleReviewsWidget } from "./GoogleReviewsWidget";
import { ProjectImage } from "./ProjectImage";
import { SectionHeader } from "./SectionHeader";
import { container, ctaAccent, focusRing, heading } from "./ui";

// Valores del select de categoría en ClientsManager. Sin tag se mostraba el
// valor interno ("chatbot", "sistema") como rótulo de la tarjeta.
const categoryLabels: Record<string, string> = {
  web: "Sitio web",
  ecommerce: "E-commerce",
  sistema: "Sistema",
  chatbot: "Chatbot",
};

function ProjectCard({ client }: { client: Client }) {
  return (
    <article className="flex h-full flex-col border border-(--ds-border) bg-(--ds-card)">
      <div className="relative aspect-video border-b border-(--ds-border) bg-(--ds-muted)">
        <ProjectImage src={client.image} alt={`Captura del proyecto de ${client.name}`} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--ds-primary-text)">
          {client.tag || categoryLabels[client.category] || client.category}
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
  // Sin try/catch: el home es ISR (revalidate 300). Si Firestore falla en una
  // regeneración, el error deja servir la versión anterior; devolver [] la
  // reemplazaba por una sección de proyectos vacía.
  const clients = await getClients();
  const hasClients = clients.length > 0;

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="scroll-mt-20 bg-(--ds-muted) py-24">
      <div className={container}>
        {/* Sin clientes en Firestore no se anuncia "Proyectos entregados" sobre
            una lista vacía: la sección queda solo con las reseñas. */}
        {hasClients ? (
          <>
            <SectionHeader
              id="proyectos-title"
              eyebrow="Clientes"
              title="Proyectos entregados"
              intro="Sitios y sistemas que ya están funcionando para negocios dominicanos."
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <li key={client.id}>
                  <ProjectCard client={client} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <SectionHeader
            id="proyectos-title"
            eyebrow="Clientes"
            title="Lo que dicen nuestros clientes"
            intro="Reseñas reales de clientes en nuestro perfil de Google."
          />
        )}

        <div className={hasClients ? "mt-20" : "mt-12"}>
          {hasClients && (
            <>
              <h3 id="resenas-title" className={`${heading} text-2xl font-semibold tracking-tight`}>
                Lo que dicen en Google
              </h3>
              <p className="mt-2 max-w-[65ch] text-(--ds-muted-fg)">
                Reseñas reales de clientes en nuestro perfil de Google.
              </p>
            </>
          )}
          <div className={`${hasClients ? "mt-8" : ""} border border-(--ds-border) bg-(--ds-card) p-4 sm:p-6" aria-labelledby={hasClients ? "resenas-title" : "proyectos-title"} role="region">
            <GoogleReviewsWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
