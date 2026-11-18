import type { Metadata } from "next";
import { dsRoot } from "@/components/ds/fonts";
import {
  ContactCta,
  Faq,
  Hero,
  Pricing,
  Services,
  Subservices,
  ValueProp,
} from "@/components/ds/home-sections";
import { Projects } from "@/components/ds/Projects";

// La sección de proyectos lee los clientes de Firestore: sin esto el home
// quedaba estático desde el build y un cliente nuevo del admin no aparecía
// hasta el siguiente deploy. Mismo intervalo que el blog.
export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "https://www.fireforgerd.com" },
};

// Home con el sistema de diseño de ui-ux-pro-max (adaptado a la marca).
// Patrón "Hero + Features + CTA": hero → propuesta de valor → servicios →
// precios → subservicios → proyectos y reseñas → FAQ → CTA final.
export default function Home() {
  return (
    <div className={`${dsRoot} bg-(--ds-bg)`}>
      <Hero />
      <ValueProp />
      <Services />
      <Pricing />
      <Subservices />
      <Projects />
      <Faq />
      <ContactCta />
    </div>
  );
}
