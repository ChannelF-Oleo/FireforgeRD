"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://static.elfsight.com/platform/platform.js";
const APP_CLASS = "elfsight-app-df23be39-2807-4e2f-8500-472a12fef93c";

/**
 * Widget de reseñas de Google (Elfsight), cargado solo cuando el visitante se
 * acerca a la sección.
 *
 * Con next/script lazyOnload el script se descargaba y ejecutaba en cada
 * visita aunque nadie bajara hasta las reseñas: en Lighthouse móvil eran ~6 s
 * de CPU y la mayor parte del bloqueo del hilo principal del home. Ahora se
 * inyecta cuando el contenedor está a 600px de entrar en pantalla.
 */
export function GoogleReviewsWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const load = () => {
      if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // min-h reserva espacio para que el widget no empuje el contenido al cargar.
  return <div ref={ref} className={`${APP_CLASS} min-h-80`} />;
}
