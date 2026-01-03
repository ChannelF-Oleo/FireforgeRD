"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Save,
  X,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { RichTextEditor } from "./RichTextEditor";
import type { BlogPost } from "@/types";

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "blog_posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as BlogPost[];
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPost?.title || !editingPost?.content) return;
    setSaving(true);

    try {
      const slug =
        editingPost.slug ||
        editingPost.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const postData = {
        title: editingPost.title,
        slug,
        excerpt: editingPost.excerpt || "",
        content: editingPost.content,
        coverImage: editingPost.coverImage || "",
        author: editingPost.author || "FireforgeRD",
        tags: editingPost.tags || [],
        published: editingPost.published ?? false,
        updatedAt: Timestamp.now(),
      };

      if (editingPost.id) {
        await updateDoc(doc(db, "blog_posts", editingPost.id), postData);
      } else {
        await addDoc(collection(db, "blog_posts"), {
          ...postData,
          createdAt: Timestamp.now(),
        });
      }

      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;
    try {
      await deleteDoc(doc(db, "blog_posts", id));
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      await updateDoc(doc(db, "blog_posts", post.id), {
        published: !post.published,
        updatedAt: Timestamp.now(),
      });
      fetchPosts();
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-DO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-medium text-[#1A1818]">
          Blog Posts
        </h2>
        <button
          onClick={() => setEditingPost({ published: false, tags: [] })}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1818] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00] transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Nuevo Post
        </button>
      </div>

      {/* Editor Modal - Fullscreen en móvil */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#1A1818]/5 p-3 sm:p-4 flex items-center justify-between z-10">
              <h3 className="font-medium text-[#1A1818] text-sm sm:text-base">
                {editingPost.id ? "Editar Post" : "Nuevo Post"}
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 hover:bg-[#F9F8F6] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={editingPost.title || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none text-sm sm:text-base"
                  placeholder="Título del post"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Extracto
                </label>
                <textarea
                  value={editingPost.excerpt || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none resize-none text-sm sm:text-base"
                  rows={2}
                  placeholder="Breve descripción para SEO y previews"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Contenido
                </label>
                <RichTextEditor
                  value={editingPost.content || ""}
                  onChange={(content) =>
                    setEditingPost({ ...editingPost, content })
                  }
                  placeholder="Escribe el contenido de tu artículo..."
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ImageUpload
                  value={editingPost.coverImage || ""}
                  onChange={(url) =>
                    setEditingPost({ ...editingPost, coverImage: url })
                  }
                  folder="blog"
                  label="Imagen de Portada"
                />
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                      Tags (separados por coma)
                    </label>
                    <input
                      type="text"
                      value={(editingPost.tags || []).join(", ")}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          tags: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none text-sm"
                      placeholder="web, tecnología, tips"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={editingPost.author || "FireforgeRD"}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, author: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingPost.published || false}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      published: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-[#1A1818]/20 text-[#FF4D00] focus:ring-[#FF4D00]"
                />
                <label htmlFor="published" className="text-sm text-[#1A1818]">
                  Publicar inmediatamente
                </label>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="sticky bottom-0 bg-white border-t border-[#1A1818]/5 p-3 sm:p-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2.5 text-sm font-medium text-[#6F6B65] hover:text-[#1A1818] order-2 sm:order-1"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingPost.title || !editingPost.content}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1A1818] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00] transition-colors disabled:opacity-50 order-1 sm:order-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-2xl border border-[#1A1818]/5 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-[#6F6B65]">
            <p className="mb-2">No hay posts aún.</p>
            <p className="text-sm">Crea tu primer artículo para el blog.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1A1818]/5">
            {posts.map((post) => (
              <div key={post.id} className="p-3 sm:p-4">
                {/* Mobile & Desktop Layout */}
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Cover thumbnail - hidden on very small screens */}
                  {post.coverImage && (
                    <div className="hidden sm:block w-16 h-16 rounded-lg bg-[#F9F8F6] overflow-hidden flex-shrink-0">
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-[#1A1818] text-sm sm:text-base line-clamp-1">
                        {post.title}
                      </h3>
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? "bg-green-50 text-green-600"
                            : "bg-[#F9F8F6] text-[#9C9890]"
                        }`}
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6F6B65] line-clamp-1 mt-1">
                      {post.excerpt || "Sin extracto"}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#9C9890]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.createdAt)}
                      </span>
                      {post.tags?.length > 0 && (
                        <span className="hidden sm:inline">
                          {post.tags.slice(0, 2).join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions - Responsive */}
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#1A1818]/5 sm:border-0 sm:pt-0 sm:mt-2">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 p-2 rounded-lg text-[#6F6B65] bg-[#F9F8F6] hover:bg-[#1A1818]/5 text-xs sm:text-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="sm:hidden">Ver</span>
                    </a>
                  )}
                  <button
                    onClick={() => togglePublish(post)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs sm:text-sm ${
                      post.published
                        ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                        : "text-green-600 bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    {post.published ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="sm:hidden">Ocultar</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span className="sm:hidden">Publicar</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 p-2 rounded-lg text-[#6F6B65] bg-[#F9F8F6] hover:bg-[#1A1818]/5 text-xs sm:text-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="sm:hidden">Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg text-red-500 bg-red-50 hover:bg-red-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
