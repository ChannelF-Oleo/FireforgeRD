import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Bloquea rutas internas si las tuvieras
    },
    sitemap: 'https://fireforgerd.com/sitemap.xml', // Asegúrate de que este dominio sea el real
  };
}