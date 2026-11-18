import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Code2,
  Flame,
  LayoutDashboard,
  Wrench,
  Clock,
  Receipt,
  RefreshCw,
  Store,
  type LucideIcon,
} from "lucide-react";
import { serviceCategories, webServices, ecommerceServices } from "@/lib/services-data";
import type { ServicePlan } from "@/types";
import { FireMark } from "@/components/ui/fire-mark";
import { StaggerGrid } from "./StaggerGrid";
import { SectionHeader } from "./SectionHeader";
import { container, ctaAccent, ctaSecondary, focusRing, heading, usd } from "./ui";

/*
 * Secciones del home (design system de ui-ux-pro-max, adaptado a la marca):
 * - Estilo "Minimalism & Swiss": grid, radio 0, sin sombras, bordes de 1px, un solo acento.
 * - Colores solo por tokens semánticos (--ds-*), nunca hex en componentes.
 * - cursor-pointer, hover 200ms, focus visible, targets >= 44px.
 * - Iconos SVG de Lucide decorativos con aria-hidden.
 */

const categoryIcons: Record<string, LucideIcon> = {
  web: Code2,
  saas: LayoutDashboard,
  subservicios: Wrench,
};

/* ---------- 1. Hero ---------- */
function cheapest(plans: readonly ServicePlan[]) {
  if (plans.length === 0) return null;
  return plans.reduce((a, b) => (b.price < a.price ? b : a));
}

