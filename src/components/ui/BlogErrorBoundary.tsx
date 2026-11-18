"use client";

import React from "react";
import { BookOpen, RefreshCw } from "lucide-react";
import { container, ctaAccent, heading } from "@/components/ds/ui";

interface BlogErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface BlogErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class BlogErrorBoundary extends React.Component<
  BlogErrorBoundaryProps,
  BlogErrorBoundaryState
> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Blog Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Se renderiza dentro del dsRoot de /blog, así que los tokens --ds-* están disponibles.
      return (
        <section role="alert" className="py-24">
          <div className={container}>
            <div className="border-t border-(--ds-fg) pt-6">
              <BookOpen className="size-8 text-(--ds-primary)" aria-hidden />
              <h2 className={`${heading} mt-6 text-3xl font-semibold tracking-tight text-balance`}>
                Error al cargar el contenido
              </h2>
              <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-(--ds-muted-fg)">
                Hubo un problema al cargar los artículos del blog. Recarga la página para intentarlo de nuevo.
              </p>
              <button type="button" onClick={() => window.location.reload()} className={`${ctaAccent} mt-8`}>
                <RefreshCw className="size-4" aria-hidden />
                Recargar página
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}