// Tipos compartidos para el módulo admin

export type TabId = "dashboard" | "blog" | "clients" | "leads";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "green" | "orange" | "purple";
}

export interface QuickActionProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export interface DashboardStats {
  posts: number;
  clients: number;
  leads: number;
  diagnostics: number;
}
