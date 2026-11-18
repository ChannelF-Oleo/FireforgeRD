"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ctaAccent, focusRing, heading } from "@/components/ds/ui";
import type { BlogPost } from "@/types";

// Control de formulario Swiss: radio 0, borde de 1px, 44px de alto.
const field = `min-h-11 w-full border border-(--ds-border) bg-(--ds-card) text-sm text-(--ds-fg) transition-colors duration-200 placeholder:text-(--ds-muted-fg) hover:border-(--ds-fg) ${focusRing}`;
const textLink = `inline-flex min-h-11 cursor-pointer items-center gap-1 font-medium text-(--ds-primary-text) underline-offset-4 hover:underline ${focusRing}`;

interface BlogListUIProps {
  initialPosts: BlogPost[];
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export function BlogListUI({ initialPosts }: BlogListUIProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const filtersId = useId();

  // Obtener todos los tags únicos
  const allTags = useMemo(() => {
    const tags = new Set(initialPosts.flatMap((p) => p.tags));
    return Array.from(tags).sort();
  }, [initialPosts]);

  // Filtrar y ordenar posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = initialPosts;

    // Filtrar por búsqueda de texto
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filtrar por tags seleccionados
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [initialPosts, searchTerm, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm.trim() || selectedTags.length > 0 || sortBy !== 'newest';

  const formatDate = (date: Date | string | null | undefined) => {
    // ⚡ SOLUCIÓN: Validación robusta de fechas
    if (!date) return "Fecha no disponible";
    
    try {
      let dateObj: Date;
      
      if (date instanceof Date) {
        dateObj = date;
      } else if (typeof date === 'string') {
        dateObj = new Date(date);
      } else {
        return "Fecha no disponible";
      }
      
      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return "Fecha no válida";
      }
      
      // Zona fija: el servidor corre en UTC y el visitante en hora de RD; sin
      // esto un artículo publicado de noche mostraba otro día en cada lado y
      // la hidratación fallaba (React #418).
      return new Intl.DateTimeFormat("es-DO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Santo_Domingo",
      }).format(dateObj);
    } catch (error) {
      console.error("Error formatting date:", error, date);
      return "Fecha no disponible";
    }
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'newest': return 'Más recientes';
      case 'oldest': return 'Más antiguos';
      case 'title-asc': return 'Título A-Z';
      case 'title-desc': return 'Título Z-A';
    }
  };

  const count = filteredAndSortedPosts.length;

  return (
    <>
      {/* Búsqueda, orden y filtros por etiqueta */}
      <div className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor="blog-search" className="sr-only">
              Buscar artículos
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-(--ds-muted-fg)"
              aria-hidden
            />
            <input
              id="blog-search"
              type="search"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${field} py-3 pl-10 pr-4`}
            />
          </div>

          <div className="relative sm:w-48">
            <label htmlFor="blog-sort" className="sr-only">
              Ordenar artículos
            </label>
            <select
              id="blog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`${field} cursor-pointer appearance-none py-3 pl-4 pr-10 font-medium`}
            >
              {(["newest", "oldest", "title-asc", "title-desc"] as const).map((opt) => (
                <option key={opt} value={opt}>
                  {getSortLabel(opt)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-(--ds-muted-fg)"
              aria-hidden
            />
          </div>

          {allTags.length > 0 && (
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls={filtersId}
              className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border px-4 py-3 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                showFilters || selectedTags.length > 0
                  ? "border-(--ds-fg) bg-(--ds-fg) text-(--ds-bg)"
                  : "border-(--ds-border) bg-(--ds-card) text-(--ds-fg) hover:border-(--ds-fg)"
              }`}
            >
              <Filter className="size-4" aria-hidden />
              Filtros
              {selectedTags.length > 0 && (
                <span className="bg-(--ds-accent) px-2 py-0.5 text-xs tabular-nums text-(--ds-on-accent)">
                  {selectedTags.length}
                  <span className="sr-only"> seleccionados</span>
                </span>
              )}
            </button>
          )}
        </div>

        {/* Panel de etiquetas */}
        {showFilters && allTags.length > 0 && (
          <div id={filtersId} className="mt-3 border border-(--ds-border) bg-(--ds-card) p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-medium uppercase tracking-wider text-(--ds-muted-fg)">
                Filtrar por categorías
              </h2>
              {selectedTags.length > 0 && (
                <button type="button" onClick={() => setSelectedTags([])} className={`${textLink} text-sm`}>
                  Limpiar etiquetas
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={active}
                    className={`inline-flex min-h-11 cursor-pointer items-center border px-3 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                      active
                        ? "border-(--ds-fg) bg-(--ds-fg) text-(--ds-bg)"
                        : "border-(--ds-border) bg-(--ds-bg) text-(--ds-fg) hover:border-(--ds-fg)"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Resultados y filtros activos */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-(--ds-muted-fg)">
            <p aria-live="polite" className="tabular-nums">
              {count} artículo{count !== 1 ? "s" : ""}
            </p>
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className={`${textLink} text-sm`}>
                <X className="size-4" aria-hidden />
                Limpiar filtros
              </button>
            )}
          </div>

          {selectedTags.length > 0 && (
            <ul className="flex flex-wrap items-center gap-2" aria-label="Etiquetas seleccionadas">
              {selectedTags.map((tag) => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex min-h-11 cursor-pointer items-center gap-1 border border-(--ds-fg) px-3 text-sm text-(--ds-fg) transition-colors duration-200 hover:bg-(--ds-fg) hover:text-(--ds-bg) ${focusRing}`}
                  >
                    #{tag}
                    <X className="size-3.5" aria-hidden />
                    <span className="sr-only">Quitar etiqueta</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lista de artículos */}
      {count === 0 ? (
        <div className="mt-8 border border-(--ds-border) bg-(--ds-card) px-6 py-16 text-center">
          <BookOpen className="mx-auto size-10 text-(--ds-primary)" aria-hidden />
          {hasActiveFilters ? (
            <>
              <h2 className={`${heading} mt-6 text-2xl font-semibold`}>No se encontraron artículos</h2>
              <p className="mt-2 text-(--ds-muted-fg)">Prueba a ajustar la búsqueda o los filtros.</p>
              <button type="button" onClick={clearFilters} className={`${ctaAccent} mt-8`}>
                <X className="size-4" aria-hidden />
                Limpiar filtros
              </button>
            </>
          ) : (
            <>
              <h2 className={`${heading} mt-6 text-2xl font-semibold`}>Todavía no hay artículos publicados</h2>
              <p className="mt-2 text-(--ds-muted-fg)">Vuelve pronto para ver contenido nuevo.</p>
            </>
          )}
        </div>
      ) : (
        <ul className="mt-8 grid gap-px border border-(--ds-border) bg-(--ds-border) sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedPosts.map((post, index) => (
            <li key={post.id} className="bg-(--ds-card)">
              <article className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group flex h-full cursor-pointer flex-col transition-colors duration-200 hover:bg-(--ds-muted) ${focusRing}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-(--ds-border) bg-(--ds-muted)">
                    <SafeImage
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full object-cover"
                      priority={index < 3}
                      quality={75}
                      placeholder="blur"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {post.tags.length > 0 && (
                      <p className="flex flex-wrap gap-x-3 text-xs font-semibold uppercase tracking-wider text-(--ds-primary-text)">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </p>
                    )}

                    <h2
                      className={`${heading} mt-3 line-clamp-2 text-xl font-semibold tracking-tight text-balance group-hover:underline group-hover:decoration-(--ds-primary) group-hover:underline-offset-4`}
                    >
                      {post.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-(--ds-muted-fg)">{post.excerpt}</p>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-(--ds-border) pt-4 text-sm text-(--ds-muted-fg)">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-4" aria-hidden />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <Clock className="size-4" aria-hidden />
                        {estimateReadTime(post.content)} min
                        <span className="sr-only">de lectura</span>
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-(--ds-fg)">
                      Leer el artículo
                      <ArrowRight
                        className="size-4 text-(--ds-primary) transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
