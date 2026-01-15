import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import { BlogPostView } from "@/components/sections/BlogPostView";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const snapshot = await adminDb
      .collection("blog_posts")
      .where("slug", "==", slug)
      .where("published", "==", true)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || null,
      author: data.author || "FireforgeRD",
      tags: data.tags || [],
      published: data.published,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as BlogPost;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post no encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | FireforgeRD`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
