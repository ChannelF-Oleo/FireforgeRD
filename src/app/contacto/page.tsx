import type { Metadata } from "next";
import { dsRoot } from "@/components/ds/fonts";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para iniciar tu proyecto de desarrollo web, tienda online o sistema a medida. Respuesta en menos de 24 horas.",
  alternates: {
    canonical: "https://www.fireforgerd.com/contacto",
  },
  openGraph: {
    title: "Contacto | FireforgeRD",
    description:
      "Contáctanos para iniciar tu proyecto digital. Respuesta en menos de 24 horas.",
    url: "https://www.fireforgerd.com/contacto",
  },
};

// /contacto?similar=<proyecto> llega desde "Quiero algo similar" en las
// tarjetas de proyectos del home: la nota arranca con esa referencia.
function notaInicial(similar: string | string[] | undefined): string | undefined {
  const nombre = (Array.isArray(similar) ? similar[0] : similar)?.trim().slice(0, 120);
  return nombre ? `Quiero algo similar a "${nombre}".` : undefined;
}

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ similar?: string | string[] }>;
}) {
  const { similar } = await searchParams;
  return (
    <div className={`${dsRoot} min-h-screen bg-(--ds-bg)`}>
      <ContactForm initialNotes={notaInicial(similar)} />
    </div>
  );
}
