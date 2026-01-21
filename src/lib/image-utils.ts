/**
 * Utilidades para manejo de imágenes de Firebase Storage
 */

/**
 * Valida si una URL de imagen es válida y accesible
 */
export function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && 
           (urlObj.hostname.includes('firebasestorage.googleapis.com') ||
            urlObj.hostname.includes('firebasestorage.app') ||
            urlObj.hostname.includes('storage.googleapis.com'));
  } catch {
    return false;
  }
}

/**
 * Optimiza URLs de Firebase Storage para mejor rendimiento
 */
export function optimizeFirebaseImageUrl(url: string, width?: number, quality?: number): string {
  if (!isValidImageUrl(url)) return url;
  
  try {
    const urlObj = new URL(url);
    
    // Para Firebase Storage, podemos agregar parámetros de optimización
    if (width) {
      urlObj.searchParams.set('w', width.toString());
    }
    if (quality) {
      urlObj.searchParams.set('q', quality.toString());
    }
    
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Genera un placeholder base64 para imágenes
 */
export const IMAGE_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

/**
 * Props optimizadas para componente Image de Next.js
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Genera props optimizadas para imágenes de blog
 */
export function getBlogImageProps(
  src: string | null | undefined,
  alt: string,
  isPriority = false
): OptimizedImageProps | null {
  if (!isValidImageUrl(src)) return null;
  
  return {
    src,
    alt,
    priority: isPriority,
    loading: isPriority ? 'eager' : 'lazy',
    quality: isPriority ? 90 : 85,
    placeholder: 'blur',
    blurDataURL: IMAGE_PLACEHOLDER,
  };
}