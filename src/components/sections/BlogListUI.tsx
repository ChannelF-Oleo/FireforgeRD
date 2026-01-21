"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  SortAsc,
  SortDesc
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { BlogPost } from "@/types";

interface BlogListUIProps {
  initialPosts: BlogPost[];
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

export function BlogListUI({ initialPosts }: BlogListUIProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

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
      
      return new Intl.DateTimeFormat("es-DO", {
        day: "numeric",
        month: "long",
        year: "numeric",
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

  return (
    <>
      {/* Herramienta de Filtrado Avanzada */}
      <div className="mb-8">
        {/* Barra de búsqueda y controles principales */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890]" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none text-sm placeholder:text-[#9C9890]"
            />
          </div>

          {/* Ordenamiento */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none text-sm font-medium text-[#1A1818] cursor-pointer"
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="title-asc">Título A-Z</option>
              <option value="title-desc">Título Z-A</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890] pointer-events-none" />
          </div>

          {/* Toggle filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              showFilters || selectedTags.length > 0
                ? "bg-[#1A1818] text-white"
                : "bg-[#F9F8F6] text-[#5C5850] hover:bg-[#1A1818]/5"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
            {selectedTags.length > 0 && (
              <span className="bg-[#FF4D00] text-white text-xs px-2 py-0.5 rounded-full">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>

        {/* Panel de filtros expandible */}
        <AnimatePresence>
          {showFilters && allTags.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-[#F9F8F6] rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-[#1A1818] text-sm">Filtrar por categorías</h3>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-[#FF4D00] hover:text-[#FF4D00]/80 font-medium"
                    >
                      Limpiar tags
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-[#1A1818] text-white"
                          : "bg-white text-[#5C5850] hover:bg-[#1A1818]/5 border border-[#1A1818]/10"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtros activos y resultados */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-sm text-[#5C5850]">
            <span>{filteredAndSortedPosts.length} artículo{filteredAndSortedPosts.length !== 1 ? 's' : ''}</span>
            {hasActiveFilters && (
              <>
                <span>•</span>
                <button
                  onClick={clearFilters}
                  className="text-[#FF4D00] hover:text-[#FF4D00]/80 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Limpiar filtros
                </button>
              </>
            )}
          </div>

          {/* Tags seleccionados */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#1A1818] text-white text-xs rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredAndSortedPosts.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-16 h-16 text-[#9C9890] mx-auto mb-4" />
          {hasActiveFilters ? (
            <>
              <p className="text-[#5C5850] text-lg mb-2">
                No se encontraron artículos
              </p>
              <p className="text-[#9C9890] text-sm mb-4">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00]/90 transition-colors"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
            </>
          ) : (
            <>
              <p className="text-[#5C5850] text-lg">
                No hay artículos publicados aún.
              </p>
              <p className="text-[#9C9890] text-sm mt-2">
                Vuelve pronto para ver nuevo contenido.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.map((post, index) => (
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
                    <SafeImage
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                      quality={75}
                      placeholder="blur"
                    />
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
