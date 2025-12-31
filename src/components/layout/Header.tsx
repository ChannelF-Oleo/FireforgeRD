"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FireLogo } from "@/components/ui/animated-logo";
import { MobileMenu } from "./mobile-menu";
import { scrollToElement } from "@/lib/utils";
import { styles } from "./header.styles";

const navItems = [
  { id: "servicios", label: "Servicios", type: "scroll" },
  { id: "precios", label: "Precios", type: "scroll" },
  {
    id: "diagnostico",
    label: "Diagnóstico",
    type: "link",
    href: "/diagnostico",
  },
  { id: "clientes", label: "Clientes", type: "link", href: "/clientes" },
  { id: "blog", label: "Blog", type: "link", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsMobileOpen(false);
    setActiveSection(sectionId);

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToElement(sectionId);
    }
  }, []);

  return (
    <>
      <header className={styles.header(isScrolled)}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {/* LOGO */}
            <Link href="/">
              <motion.div
                className={styles.logoContainer}
                whileHover="hover"
                initial="idle"
              >
                <div className={styles.logoIcon}>
                  <FireLogo className="w-9 h-9 md:w-10 md:h-10" />
                </div>
                <span className={styles.logoText}>FireforgeRD</span>
              </motion.div>
            </Link>

            {/* NAVEGACIÓN */}
            <nav className={styles.nav}>
              {navItems.map((item) => {
                const isActive =
                  item.type === "link"
                    ? pathname === item.href
                    : activeSection === item.id;

                if (item.type === "link") {
                  return (
                    <Link
                      key={item.id}
                      href={item.href!}
                      className={styles.navLink(isActive)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                // Para scroll items, solo mostrar en home
                if (!isHomePage) {
                  return (
                    <Link
                      key={item.id}
                      href={`/#${item.id}`}
                      className={styles.navLink(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={styles.navLink(isActive)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* ACCIONES */}
            <div className={styles.actions}>
              <Link href="/contacto">
                <Button size="default" className={styles.ctaButton}>
                  Hablemos
                </Button>
              </Link>

              {/* Menú Móvil */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={styles.mobileToggle}
                aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <MobileMenu
            onClose={() => setIsMobileOpen(false)}
            onNavClick={handleNavClick}
            isHomePage={isHomePage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
