import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    // IMPORTANTE: Usar www para consistencia con redirecciones
    sitemap: 'https://www.fireforgerd.com/sitemap.xml',
  };
}