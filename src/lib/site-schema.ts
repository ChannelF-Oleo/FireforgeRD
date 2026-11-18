import { serviceCategories } from "@/lib/services-data";
import type { ServicePlan } from "@/types";
import { email, instagramHref } from "@/components/ds/nav";

const SITE = "https://www.fireforgerd.com";

/** Ficha de Google Maps (perfil de empresa, CID 4727497463848598662). */
const GOOGLE_MAPS = "https://www.google.com/maps?cid=4727497463848598662";

function offer(plan: ServicePlan) {
  const hourly = plan.currency.includes("Hora");
  const base = {
    "@type": "UnitPriceSpecification",
    price: plan.price,
    priceCurrency: "USD",
    ...(hourly ? { unitText: "hora" } : {}),
  };
  // En los planes con setup, `price` es solo el alta: la cuota mensual es
  // obligatoria y se publica como un segundo componente del precio.
  const priceSpecification =
    plan.setupFee && plan.recurringFee
      ? [
          { ...base, priceComponentType: "https://schema.org/ActivationFee" },
          {
            "@type": "UnitPriceSpecification",
            price: plan.recurringFee.amount,
            priceCurrency: "USD",
            priceComponentType: "https://schema.org/Subscription",
            ...(plan.recurringFee.period === "mes"
              ? { billingDuration: "P1M", unitCode: "MON" }
              : { unitText: "hora" }),
          },
        ]
      : base;
  return {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: plan.name, description: plan.idealFor },
    priceSpecification,
  };
}

/**
 * Datos estructurados del negocio, en todas las páginas públicas.
 *
 * FireforgeRD es un negocio de área de servicio: está en Google Maps para
 * recibir reseñas, pero trabaja desde casa y no tiene local. Por eso no se
 * publica dirección de calle ni coordenadas (Google pide ocultarlas en estos
 * casos) y se declara el área atendida con areaServed.
 *
 * El catálogo se genera de services-data.ts: al cambiar un precio allí, cambia
 * también aquí.
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#negocio`,
      name: "FireforgeRD",
      description:
        "Desarrollo web, tiendas online, sistemas a medida y servicios de presencia digital para negocios en República Dominicana.",
      url: SITE,
      image: `${SITE}/Icon.png`,
      logo: `${SITE}/Icon.png`,
      telephone: "+18498534067",
      email,
      priceRange: "$$",
      currenciesAccepted: "USD, DOP",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santo Domingo",
        addressCountry: "DO",
      },
      areaServed: { "@type": "Country", name: "República Dominicana" },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      hasMap: GOOGLE_MAPS,
      sameAs: [instagramHref, GOOGLE_MAPS],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de FireforgeRD",
        itemListElement: serviceCategories.map((category) => ({
          "@type": "OfferCatalog",
          name: category.name,
          itemListElement: category.services.map(offer),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#sitio`,
      url: SITE,
      name: "FireforgeRD",
      inLanguage: "es-DO",
      publisher: { "@id": `${SITE}/#negocio` },
    },
  ],
};
