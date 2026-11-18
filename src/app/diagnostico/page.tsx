import type { Metadata } from "next";
import { dsRoot } from "@/components/ds/fonts";
import { DiagnosticoQuizLoader } from "@/components/sections/DiagnosticoQuizLoader";

export const metadata: Metadata = {
  title: "Diagnóstico Tecnológico Gratuito",
  description:
    "Descubre qué solución tecnológica necesita tu negocio. Test interactivo de 5 minutos con recomendaciones personalizadas.",
  alternates: {
    canonical: "https://www.fireforgerd.com/diagnostico",
  },
  openGraph: {
    title: "Diagnóstico Tecnológico Gratuito | FireforgeRD",
    description:
      "Descubre qué solución tecnológica necesita tu negocio en solo 5 minutos.",
    url: "https://www.fireforgerd.com/diagnostico",
  },
};

export default function DiagnosticoPage() {
  return (
    <div className={`${dsRoot} min-h-screen bg-(--ds-bg)`}>
      <DiagnosticoQuizLoader />
    </div>
  );
}
