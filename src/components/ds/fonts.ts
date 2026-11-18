import localFont from "next/font/local";

// Tipografía del sistema de diseño (ui-ux-pro-max): Outfit para titulares y
// Work Sans para el texto.
//
// Se sirven desde el repo (next/font/local) y no con next/font/google: la
// descarga desde Google fallaba de forma intermitente, y cuando el bundle del
// servidor y el del cliente compilaban uno con la fuente real y otro con la de
// reserva, el hash de la clase no coincidía y la hidratación fallaba. Archivos:
// variables (un solo woff2 por familia), subset latin, licencia SIL OFL.
export const outfit = localFont({
  src: "./fonts/Outfit-latin.woff2",
  weight: "400 700",
  variable: "--ds-font-heading",
  display: "swap",
});

export const workSans = localFont({
  src: "./fonts/WorkSans-latin.woff2",
  weight: "400 600",
  variable: "--ds-font-body",
  display: "swap",
});

/**
 * Clases que activan el sistema de diseño en un subárbol: tokens de color
 * (.ds en globals.css), variables de fuente y Work Sans como fuente base.
 * Se aplica por subárbol y no en <body> porque el panel de administración
 * sigue con el diseño anterior (Inter + Fraunces).
 */
export const dsRoot = `ds ${outfit.variable} ${workSans.variable} ${workSans.className} text-(--ds-fg) antialiased`;
