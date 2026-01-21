"use client";

import { useState } from "react";
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
  placeholder = 'blur',
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-[#F9F8F6] ${className}`}>
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
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
}