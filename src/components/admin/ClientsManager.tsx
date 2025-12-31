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
  Star,
  Loader2,
  Save,
  X,
  ExternalLink,
} from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import type { Client } from "@/types";

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Partial<Client> | null>(
    null,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsRef = collection(db, "clients");
      const q = query(clientsRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Client[];
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingClient?.name) return;
    setSaving(true);

    try {
      const clientData = {
        name: editingClient.name,
        tag: editingClient.tag || "",
        description: editingClient.description || "",
        image: editingClient.image || "",
        websiteUrl: editingClient.websiteUrl || "",
        category: editingClient.category || "web",
        featured: editingClient.featured ?? false,
        order: editingClient.order ?? clients.length,
      };

      if (editingClient.id) {
        await updateDoc(doc(db, "clients", editingClient.id), clientData);
      } else {
        await addDoc(collection(db, "clients"), {
          ...clientData,
          createdAt: Timestamp.now(),
        });
      }

      setEditingClient(null);
      fetchClients();
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este cliente?")) return;
    try {
      await deleteDoc(doc(db, "clients", id));
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const toggleFeatured = async (client: Client) => {
    try {
      await updateDoc(doc(db, "clients", client.id), {
        featured: !client.featured,
      });
      fetchClients();
    } catch (error) {
      console.error("Error toggling featured:", error);
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
          Clientes / Portafolio
        </h2>
        <button
          onClick={() =>
            setEditingClient({ featured: false, order: clients.length })
          }
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1818] text-white rounded-xl text-sm font-medium hover:bg-[#FF4D00] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>

      {/* Editor Modal */}
      {editingClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#1A1818]/5 p-4 flex items-center justify-between">
              <h3 className="font-medium text-[#1A1818]">
                {editingClient.id ? "Editar Cliente" : "Nuevo Cliente"}
              </h3>
              <button
                onClick={() => setEditingClient(null)}
                className="p-2 hover:bg-[#F9F8F6] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editingClient.name || ""}
                  onChange={(e) =>
                    setEditingClient({ ...editingClient, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                  placeholder="Nombre del cliente/proyecto"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Tag / Etiqueta
                </label>
                <input
                  type="text"
                  value={editingClient.tag || ""}
                  onChange={(e) =>
                    setEditingClient({ ...editingClient, tag: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                  placeholder="Ej: E-commerce, Landing Page, Sistema Web"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Descripción
                </label>
                <textarea
                  value={editingClient.description || ""}
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none resize-none"
                  rows={3}
                  placeholder="Breve descripción del proyecto"
                />
              </div>

              <ImageUpload
                value={editingClient.image || ""}
                onChange={(url) =>
                  setEditingClient({ ...editingClient, image: url })
                }
                folder="clients"
                label="Foto del Cliente"
              />

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  URL del Sitio
                </label>
                <input
                  type="text"
                  value={editingClient.websiteUrl || ""}
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      websiteUrl: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                  placeholder="https://cliente.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                    Categoría
                  </label>
                  <select
                    value={editingClient.category || "web"}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                  >
                    <option value="web">Sitio Web</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="sistema">Sistema</option>
                    <option value="chatbot">Chatbot</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={editingClient.order ?? 0}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        order: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:border-[#FF4D00]/30 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingClient.featured || false}
                  onChange={(e) =>
                    setEditingClient({
                      ...editingClient,
                      featured: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-[#1A1818]/20"
                />
                <label htmlFor="featured" className="text-sm text-[#1A1818]">
                  Destacar en portafolio
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#1A1818]/5 p-4 flex justify-end gap-3">
              <button
                onClick={() => setEditingClient(null)}
                className="px-4 py-2 text-sm font-medium text-[#6F6B65] hover:text-[#1A1818]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editingClient.name}
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

      {/* Clients List */}
      <div className="bg-white rounded-2xl border border-[#1A1818]/5 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-12 text-center text-[#6F6B65]">
            No hay clientes aún. Agrega el primero.
          </div>
        ) : (
          <div className="divide-y divide-[#1A1818]/5">
            {clients.map((client) => (
              <div key={client.id} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F9F8F6] overflow-hidden flex-shrink-0">
                  {client.image && (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#1A1818] truncate">
                    {client.name}
                  </h3>
                  <p className="text-sm text-[#6F6B65]">
                    {client.tag || client.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {client.websiteUrl && (
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-[#6F6B65] hover:bg-[#F9F8F6]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => toggleFeatured(client)}
                    className={`p-2 rounded-lg ${client.featured ? "text-yellow-500 bg-yellow-50" : "text-[#9C9890] bg-[#F9F8F6]"}`}
                  >
                    <Star
                      className="w-4 h-4"
                      fill={client.featured ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => setEditingClient(client)}
                    className="p-2 rounded-lg text-[#6F6B65] hover:bg-[#F9F8F6]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
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
