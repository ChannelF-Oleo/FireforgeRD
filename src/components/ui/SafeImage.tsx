"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { canOptimizeImage } from "@/lib/image-utils";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Componente de imagen seguro que maneja errores de carga
 * Especialmente útil para imágenes de Firebase Storage que pueden fallar
 */
export function SafeImage({
  src,
  alt,
  fill = false,
  sizes,
  className = "",
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Si no hay src o hubo error, mostrar fallback
  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-(--ds-muted) ${className}`}>
        <BookOpen className="size-12 text-(--ds-muted-fg)" aria-hidden />
      </div>
    );
  }

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
  };

  // La imagen va en el HTML del servidor (antes se esperaba a la hidratación y
  // en /blog el navegador tardaba ~5 s en empezar a descargar la portada, que
  // es el LCP). Sin capa de "cargando" encima: llegaba en ese mismo HTML y
  // tapaba la portada hasta que React hidrataba y corría onLoad (y sin JS no
  // se quitaba nunca). Mientras carga se ve el fondo del contenedor.

  return (
    <div className="relative w-full h-full bg-(--ds-muted)">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
        // "blur" exige blurDataURL con imágenes remotas (Firebase Storage): sin
        // ella, next/image lanza un error en desarrollo y el blog caía en su
        // error boundary. Sin miniatura disponible se usa "empty".
        placeholder={placeholder === "blur" && !blurDataURL ? "empty" : placeholder}
        blurDataURL={blurDataURL}
        unoptimized={!canOptimizeImage(src)}
        onError={handleError}
      />
    </div>
  );
}