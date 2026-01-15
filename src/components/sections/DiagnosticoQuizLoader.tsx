"use client";

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
  }
);

export function DiagnosticoQuizLoader() {
  return <DiagnosticoQuiz />;
}
