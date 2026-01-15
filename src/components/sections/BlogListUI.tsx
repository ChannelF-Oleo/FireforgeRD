"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogListUIProps {
  initialPosts: BlogPost[];
}

export function BlogListUI({ initialPosts }: BlogListUIProps) {
  const [selectedTag, setSelectedTag] = useState<string>("todos");

  const allTags = ["todos", ...new Set(initialPosts.flatMap((p) => p.tags))];
  const filteredPosts =
    selectedTag === "todos"
      ? initialPosts
      : initialPosts.filter((p) => p.tags.includes(selectedTag));

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
    <>
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
                  : "bg-[#F9F8F6] text-[#5C5850] hover:bg-[#1A1818]/5"
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-[#9C9890] mx-auto mb-4" />
          <p className="text-[#5C5850] text-lg">
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                    <p className="text-[#5C5850] text-sm mb-4 line-clamp-3">
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
    </>
  );
}
