import { BookOpen } from "lucide-react";
import { adminDb } from "@/lib/firebase-admin";
import { BlogListUI } from "./BlogListUI";
import type { BlogPost } from "@/types";
import { unstable_cache } from "next/cache";

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
          slug: data.slug || "",
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F9F8F6] to-transparent opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F9F8F6] border border-[#1A1818]/5 mb-6 text-[#FF4D00]">
            <BookOpen className="w-5 h-5" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-light text-[#1A1818] mb-6">
            Nuestro <span className="text-[#FF4D00] font-medium">Blog</span>
          </h1>

          <p className="text-[#5C5850] text-lg max-w-2xl mx-auto">
            Artículos sobre desarrollo web, tecnología y estrategias digitales
            para hacer crecer tu negocio.
          </p>
        </div>

        <BlogListUI initialPosts={posts} />
      </div>
    </section>
  );
}
