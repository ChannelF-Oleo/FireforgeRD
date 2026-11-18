"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { dsRoot } from "@/components/ds/fonts";
import { container, ctaAccent, ctaSecondary, focusRing, heading } from "@/components/ds/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sin servicio de monitoreo todavía (TODO: Sentry): queda en la consola.
    console.error("Application error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div className={`${dsRoot} bg-(--ds-bg)`}>
      <section aria-labelledby="error-title" className="py-20 md:py-28">
        <div className={`${container} max-w-2xl`}>
          <div className="border-t border-(--ds-fg) pt-8">
            <AlertTriangle className="size-8 text-(--ds-destructive)" aria-hidden />
            <h1 id="error-title" className={`${heading} mt-6 text-3xl font-semibold tracking-tight md:text-4xl`}>
              Algo salió mal
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-(--ds-muted-fg)">
              Ocurrió un error inesperado al cargar esta página. Puedes intentarlo de nuevo o volver al inicio.
            </p>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-6 border border-(--ds-destructive) bg-(--ds-card) p-4">
                <summary className={`cursor-pointer text-sm font-medium text-(--ds-destructive) ${focusRing}`}>
                  Detalles del error (desarrollo)
                </summary>
                <pre className="mt-3 overflow-auto text-xs text-(--ds-fg)">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={reset} className={ctaAccent}>
                <RefreshCw className="size-4" aria-hidden />
                Intentar de nuevo
              </button>
              <Link href="/" className={ctaSecondary}>
                <Home className="size-4" aria-hidden />
                Ir al inicio
              </Link>
            </div>

            <p className="mt-10 border-t border-(--ds-border) pt-6 text-(--ds-muted-fg)">
              ¿Necesitas ayuda ahora?{" "}
              <a
                href="https://wa.me/18498534067?text=Hola,%20tuve%20un%20error%20en%20la%20página%20web"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium text-(--ds-primary-text) underline underline-offset-4 ${focusRing}`}
              >
                Escríbenos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
