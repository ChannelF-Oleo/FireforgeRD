"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/ds/SectionHeader";
import { container } from "@/components/ds/ui";

// Carga dinámica del Quiz - reduce JS inicial significativamente
const DiagnosticoQuiz = dynamic(
  () =>
    import("@/components/sections/DiagnosticoQuiz").then((mod) => ({
      default: mod.DiagnosticoQuiz,
    })),
  {
    // Este fallback es lo único que llega en el HTML del servidor (ssr: false),
    // así que lleva el mismo encabezado que el quiz: la página tiene H1 y texto
    // indexable, y al cargar el quiz el título no salta.
    loading: () => (
      <section aria-labelledby="diagnostico-title" className="min-h-screen py-16 md:py-24">
        <div className={container}>
          <SectionHeader
            as="h1"
            id="diagnostico-title"
            eyebrow="Diagnóstico gratuito"
            title="Descubre qué necesita tu negocio"
            intro="Responde unas preguntas rápidas y te recomendamos la solución que mejor le queda."
          />
          <div role="status" className="mt-12 flex items-center gap-3 text-(--ds-muted-fg)">
            <Loader2 className="size-5 animate-spin text-(--ds-primary) motion-reduce:animate-none" aria-hidden />
            Cargando diagnóstico...
          </div>
        </div>
      </section>
    ),
    ssr: false,
  }
);

export function DiagnosticoQuizLoader() {
  return <DiagnosticoQuiz />;
}
