"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Loader2,
  CheckCircle,
  Clock,
  UserCheck,
} from "lucide-react";
import type { ContactSubmission } from "@/types";

type LeadStatus = "nuevo" | "contactado" | "convertido";

const statusConfig: Record<LeadStatus, { label: string; color: string; icon: any }> = {
  nuevo: { label: "Nuevo", color: "bg-blue-50 text-blue-600", icon: Clock },
  contactado: { label: "Contactado", color: "bg-yellow-50 text-yellow-600", icon: CheckCircle },
  convertido: { label: "Convertido", color: "bg-green-50 text-green-600", icon: UserCheck },
};

export function LeadsManager() {
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const leadsRef = collection(db, "leads");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as ContactSubmission[];
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    try {
      await updateDoc(doc(db, "leads", id), { status });
      fetchLeads();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredLeads = filter === "todos" 
    ? leads 
    : leads.filter(l => l.status === filter);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-DO", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-medium text-[#1A1818]">
          Leads / Contactos
        </h2>
        <div className="flex items-center gap-2">
          {(["todos", "nuevo", "contactado", "convertido"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? "bg-[#1A1818] text-white"
                  : "bg-[#F9F8F6] text-[#6F6B65] hover:bg-[#1A1818]/5"
              }`}
            >
              {status === "todos" ? "Todos" : statusConfig[status].label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-2xl font-display font-medium text-blue-600">
            {leads.filter(l => l.status === "nuevo").length}
          </p>
          <p className="text-sm text-blue-600/70">Nuevos</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-2xl font-display font-medium text-yellow-600">
            {leads.filter(l => l.status === "contactado").length}
          </p>
          <p className="text-sm text-yellow-600/70">Contactados</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-2xl font-display font-medium text-green-600">
            {leads.filter(l => l.status === "convertido").length}
          </p>
          <p className="text-sm text-green-600/70">Convertidos</p>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-2xl border border-[#1A1818]/5 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-[#6F6B65]">
            No hay leads {filter !== "todos" ? `con estado "${statusConfig[filter as LeadStatus].label}"` : ""}.
          </div>
        ) : (
          <div className="divide-y divide-[#1A1818]/5">
            {filteredLeads.map((lead) => {
              const StatusIcon = statusConfig[lead.status || "nuevo"].icon;
              return (
                <div key={lead.id} className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-medium text-[#1A1818]">{lead.clientName}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#6F6B65] mt-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{lead.companyName}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[lead.status || "nuevo"].color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig[lead.status || "nuevo"].label}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-[#6F6B65] mb-3">
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-[#FF4D00]">
                      <Mail className="w-3.5 h-3.5" />
                      {lead.email}
                    </a>
                    <a href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`} target="_blank" className="flex items-center gap-1.5 hover:text-[#FF4D00]">
                      <Phone className="w-3.5 h-3.5" />
                      {lead.whatsapp}
                    </a>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-[#F9F8F6] rounded text-xs font-medium text-[#1A1818]">
                      {lead.serviceType}
                    </span>
                    {lead.plan && (
                      <span className="px-2 py-0.5 bg-[#FF4D00]/10 rounded text-xs font-medium text-[#FF4D00]">
                        {lead.plan}
                      </span>
                    )}
                  </div>

                  {lead.notes && (
                    <p className="text-sm text-[#6F6B65] bg-[#F9F8F6] rounded-lg p-3 mb-3">
                      {lead.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#9C9890]">Cambiar estado:</span>
                    {(["nuevo", "contactado", "convertido"] as LeadStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(lead.id, status)}
                        disabled={lead.status === status}
                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                          lead.status === status
                            ? "bg-[#1A1818] text-white"
                            : "bg-[#F9F8F6] text-[#6F6B65] hover:bg-[#1A1818]/10"
                        }`}
                      >
                        {statusConfig[status].label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
