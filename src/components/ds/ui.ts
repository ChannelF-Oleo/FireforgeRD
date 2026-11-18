// Piezas de estilo compartidas del sistema de diseño (estilo Swiss: radio 0,
// sin sombras, bordes de 1px, un solo acento). Colores solo por tokens --ds-*.

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ds-ring)";

export const ctaAccent = `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-(--ds-accent) px-6 py-3 font-medium text-(--ds-on-accent) transition-colors duration-200 hover:bg-(--ds-accent-hover) ${focusRing}`;

export const ctaSecondary = `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border border-(--ds-fg) px-6 py-3 font-medium text-(--ds-fg) transition-colors duration-200 hover:bg-(--ds-fg) hover:text-(--ds-bg) ${focusRing}`;

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export const heading = "font-(family-name:--ds-font-heading)";

export const usd = (n: number) => `US$${n.toLocaleString("en-US")}`;
