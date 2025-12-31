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
} from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import type { BlogPost } from "@/types";

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(
    null,
  );
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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-medium text-[#1A1818]">
          Blog Posts
        </h2>
        <button
          onClick={() => setEditingPost({ published: false, tags: [] })}
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1818] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Post
        </button>
      </div>

      {/* Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#1A1818]/5 p-4 flex items-center justify-between">
              <h3 className="font-medium text-[#1A1818]">
                {editingPost.id ? "Editar Post" : "Nuevo Post"}
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 hover:bg-[#F9F8F6] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
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
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
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
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none resize-none"
                  rows={2}
                  placeholder="Breve descripción"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Contenido (Markdown)
                </label>
                <textarea
                  value={editingPost.content || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none resize-none font-mono text-sm"
                  rows={12}
                  placeholder="Escribe el contenido en Markdown..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload
                  value={editingPost.coverImage || ""}
                  onChange={(url) =>
                    setEditingPost({ ...editingPost, coverImage: url })
                  }
                  folder="blog"
                  label="Imagen de Portada"
                />
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
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                    placeholder="web, tecnología, tips"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
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
                  className="w-4 h-4 rounded border-[#1A1818]/20"
                />
                <label htmlFor="published" className="text-sm text-[#1A1818]">
                  Publicar inmediatamente
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#1A1818]/5 p-4 flex justify-end gap-3">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-sm font-medium text-[#6F6B65] hover:text-[#1A1818]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingPost.title || !editingPost.content}
                className="flex items-center gap-2 px-4 py-2 bg-[#1A1818] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00] transition-colors disabled:opacity-50"
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
          <div className="p-12 text-center text-[#6F6B65]">
            No hay posts aún. Crea el primero.
          </div>
        ) : (
          <div className="divide-y divide-[#1A1818]/5">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#1A1818] truncate">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6F6B65] truncate">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(post)}
                    className={`p-2 rounded-lg ${post.published ? "text-green-600 bg-green-50" : "text-[#9C9890] bg-[#F9F8F6]"}`}
                    title={post.published ? "Publicado" : "Borrador"}
                  >
                    {post.published ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 rounded-lg text-[#6F6B65] hover:bg-[#F9F8F6]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
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
