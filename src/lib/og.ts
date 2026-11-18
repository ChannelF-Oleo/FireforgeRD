import type { Metadata } from "next";

export const OG_IMAGE_ALT =
  "FireforgeRD — Desarrollo web, tiendas online y software a medida en República Dominicana";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * Imagen general para compartir (la genera src/app/opengraph-image.tsx).
 *
 * Next solo añade esa imagen en el layout raíz: si una página define su propio
 * `openGraph` o `twitter`, el objeto entero reemplaza al del layout y la imagen
 * se pierde. Por eso cada página la declara de forma explícita.
 */
export const defaultOgImage = { url: "/opengraph-image", ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT };

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * openGraph de una página. Repite los campos del layout raíz (siteName, locale,
 * type, imagen) porque el de la página no se mezcla con el del layout: lo
 * reemplaza.
 */
export function pageOpenGraph(og: { title: string; description: string; url: string }): OpenGraph {
  return {
    siteName: "FireforgeRD",
    locale: "es_DO",
    type: "website",
    images: [defaultOgImage],
    ...og,
  };
}
