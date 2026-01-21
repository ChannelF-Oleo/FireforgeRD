"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Si no hay src o hubo error, mostrar fallback
  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-[#F9F8F6] ${className}`}>
        <BookOpen className="w-12 h-12 text-[#9C9890]" />
      </div>
    );
  }

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Don't render the image until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className={`flex items-center justify-center bg-[#F9F8F6] ${className}`}>
        <div className="w-8 h-8 border-2 border-[#FF4D00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-[#F9F8F6] z-10`}>
          <div className="w-8 h-8 border-2 border-[#FF4D00] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}