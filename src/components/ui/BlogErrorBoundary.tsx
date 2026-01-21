"use client";

import React from "react";
import { BookOpen, RefreshCw } from "lucide-react";

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

      return (
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <BookOpen className="w-16 h-16 text-[#9C9890] mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl text-[#1A1818] mb-4">
              Error al cargar el contenido
            </h2>
            <p className="text-[#5C5850] mb-6 max-w-md mx-auto">
              Hubo un problema al cargar los artículos del blog. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] text-white rounded-xl hover:bg-[#FF4D00]/90 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}