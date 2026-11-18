"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { canOptimizeImage } from "@/lib/image-utils";

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
      unoptimized={!canOptimizeImage(src)}
      onError={() => setFailed(true)}
    />
  );
}
