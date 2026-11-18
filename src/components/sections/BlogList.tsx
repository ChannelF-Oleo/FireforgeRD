import { adminDb } from "@/lib/firebase-admin";
import { BlogListUI } from "./BlogListUI";
import type { BlogPost } from "@/types";
import { unstable_cache } from "next/cache";
import { SectionHeader } from "@/components/ds/SectionHeader";
import { container } from "@/components/ds/ui";
import { publicSlug } from "@/lib/blog-slugs";

// ⚡ SOLUCIÓN: Cache optimizado con invalidación automática
const getCachedPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    try {
      const snapshot = await adminDb
        .collection("blog_posts")
        .where("published", "==", true)
        .orderBy("createdAt", "desc")
        .get();

      return snapshot.docs.map((doc) => {
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
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  },
  ['blog-posts'],
  { 
    revalidate: 300 // 5 minutos
  }
);

async function getPosts(): Promise<BlogPost[]> {
  return getCachedPosts();
}

export async function BlogList() {
  const posts = await getPosts();

  return (
    <section aria-labelledby="blog-title" className="py-24">
      <div className={container}>
        <SectionHeader
          as="h1"
          id="blog-title"
          eyebrow="Blog"
          title="Ideas para hacer crecer tu negocio"
          intro="Artículos sobre desarrollo web, tecnología y estrategias digitales para hacer crecer tu negocio."
        />

        <BlogListUI initialPosts={posts} />
      </div>
    </section>
  );
}
