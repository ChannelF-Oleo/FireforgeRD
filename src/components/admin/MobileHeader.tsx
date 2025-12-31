"use client";

import { Menu, X, Flame } from "lucide-react";

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function MobileHeader({
  isSidebarOpen,
  onToggleSidebar,
}: MobileHeaderProps) {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[#1A1818]/5 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <Flame className="w-6 h-6 text-[#FF4D00]" />
        <span className="font-display font-medium text-[#1A1818]">Admin</span>
      </div>
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-[#F9F8F6] rounded-lg transition-colors"
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-[#1A1818]" />
        ) : (
          <Menu className="w-5 h-5 text-[#1A1818]" />
        )}
      </button>
    </header>
  );
}
