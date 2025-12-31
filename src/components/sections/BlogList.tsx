"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types";

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("todos");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, "blog_posts");
        const q = query(
          postsRef,
          where("published", "==", true),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as BlogPost[];

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const allTags = ["todos", ...new Set(posts.flatMap((p) => p.tags))];
  const filteredPosts =
    selectedTag === "todos"
      ? posts
      : posts.filter((p) => p.tags.includes(selectedTag));

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-DO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

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

          <p className="text-[#6F6B65] text-lg max-w-2xl mx-auto">
            Artículos sobre desarrollo web, tecnología y estrategias digitales
            para hacer crecer tu negocio.
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-[#1A1818] text-white"
                    : "bg-[#F9F8F6] text-[#6F6B65] hover:bg-[#1A1818]/5"
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-[#9C9890] mx-auto mb-4" />
            <p className="text-[#6F6B65] text-lg">
              No hay artículos publicados aún.
            </p>
            <p className="text-[#9C9890] text-sm mt-2">
              Vuelve pronto para ver nuevo contenido.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl border border-[#1A1818]/5 overflow-hidden hover:shadow-xl hover:shadow-[#FF4D00]/5 transition-all duration-300">
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F9F8F6]">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[#9C9890]" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-display text-xl font-medium text-[#1A1818] mb-3 group-hover:text-[#FF4D00] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-[#6F6B65] text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-[#9C9890]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{estimateReadTime(post.content)} min</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 pt-4 border-t border-[#1A1818]/5">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1818] group-hover:text-[#FF4D00] transition-colors">
                          Leer más
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
