import type { Metadata } from "next";
import { DiagnosticoQuiz } from "@/components/sections/DiagnosticoQuiz";

export const metadata: Metadata = {
  title: "Diagnóstico Tecnológico Gratuito",
  description:
    "Descubre qué solución tecnológica necesita tu negocio. Test interactivo de 5 minutos con recomendaciones personalizadas.",
  openGraph: {
    title: "Diagnóstico Tecnológico Gratuito | FireforgeRD",
    description:
      "Descubre qué solución tecnológica necesita tu negocio en solo 5 minutos.",
  },
};

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <DiagnosticoQuiz />
    </div>
  );
}
