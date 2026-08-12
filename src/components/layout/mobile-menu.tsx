"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame } from "lucide-react";
import {
  navItems,
  contactNavItem,
  CONTACT_LABEL_MOBILE_MENU,
  type NavItem,
} from "@/lib/nav-items";

interface MobileMenuProps {
  onClose: () => void;
  onNavClick: (id: string) => void;
  isHomePage?: boolean;
}

// La navegación viene de @/lib/nav-items; acá solo se agrega el contacto al
// final con su label propio y marcado como acción destacada del menú.
const menuItems: (NavItem & { highlight?: boolean })[] = [
  ...navItems,
  { ...contactNavItem, label: CONTACT_LABEL_MOBILE_MENU, highlight: true },
];

export function MobileMenu({
  onClose,
  onNavClick,
  isHomePage = true,
}: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 pt-24 px-6 bg-[#F9F8F6]/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-start"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Luz ambiental */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-[rgba(255,77,0,0.06)] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col w-full max-w-sm space-y-3 relative z-10">
        {menuItems.map((item, idx) => {
          const baseClasses = `
            w-full py-4 text-base font-medium rounded-2xl transition-all duration-300 text-center cursor-pointer
            ${
              item.highlight
                ? "bg-[#FF4D00] text-white shadow-[0_4px_20px_rgba(255,77,0,0.3)] hover:bg-[#E64500] active:scale-[0.98]"
                : "bg-white/70 backdrop-blur-sm border border-[#1A1818]/5 text-[#1A1818] hover:border-[#FF4D00]/20 hover:shadow-[0_4px_20px_rgba(255,77,0,0.08)] active:scale-[0.98]"
            }
          `;

          if (item.type === "link") {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block ${baseClasses}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          }

          // Scroll items
          const href = isHomePage ? undefined : `/#${item.id}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {isHomePage ? (
                <button
                  onClick={() => onNavClick(item.id)}
                  className={baseClasses}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={href!}
                  onClick={onClose}
                  className={`block ${baseClasses}`}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detalle técnico */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-10 flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] uppercase text-[#9C9890]"
      >
        <Flame className="w-3.5 h-3.5 text-[#FF4D00]" aria-hidden="true" />
        Ingeniería Premium
      </motion.p>
    </motion.div>
  );
}
