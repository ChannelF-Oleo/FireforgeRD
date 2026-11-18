import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import { BlogPostView } from "@/components/sections/BlogPostView";
import type { BlogPost } from "@/types";
import { unstable_cache } from "next/cache";
import { dsRoot } from "@/components/ds/fonts";
import { publicSlug, renamedSlug, storedSlugCandidates } from "@/lib/blog-slugs";
import { defaultOgImage } from "@/lib/og";

// ⚡ SOLUCIÓN: Revalidar cada 10 minutos para posts individuales
export const revalidate = 600; // 10 minutos

interface Props {
  params: Promise<{ slug: string }>;
}

// ⚡ SOLUCIÓN: Cache optimizado para posts individuales
// Sin try/catch: un error de Firestore debe propagarse. Si se devolviera null,
// unstable_cache guardaría "no existe" 10 minutos y el artículo daría 404; al
// lanzar, no se cachea nada y en una regeneración ISR se sigue sirviendo la
// versión anterior de la página.
const getCachedPost = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const snapshot = await adminDb
      .collection("blog_posts")
      .where("slug", "in", storedSlugCandidates(slug))
      .where("published", "==", true)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    // ⚡ SOLUCIÓN: Conversión segura de fechas de Firestore
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : 
                     data.createdAt ? new Date(data.createdAt) : new Date();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate() : 
                     data.updatedAt ? new Date(data.updatedAt) : new Date();

    return {
      id: doc.id,
      title: data.title || "",
      slug: publicSlug(data.slug || ""),
      excerpt: data.excerpt || "",
      content: data.content || "",
      coverImage: data.coverImage || null,
      author: data.author || "FireforgeRD",
      tags: data.tags || [],
      published: data.published || false,
      createdAt,
      updatedAt,
    } as BlogPost;
  },
  ['blog-post'],
  { 
    revalidate: 600 // 10 minutos
  }
);

async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await getCachedPost(slug);
  if (!post) return null;
  // unstable_cache guarda el resultado como JSON: en un acierto de caché las
  // fechas vuelven como string. Sin esto, createdAt.toISOString() fallaba en
  // generateMetadata y cada artículo publicaba la metadata genérica de reserva
  // (sin su título, descripción ni imagen para compartir).
  return {
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  };
}

const SITE = "https://www.fireforgerd.com";

function postUrl(slug: string) {
  return `${SITE}/blog/${slug}`;
}

/** BlogPosting + migas de pan, en el HTML del servidor. */
function postJsonLd(post: BlogPost) {
  const url = postUrl(post.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#articulo`,
        headline: post.title,
        description: post.excerpt,
        ...(post.coverImage ? { image: [post.coverImage] } : {}),
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        inLanguage: "es-DO",
        mainEntityOfPage: url,
        url,
        ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
        author: { "@type": "Organization", name: post.author || "FireforgeRD", url: SITE },
        publisher: {
          "@type": "Organization",
          name: "FireforgeRD",
          url: SITE,
          logo: { "@type": "ImageObject", url: `${SITE}/Icon.png` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post no encontrado" };
  }

  const url = postUrl(post.slug);
  // Sin portada se usa la imagen general del sitio: el openGraph/twitter de
  // la página reemplaza al del layout, así que hay que declararla aquí.
  const images = post.coverImage ? [post.coverImage] : [defaultOgImage];
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | FireforgeRD`,
      description: post.excerpt,
      url,
      siteName: "FireforgeRD",
      locale: "es_DO",
      images,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  // URL vieja (de antes de corregir las tildes): 308 a la nueva.
  const { slug: requested } = await params;
  const renamed = renamedSlug(requested);
  if (renamed) permanentRedirect(`/blog/${renamed}`);

  // Solo un post inexistente da 404. Un error de Firestore se propaga: lo
  // muestra error.tsx y, en una regeneración ISR, se conserva la página anterior
  // en vez de reemplazarla por un 404.
  const post = await getPost(requested);

  if (!post) {
    notFound();
  }

  return (
    <div className={`${dsRoot} min-h-screen bg-(--ds-bg)`}>
      <script
        type="application/ld+json"
        // "<" escapado: el título o el extracto no pueden cerrar el <script>.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post)).replace(/</g, "\\u003c") }}
      />
      <BlogPostView post={post} />
    </div>
  );
}
