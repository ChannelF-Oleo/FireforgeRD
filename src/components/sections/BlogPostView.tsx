"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

export function BlogPostView({ post }: Props) {
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

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <article className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#6F6B65] hover:text-[#FF4D00] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#F9F8F6] text-[#FF4D00] text-xs font-bold uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1818] mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-[#6F6B65] mb-6">{post.excerpt}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9C9890]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FF4D00] flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="text-[#1A1818] font-medium">
                  {post.author}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{estimateReadTime(post.content)} min de lectura</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-[#FF4D00] transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-[#F9F8F6]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-[#1A1818] prose-p:text-[#3D3A36] prose-a:text-[#FF4D00] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A1818] prose-code:bg-[#F9F8F6] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#1A1818] prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-[#F9F8F6] rounded-2xl text-center">
            <BookOpen className="w-10 h-10 text-[#FF4D00] mx-auto mb-4" />
            <h3 className="font-display text-2xl text-[#1A1818] mb-3">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-[#6F6B65] mb-6">
              Descubre cómo podemos ayudarte a implementar estas ideas en tu
              negocio.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1818] text-white rounded-full hover:bg-[#FF4D00] transition-colors font-medium"
            >
              Hablemos de tu proyecto
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
