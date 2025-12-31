"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FileText,
  Users,
  MessageSquare,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { QuickAction } from "./QuickAction";
import type { TabId, DashboardStats } from "./types";

interface DashboardOverviewProps {
  onNavigate: (tab: TabId) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [stats, setStats] = useState<DashboardStats>({
    posts: 0,
    clients: 0,
    leads: 0,
    diagnostics: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsSnap, clientsSnap, leadsSnap, quizSnap] = await Promise.all(
          [
            getDocs(collection(db, "blog_posts")),
            getDocs(collection(db, "clients")),
            getDocs(
              query(collection(db, "leads"), where("status", "==", "nuevo")),
            ),
            getDocs(collection(db, "quiz_results")),
          ],
        );

        setStats({
          posts: postsSnap.size,
          clients: clientsSnap.size,
          leads: leadsSnap.size,
          diagnostics: quizSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-[#1A1818] mb-6">
        Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Posts del Blog"
          value={stats.posts}
          icon={FileText}
          color="blue"
        />
        <StatCard
          label="Clientes"
          value={stats.clients}
          icon={Users}
          color="green"
        />
        <StatCard
          label="Leads Nuevos"
          value={stats.leads}
          icon={MessageSquare}
          color="orange"
        />
        <StatCard
          label="Diagnósticos"
          value={stats.diagnostics}
          icon={LayoutDashboard}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#1A1818]/5 p-6">
        <h3 className="font-medium text-[#1A1818] mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QuickAction
            label="Nuevo Post"
            icon={FileText}
            onClick={() => onNavigate("blog")}
          />
          <QuickAction
            label="Agregar Cliente"
            icon={Users}
            onClick={() => onNavigate("clients")}
          />
          <QuickAction
            label="Ver Leads"
            icon={MessageSquare}
            onClick={() => onNavigate("leads")}
          />
        </div>
      </div>
    </div>
  );
}
