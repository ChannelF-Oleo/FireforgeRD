// Navegación del sitio con el sistema de diseño nuevo. Las secciones del home
// van como "/#id" para que funcionen también desde /blog, /diagnostico, etc.
export const siteNav = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#precios", label: "Precios" },
  { href: "/#subservicios", label: "Subservicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/blog", label: "Blog" },
] as const;

export const contactHref = "/contacto";
export const whatsappHref = "https://wa.me/18498534067";
export const email = "hola@fireforgerd.com";
export const instagramHref = "https://www.instagram.com/fireforgerd/";
