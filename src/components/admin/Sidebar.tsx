"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Flame,
} from "lucide-react";
import type { TabId } from "./types";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "leads", label: "Leads", icon: MessageSquare },
];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#1A1818]/5 
          transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Logo - Solo desktop */}
        <div className="p-6 border-b border-[#1A1818]/5 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1818] text-[#FF4D00] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-medium text-[#1A1818]">
                FireforgeRD
              </h1>
              <p className="text-xs text-[#6F6B65]">Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium 
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#1A1818] text-white shadow-sm"
                      : "text-[#6F6B65] hover:bg-[#F9F8F6] hover:text-[#1A1818]"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1A1818]/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