export function Hero() {
  const landing = cheapest(webServices);
  const tienda = cheapest(ecommerceServices);
  const heroFacts = [
    landing && { k: "Página web", v: `desde ${usd(landing.price)}`, d: `Entrega en ${landing.deliveryTime}` },
    tienda && { k: "Tienda online", v: `desde ${usd(tienda.price)}`, d: `Entrega en ${tienda.deliveryTime}` },
    { k: "Forma de pago", v: "50% / 50%", d: "Inicial y contra entrega" },
  ].filter((r): r is { k: string; v: string; d: string } => Boolean(r));

  return (
    <section aria-labelledby="hero-title" className="py-24 md:py-32">
      <div className={`${container} grid gap-12 md:grid-cols-12`}>
        <div className="md:col-span-8">
          <p className="text-sm font-medium uppercase tracking-wider text-(--ds-primary-text)">
            Agencia de desarrollo · República Dominicana
          </p>
          <h1
            id="hero-title"
            className={`${heading} mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl`}
          >
            Webs, tiendas y sistemas para tu negocio.
          </h1>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-(--ds-muted-fg) md:text-xl">
            Diseñamos y desarrollamos sitios, tiendas online y software a medida con precios publicados y
            tiempos de entrega claros desde el primer día.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contacto" className={ctaAccent}>
              Cotiza tu proyecto <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/diagnostico" className={ctaSecondary}>
              Haz el diagnóstico
            </Link>
          </div>
        </div>
        {/* Panel de datos reales: el patrón pide "headline/image"; sin imagen real, se usa info del catálogo. */}
        <dl className="grid content-end gap-px self-end border border-(--ds-border) bg-(--ds-border) md:col-span-4">
          {heroFacts.map((row) => (
            <div key={row.k} className="bg-(--ds-card) p-5">
              <dt className="text-sm text-(--ds-muted-fg)">{row.k}</dt>
              <dd className={`${heading} mt-1 text-2xl font-semibold tabular-nums`}>{row.v}</dd>
              <dd className="mt-1 text-sm text-(--ds-muted-fg)">{row.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- 2. Value prop ---------- */
export function ValueProp() {
  const items = [
    { icon: Receipt, title: "Precios publicados", text: "Cada plan muestra su precio y lo que incluye. Sin cotizaciones a ciegas." },
    { icon: Clock, title: "Plazos por escrito", text: "Cada plan tiene su tiempo de entrega definido antes de empezar." },
    { icon: RefreshCw, title: "Mantenimiento opcional", text: "Una cuota mensual fija si quieres que nos encarguemos después de la entrega." },
  ];
  return (
    <section aria-labelledby="valor" className="bg-(--ds-muted) py-24">
      <div className={container}>
        <h2 id="valor" className="sr-only">Cómo trabajamos</h2>
        <ul className="grid gap-12 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon className="size-6 text-(--ds-primary)" aria-hidden />
              <h3 className={`${heading} mt-4 text-xl font-semibold`}>{title}</h3>
              <p className="mt-2 leading-relaxed text-(--ds-muted-fg)">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3. Key features: servicios (datos reales) ---------- */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="scroll-mt-20 py-24">
      <div className={container}>
        <SectionHeader
          id="servicios-title"
          eyebrow="Servicios"
          title="Tres líneas de trabajo, un mismo equipo"
          intro="Desde un Perfil de Google hasta un sistema administrativo completo. Elige por dónde empezar."
        />
        <StaggerGrid className="mt-12 grid gap-px border border-(--ds-border) bg-(--ds-border) sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.flatMap((cat) => {
            const Icon = categoryIcons[cat.id] ?? Code2;
            // "setup" solo si el plan más barato es un setup: en Subservicios
            // el mínimo es un pago único aunque otros planes sí cobren setup.
            // Una categoría sin planes no se pinta (flatMap con [] y no null:
            // StaggerGrid envolvería el null en un <li> vacío).
            const base = cheapest(cat.services);
            if (!base) return [];
            const min = base.price;
            const isSetup = Boolean(base.setupFee);
            return (
              <article key={cat.id} className="flex h-full flex-col bg-(--ds-card) p-8">
                <Icon className="size-6 text-(--ds-primary)" aria-hidden />
                <h3 className={`${heading} mt-6 text-xl font-semibold`}>{cat.name}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-(--ds-muted-fg)">{cat.description}</p>
                <p className="mt-6 text-sm text-(--ds-muted-fg)">
                  {cat.services.length} planes · {isSetup ? "setup " : ""}desde{" "}
                  <span className="font-semibold text-(--ds-fg) tabular-nums">{usd(min)}</span>
                </p>
              </article>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ---------- Precios (patrón Pricing-Focused: plan popular resaltado con color de marca) ---------- */
function PlanCard({ plan }: { plan: ServicePlan }) {
  return (
    <li
      className={`flex flex-col border bg-(--ds-card) p-6 ${
        plan.isRecommended ? "border-2 border-(--ds-primary)" : "border-(--ds-border)"
      }`}
    >
      {plan.isRecommended && (
        <p className="-mt-1 mb-3 inline-flex items-center gap-1 self-start bg-(--ds-accent) px-2 py-1 text-xs font-semibold uppercase tracking-wider text-(--ds-on-accent)">
          <Flame className="size-3.5" aria-hidden /> Recomendado
        </p>
      )}
      <h4 className={`${heading} text-xl font-semibold`}>{plan.name}</h4>
      <p className="mt-1 text-sm text-(--ds-muted-fg)">{plan.idealFor}</p>
      <p className={`${heading} mt-6 text-4xl font-bold tabular-nums`}>{usd(plan.price)}</p>
      {plan.recurringFee && (
        <p className="mt-1 text-sm text-(--ds-muted-fg) tabular-nums">
          + {usd(plan.recurringFee.amount)}/{plan.recurringFee.period} {plan.recurringFee.label?.toLowerCase()}
        </p>
      )}
      <p className="mt-1 text-sm text-(--ds-muted-fg)">Entrega: {plan.deliveryTime}</p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-(--ds-border) pt-6 text-sm">
        {plan.features.map((f) => (
          <li key={f.label} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-(--ds-primary)" aria-hidden />
            <span>{f.label}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contacto"
        className={`mt-8 ${plan.isRecommended ? ctaAccent : ctaSecondary}`}
      >
        Elegir {plan.name}
      </Link>
    </li>
  );
}

function PlanGroup({ title, icon: Icon, plans, cols }: { title: string; icon: LucideIcon; plans: readonly ServicePlan[]; cols: string }) {
  return (
    <div className="mt-12">
      <h3 className={`${heading} flex items-center gap-2 text-xl font-semibold`}>
        <Icon className="size-5 text-(--ds-primary)" aria-hidden /> {title}
      </h3>
      <ul className={`mt-6 grid gap-6 md:grid-cols-2 ${cols}`}>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </ul>
    </div>
  );
}

export function Pricing() {
  const saas = serviceCategories.find((c) => c.id === "saas");

  return (
    <section id="precios" aria-labelledby="precios-title" className="scroll-mt-20 py-24">
      <div className={container}>
        <SectionHeader
          id="precios-title"
          eyebrow="Precios"
          title="Planes de desarrollo web"
          intro="Sitios y tiendas online con pago único por el desarrollo. El mantenimiento mensual es aparte y opcional."
        />
        <PlanGroup title="Sitios web" icon={Code2} plans={webServices} cols="lg:grid-cols-4" />
        <PlanGroup title="Tiendas online" icon={Store} plans={ecommerceServices} cols="lg:grid-cols-3" />

        {saas && (
          <div className="mt-16">
            <h3 className={`${heading} text-xl font-semibold`}>Sistemas a medida</h3>
            <table className="mt-4 w-full border-t border-(--ds-fg) text-left">
              <caption className="sr-only">Planes de sistemas a medida</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Ideal para</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {saas.services.map((plan) => (
                  <tr key={plan.id} className="border-b border-(--ds-border)">
                    <th scope="row" className="py-4 pr-4 font-medium">{plan.name}</th>
                    <td className="hidden py-4 pr-4 text-(--ds-muted-fg) sm:table-cell">{plan.idealFor}</td>
                    <td className="py-4 text-right tabular-nums">
                      <span className="whitespace-nowrap">
                        setup <strong>{usd(plan.price)}</strong>
                      </span>
                      {/* La cuota mensual es obligatoria en estos planes: sin
                          ella el setup parecía el precio total. */}
                      {plan.recurringFee && (
                        <span className="block whitespace-nowrap text-sm text-(--ds-muted-fg)">
                          + {usd(plan.recurringFee.amount)}/{plan.recurringFee.period}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Subservicios: ítems puntuales y baratos => lista de precios, no tarjetas ---------- */
export function Subservices() {
  const sub = serviceCategories.find((c) => c.id === "subservicios");
  if (!sub) return null;
  const kits = sub.services.filter((s) => s.id.startsWith("kit-"));
  const rest = sub.services.filter((s) => !s.id.startsWith("kit-"));

  return (
    <section id="subservicios" aria-labelledby="subservicios-title" className="scroll-mt-20 bg-(--ds-muted) py-24">
      <div className={container}>
        <SectionHeader
          id="subservicios-title"
          eyebrow="Subservicios"
          title="Lo puntual que tu negocio necesita"
          intro="Presencia en Google, WhatsApp, tarjetas digitales y mantenimiento. Precio fijo y entrega en días."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className={`flex flex-col border-2 bg-(--ds-card) p-8 ${kit.isRecommended ? "border-(--ds-primary)" : "border-(--ds-border)"}`}
            >
              <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-(--ds-primary-text)">
                {kit.isRecommended && <FireMark className="size-4" />}
                Paquete
              </p>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <h3 className={`${heading} text-2xl font-semibold`}>{kit.name}</h3>
                <p className={`${heading} text-3xl font-bold tabular-nums`}>{usd(kit.price)}</p>
              </div>
              <p className="mt-1 text-(--ds-muted-fg)">{kit.idealFor} · Entrega: {kit.deliveryTime}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {kit.features.map((f) => (
                  <li key={f.label} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
              {kit.notes?.map((n) => (
                <p key={n} className="mt-4 text-sm text-(--ds-muted-fg)">
                  {n}
                </p>
              ))}
              <Link
                href="/contacto"
                className={`mt-6 self-start ${kit.isRecommended ? ctaAccent : ctaSecondary}`}
              >
                Pedir el kit<span className="sr-only">: {kit.name}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Lista y no tabla: en móvil cada servicio se apila (nombre + precio
            arriba, detalle abajo) en vez de desbordar con cuatro columnas. */}
        <div className="mt-10 border-t border-(--ds-fg)">
          <div aria-hidden className="hidden grid-cols-12 gap-4 border-b border-(--ds-border) py-3 text-sm text-(--ds-muted-fg) md:grid">
            <span className="col-span-4">Servicio</span>
            <span className="col-span-3">Ideal para</span>
            <span className="col-span-2">Entrega</span>
            <span className="col-span-3 text-right">Precio</span>
          </div>
          <ul>
            {rest.map((plan) => {
              const unit = plan.currency.split("/")[1]?.trim().toLowerCase();
              return (
                <li key={plan.id} className="border-b border-(--ds-border)">
                  {/* Cada fila se despliega para ver qué incluye y la letra chica. */}
                  <details className="group">
                  <summary className={`grid cursor-pointer list-none grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-4 md:grid-cols-12 md:items-center md:gap-4 [&::-webkit-details-marker]:hidden ${focusRing}`}>
                  <h3 className="inline-flex items-center gap-1 font-medium md:col-span-4">
                    {plan.name}
                    <ChevronDown className="size-4 shrink-0 text-(--ds-primary) transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
                  </h3>
                  <p className="row-start-2 text-sm text-(--ds-muted-fg) md:col-span-3 md:row-start-auto md:text-base">
                    <span className="md:hidden">{plan.idealFor} · </span>
                    <span className="hidden md:inline">{plan.idealFor}</span>
                    <span className="md:hidden">{plan.deliveryTime}</span>
                  </p>
                  <p className="hidden text-(--ds-muted-fg) md:col-span-2 md:block">{plan.deliveryTime}</p>
                  <p className="col-start-2 row-start-1 text-right tabular-nums md:col-span-3 md:col-start-auto md:row-start-auto">
                    {plan.setupFee && <span className="text-(--ds-muted-fg)">alta </span>}
                    <strong className="whitespace-nowrap">{usd(plan.price)}</strong>
                    {unit && <span className="whitespace-nowrap text-(--ds-muted-fg)"> / {unit}</span>}
                  </p>
                  {plan.recurringFee && (
                    <p className="col-span-2 text-sm text-(--ds-muted-fg) md:col-span-3 md:col-start-10 md:text-right">
                      + {usd(plan.recurringFee.amount)}/{plan.recurringFee.period}
                      {plan.recurringFee.label && ` ${plan.recurringFee.label.toLowerCase()}`}
                    </p>
                  )}
                  </summary>
                  <div className="grid gap-4 pb-6 md:grid-cols-12 md:gap-4">
                    <ul className="space-y-2 text-sm md:col-span-6 md:col-start-1">
                      {plan.features.map((f) => (
                        <li key={f.label} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                          <span>{f.label}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.notes && plan.notes.length > 0 && (
                      <div className="text-sm text-(--ds-muted-fg) md:col-span-6">
                        <p className="font-medium text-(--ds-fg)">A tener en cuenta</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {plan.notes.map((n) => (
                            <li key={n}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (respuestas tomadas del FAQ actual del sitio) ---------- */
const faqs = [
  {
    q: "¿Qué tengo que entregarles para empezar?",
    a: "Tu logo y los textos básicos. Si no tienes fotos profesionales, usamos bancos de imágenes o coordinamos una sesión con costo adicional.",
  },
  {
    q: "¿Cómo funcionan los pagos?",
    a: "50% de inicial para comenzar el proyecto y el 50% restante contra entrega.",
  },
  {
    q: "¿Puedo ver cómo va quedando?",
    a: "Sí. Tienes 2 revisiones completas durante el proceso para ajustar colores, textos y detalles antes del lanzamiento.",
  },
  {
    q: "¿Tengo que pagar mensualidades?",
    a: "En las páginas web y tiendas, no: el desarrollo es un pago único y el mantenimiento mensual es opcional (el dominio incluido se renueva a partir del segundo año). Los sistemas a medida y la gestión de apps de delivery sí llevan una cuota mensual, que se indica junto al precio de cada plan.",
  },
];

// Datos estructurados FAQPage (los publicaba la FAQSection anterior).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className={container}>
        <SectionHeader id="faq-title" eyebrow="Preguntas" title="Preguntas frecuentes" />
        <div className="mt-12 md:ml-[25%]">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-(--ds-border)">
              <summary
                className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium ${focusRing}`}
              >
                {f.q}
                <span
                  aria-hidden
                  className="text-2xl leading-none text-(--ds-primary) transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[65ch] pb-6 leading-relaxed text-(--ds-muted-fg)">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. CTA section (CTA "Bottom") ---------- */
export function ContactCta() {
  return (
    // id="contact": el home anterior tenía el formulario en /#contact y hay
    // enlaces compartidos con ese ancla; ahora caen en este bloque de contacto.
    <section id="contact" aria-labelledby="cta-title" className="scroll-mt-20 bg-(--ds-fg) py-24 text-(--ds-bg)">
      <div className={`${container} grid gap-10 md:grid-cols-12 md:items-end`}>
        <div className="md:col-span-8">
          <h2 id="cta-title" className={`${heading} text-4xl font-bold tracking-tight text-balance md:text-5xl`}>
            Cuéntanos qué necesitas y te respondemos con una propuesta.
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg text-(--ds-on-dark-muted)">
            Si no sabes qué plan te conviene, el diagnóstico te orienta.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4">
          <Link href="/contacto" className={ctaAccent}>
            Cotiza tu proyecto <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/diagnostico"
            className={`inline-flex min-h-11 cursor-pointer items-center justify-center border border-(--ds-bg) px-6 py-3 font-medium transition-colors duration-200 hover:bg-(--ds-bg) hover:text-(--ds-fg) ${focusRing}`}
          >
            Haz el diagnóstico
          </Link>
        </div>
      </div>
    </section>
  );
}
