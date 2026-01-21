'use server';

import { revalidatePath } from 'next/cache';

/**
 * Invalida el caché del blog después de crear/editar/eliminar posts
 * Debe ser llamada desde el admin después de cualquier operación CRUD
 */
export async function revalidateBlog() {
  try {
    // Invalidar páginas específicas
    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    
    // También invalidar la página principal que puede mostrar posts recientes
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error revalidating blog cache:', error);
    return { success: false, error: 'Failed to revalidate cache' };
  }
}

/**
 * Invalida el caché de un post específico por slug
 */
export async function revalidateBlogPost(slug: string) {
  try {
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/blog');
    
    return { success: true };
  } catch (error) {
    console.error('Error revalidating blog post:', error);
    return { success: false, error: 'Failed to revalidate post' };
  }
}