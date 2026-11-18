"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Check } from "lucide-react";
import { SafeMarkdown } from "@/components/ui/SafeMarkdown";
import { SafeImage } from "@/components/ui/SafeImage";
import { container, ctaAccent, focusRing, heading } from "@/components/ds/ui";
import type { BlogPost } from "@/types";
import { estimateReadTime, formatPostDate } from "@/lib/blog-format";

interface Props {
  post: BlogPost;
}

export function BlogPostView({ post }: Props) {
  // Aviso accesible en vez de alert() cuando se copia el enlace.
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // Usuario canceló
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback si clipboard no está disponible
        console.log('No se pudo copiar al portapapeles');
      }
    }
  };

  const author = post.author || "FireforgeRD";

  return (
    <article aria-labelledby="post-title" className="py-16 md:py-24">
      <div className={container}>
        <Link
          href="/blog"
          className={`inline-flex min-h-11 cursor-pointer items-center gap-2 font-medium text-(--ds-muted-fg) transition-colors duration-200 hover:text-(--ds-fg) ${focusRing}`}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al blog
        </Link>

        <div className="mx-auto mt-8 max-w-3xl">
          <header className="border-t border-(--ds-fg) pt-6">
            {post.tags && post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Etiquetas">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-sm font-medium uppercase tracking-wider text-(--ds-primary-text)"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <h1
              id="post-title"
              className={`${heading} mt-4 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl`}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-(--ds-muted-fg) md:text-xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-(--ds-border) py-3 text-sm text-(--ds-muted-fg)">
              <span className="flex items-center gap-2">
                <span
                  className="flex size-8 items-center justify-center bg-(--ds-accent) text-xs font-bold text-(--ds-on-accent)"
                  aria-hidden
                >
                  {author.charAt(0)}
                </span>
                <span className="font-medium text-(--ds-fg)">{author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" aria-hidden />
                <time dateTime={toIso(post.createdAt)}>{formatPostDate(post.createdAt)}</time>
              </span>
              <span className="flex items-center gap-1.5 tabular-nums">
                <Clock className="size-4" aria-hidden />
                {estimateReadTime(post.content)} min
                <span className="sr-only">de lectura</span>
              </span>
              <button
                type="button"
                onClick={handleShare}
                className={`ml-auto inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-medium text-(--ds-fg) transition-colors duration-200 hover:text-(--ds-primary-text) ${focusRing}`}
              >
                {copied ? <Check className="size-4" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
                <span className="hidden sm:inline">{copied ? "Enlace copiado" : "Compartir"}</span>
                <span className="sr-only sm:hidden">{copied ? "Enlace copiado" : "Compartir"}</span>
              </button>
              <span className="sr-only" role="status">
                {copied ? "Enlace copiado al portapapeles" : ""}
              </span>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative mt-10 aspect-video overflow-hidden border border-(--ds-border) bg-(--ds-muted)">
              <SafeImage
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-full object-cover"
                priority
                quality={75}
                placeholder="blur"
              />
            </div>
          )}

          {/* SafeMarkdown evita el hydration mismatch; los estilos están en .blog-content (globals.css) */}
          <SafeMarkdown content={post.content} className="mt-10" />

          <aside
            aria-labelledby="post-cta-title"
            className="mt-16 grid gap-6 border border-(--ds-border) bg-(--ds-muted) p-6 md:grid-cols-12 md:items-center md:p-8"
          >
            <div className="md:col-span-8">
              <h2 id="post-cta-title" className={`${heading} text-2xl font-semibold tracking-tight`}>
                ¿Te gustó este artículo?
              </h2>
              <p className="mt-2 leading-relaxed text-(--ds-muted-fg)">
                Descubre cómo podemos ayudarte a implementar estas ideas en tu negocio.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link href="/contacto" className={`${ctaAccent} w-full md:w-auto`}>
                Hablemos de tu proyecto <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function toIso(date: Date | string | null | undefined) {
  if (!date) return undefined;
  const d = date instanceof Date ? date : new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}
