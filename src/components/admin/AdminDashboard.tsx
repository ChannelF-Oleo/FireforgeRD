"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { DashboardOverview } from "./DashboardOverview";
import { BlogManager } from "./BlogManager";
import { ClientsManager } from "./ClientsManager";
import { LeadsManager } from "./LeadsManager";
import type { TabId } from "./types";

const VALID_TABS: TabId[] = ["dashboard", "blog", "clients", "leads"];
const DEFAULT_TAB: TabId = "dashboard";

function isValidTab(tab: string | null): tab is TabId {
  return tab !== null && VALID_TABS.includes(tab as TabId);
}

export function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtener tab de la URL o usar default
  const tabParam = searchParams.get("tab");
  const activeTab: TabId = isValidTab(tabParam) ? tabParam : DEFAULT_TAB;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cerrar sidebar en resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar sidebar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  // Cambiar tab actualizando la URL
  const handleTabChange = useCallback(
    (tab: TabId) => {
      const params = new URLSearchParams(searchParams.toString());

      if (tab === DEFAULT_TAB) {
        params.delete("tab");
      } else {
        params.set("tab", tab);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Renderizar contenido según tab activo
  const renderContent = () => {
    switch (activeTab) {
      case "blog":
        return <BlogManager />;
      case "clients":
        return <ClientsManager />;
      case "leads":
        return <LeadsManager />;
      case "dashboard":
      default:
        return <DashboardOverview onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Mobile Header */}
      <MobileHeader
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-65px)] lg:min-h-screen overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
