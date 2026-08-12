import { MetadataRoute } from "next";

async function getBlogSlugs(): Promise<string[]> {
  try {
    // Import dinámico: si falta la config de Firebase, el módulo lanza al
    // cargarse y tumbaría el build entero en vez de degradar el sitemap.
    const { collection, query, where, getDocs } = await import(
      "firebase/firestore"
    );
    const { db } = await import("@/lib/firebase");

    const postsRef = collection(db, "blog_posts");
    const q = query(postsRef, where("published", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().slug as string);
  } catch (error) {
    console.warn("[sitemap] No se pudieron cargar los posts del blog:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANTE: Usar www para consistencia con redirecciones
  const baseUrl = "https://www.fireforgerd.com";

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnostico`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clientes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Páginas dinámicas del blog
  const blogSlugs = await getBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
