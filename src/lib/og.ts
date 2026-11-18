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

/**
 * openGraph y twitter de una página. Repiten los campos del layout raíz
 * (siteName, locale, type, imagen, creator) porque el objeto de la página no
 * se mezcla con el del layout: lo reemplaza. El twitter también hace falta:
 * sin él la tarjeta de X heredaba el título y la descripción del home.
 */
export function pageSocial(page: { title: string; description: string; url: string }): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      siteName: "FireforgeRD",
      locale: "es_DO",
      type: "website",
      images: [defaultOgImage],
      ...page,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@fireforgerd",
      title: page.title,
      description: page.description,
      images: [defaultOgImage],
    },
  };
}
