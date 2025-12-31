"use client";

import type { QuickActionProps } from "./types";

export function QuickAction({ label, icon: Icon, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl bg-[#F9F8F6] hover:bg-[#1A1818] hover:text-white transition-all duration-200 text-left group w-full"
    >
      <Icon className="w-5 h-5 text-[#6F6B65] group-hover:text-white transition-colors" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
