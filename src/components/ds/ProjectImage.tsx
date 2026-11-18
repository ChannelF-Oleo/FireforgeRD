"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";

// Hosts de images.remotePatterns en next.config.ts (mantener en sincronía).
// Con cualquier otro, next/image lanza al renderizar y tumbaría el home entero
// (la URL la pega el admin a mano); para esos casos se sirve sin optimizar.
const OPTIMIZABLE_HOSTS = [/^firebasestorage\.googleapis\.com$/, /\.firebasestorage\.app$/, /^storage\.googleapis\.com$/];

function canOptimize(src: string): boolean {
  // Ruta local ("/x.png"), pero no una URL sin protocolo ("//host/x.png").
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const { protocol, hostname } = new URL(src);
    return protocol === "https:" && OPTIMIZABLE_HOSTS.some((re) => re.test(hostname));
  } catch {
    return false;
  }
}

function Placeholder() {
  return (
    <div className="flex h-full items-center justify-center">
      <Briefcase className="size-10 text-(--ds-muted-fg)" aria-hidden />
    </div>
  );
}

/** Captura del proyecto; si falta o no carga, se muestra el ícono de reserva. */
export function ProjectImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Placeholder />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
      unoptimized={!canOptimize(src)}
      onError={() => setFailed(true)}
    />
  );
}
