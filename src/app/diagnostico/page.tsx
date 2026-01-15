import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Carga dinámica del Quiz - reduce JS inicial significativamente
const DiagnosticoQuiz = dynamic(
  () =>
    import("@/components/sections/DiagnosticoQuiz").then((mod) => ({
      default: mod.DiagnosticoQuiz,
    })),
  {
    loading: () => (
      <div className="py-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#FF4D00] mx-auto mb-4" />
          <p className="text-[#6F6B65]">Cargando diagnóstico...</p>
        </div>
      </div>
    ),
    ssr: false,
  },
);

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
    <div className="min-h-screen bg-[#F9F8F6]">
      <DiagnosticoQuiz />
    </div>
  );
}
