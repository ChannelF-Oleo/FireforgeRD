/**
 * URLs del blog corregidas.
 *
 * El admin generaba el slug quitando cualquier carácter fuera de a-z0-9, así
 * que las tildes y la ñ se convertían en guiones ("página" → "p-gina"). Los
 * artículos publicados antes de la corrección conservan ese slug en Firestore.
 *
 * Este mapa (slug guardado → slug público) hace que el sitio use siempre la
 * URL limpia: la página del artículo redirige la vieja con un 308, el listado y el
 * sitemap enlazan la nueva y la página del artículo la acepta aunque Firestore
 * aún tenga la vieja. Si algún día se actualizan los slugs en Firestore, el
 * mapa sigue siendo válido (solo quedarían las redirecciones).
 */
export const blogSlugRenames: Record<string, string> = {
  "p-gina-web-vs-redes-sociales-por-qu-tu-negocio-necesita-ambas":
    "pagina-web-vs-redes-sociales-por-que-tu-negocio-necesita-ambas",
  "c-mo-saber-si-tu-negocio-necesita-un-redise-o-web-5-se-ales-cr-ticas":
    "como-saber-si-tu-negocio-necesita-un-rediseno-web-5-senales-criticas",
  "vender-online-en-rep-blica-dominicana-gu-a-definitiva-de-pasarelas-de-pago-2026-azul-vs-cardnet-vs-paypal":
    "vender-online-en-republica-dominicana-guia-definitiva-de-pasarelas-de-pago-2026-azul-vs-cardnet-vs-paypal",
  "7-segundos-para-perder-un-cliente-por-qu-una-web-lenta-est-matando-tu-facturaci-n-y-c-mo-arreglarlo":
    "7-segundos-para-perder-un-cliente-por-que-una-web-lenta-esta-matando-tu-facturacion-y-como-arreglarlo",
  "qu-es-el-seo-y-c-mo-hace-que-tu-negocio-venda-incluso-mientras-duermes":
    "que-es-el-seo-y-como-hace-que-tu-negocio-venda-incluso-mientras-duermes",
  "esclavo-del-chat-gu-a-definitiva-de-automatizaci-n-meta-business-vs-manychat-en-rd":
    "esclavo-del-chat-guia-definitiva-de-automatizacion-meta-business-vs-manychat-en-rd",
  "cu-nto-cuesta-una-p-gina-web-profesional-en-2026-gu-a-de-precios-reales":
    "cuanto-cuesta-una-pagina-web-profesional-en-2026-guia-de-precios-reales",
  "tu-negocio-no-aparece-en-google-maps-5-errores-que-te-est-n-costando-clientes":
    "tu-negocio-no-aparece-en-google-maps-5-errores-que-te-estan-costando-clientes",
  "wordpress-vs-react-next-js-por-qu-lo-barato-est-matando-tu-posicionamiento-en-google":
    "wordpress-vs-react-next-js-por-que-lo-barato-esta-matando-tu-posicionamiento-en-google",
};

const storedByPublic: Record<string, string> = Object.fromEntries(
  Object.entries(blogSlugRenames).map(([stored, pub]) => [pub, stored]),
);

/** Slug que se usa en las URLs públicas para un slug guardado en Firestore. */
export function publicSlug(stored: string): string {
  return renamedSlug(stored) ?? stored;
}

/**
 * Slug nuevo si `stored` es uno de los viejos. Object.hasOwn evita que
 * /blog/constructor o /blog/toString lean propiedades de Object.prototype.
 */
export function renamedSlug(stored: string): string | undefined {
  return Object.hasOwn(blogSlugRenames, stored) ? blogSlugRenames[stored] : undefined;
}

/** Slugs con los que puede estar guardado en Firestore un slug público. */
export function storedSlugCandidates(slug: string): string[] {
  const legacy = Object.hasOwn(storedByPublic, slug) ? storedByPublic[slug] : undefined;
  return legacy ? [slug, legacy] : [slug];
}

/**
 * Un documento por slug público. Si conviven el viejo ("p-gina-...") y uno
 * nuevo guardado ya con el slug limpio (el admin ahora quita las tildes y
 * genera justo ese slug), gana el que lo tiene guardado tal cual. Mantiene el
 * orden de la primera aparición.
 */
export function uniqueByPublicSlug<T>(items: T[], storedSlug: (item: T) => string): T[] {
  const chosen = new Map<string, T>();
  for (const item of items) {
    const stored = storedSlug(item);
    const pub = publicSlug(stored);
    const current = chosen.get(pub);
    if (!current || (stored === pub && storedSlug(current) !== pub)) chosen.set(pub, item);
  }
  return [...chosen.values()];
}
