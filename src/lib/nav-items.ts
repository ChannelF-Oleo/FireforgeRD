/**
 * Fuente única de verdad de la navegación pública.
 *
 * Antes había tres arrays duplicados (Header, mobile-menu y Footer) con
 * labels que no coincidían entre sí: "Diagnóstico" vs "Diagnóstico Gratis",
 * "Precios" vs "Planes y Precios", "Clientes" vs "Nuestros Clientes".
 *
 * - type "scroll": la sección solo existe en el home; se resuelve con
 *   useScrollToSection() (scroll en "/", navegación a /#id fuera del home).
 * - type "link": ruta propia de la app.
 */

export type ScrollNavItem = {
  id: string;
  label: string;
  type: "scroll";
};

export type LinkNavItem = {
  id: string;
  label: string;
  type: "link";
  href: string;
};

export type NavItem = ScrollNavItem | LinkNavItem;

/** Navegación principal, en orden de aparición. */
export const navItems: NavItem[] = [
  { id: "servicios", label: "Servicios", type: "scroll" },
  { id: "precios", label: "Precios", type: "scroll" },
  {
    id: "diagnostico",
    label: "Diagnóstico Gratis",
    type: "link",
    href: "/diagnostico",
  },
  { id: "clientes", label: "Clientes", type: "link", href: "/clientes" },
  { id: "blog", label: "Blog", type: "link", href: "/blog" },
];

/**
 * El contacto se trata aparte porque no es un item de nav más: en cada
 * superficie es la acción principal y se renderiza distinto (botón sólido en
 * el header, item destacado en el menú móvil, link normal en el footer).
 */
export const contactNavItem: LinkNavItem = {
  id: "contact",
  label: "Contacto",
  type: "link",
  href: "/contacto",
};

/**
 * Overrides de label por superficie.
 * Son variantes de copy intencionales, no duplicación: por eso viven acá
 * junto al item canónico y no como arrays paralelos en cada componente.
 */
export const CONTACT_LABEL_HEADER = "Hablemos";
export const CONTACT_LABEL_MOBILE_MENU = "Contactar";
export const CLIENTS_LABEL_FOOTER = "Nuestros Clientes";

/** Links del bloque "Explorar" del footer: las rutas propias + contacto. */
export const footerExploreItems: LinkNavItem[] = [
  ...navItems
    .filter((item): item is LinkNavItem => item.type === "link")
    .map((item) =>
      item.id === "clientes"
        ? { ...item, label: CLIENTS_LABEL_FOOTER }
        : item,
    ),
  contactNavItem,
];
