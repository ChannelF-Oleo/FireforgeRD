"use client";

import type { StatCardProps } from "./types";

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
} as const;

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-[#1A1818]/5 p-5 transition-shadow hover:shadow-sm">
      <div
        className={`w-10 h-10 rounded-xl ${colorStyles[color]} flex items-center justify-center mb-3`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-display font-medium text-[#1A1818]">
        {value}
      </p>
      <p className="text-sm text-[#6F6B65]">{label}</p>
    </article>
  );
}
