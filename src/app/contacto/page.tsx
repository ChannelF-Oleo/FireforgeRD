import type { Metadata } from "next";
import { pageSocial } from "@/lib/og";
import { dsRoot } from "@/components/ds/fonts";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para iniciar tu proyecto de desarrollo web, tienda online o sistema a medida. Respuesta en menos de 24 horas.",
  alternates: {
    canonical: "https://www.fireforgerd.com/contacto",
  },
  ...pageSocial({
    title: "Contacto | FireforgeRD",
    description:
      "Contáctanos para iniciar tu proyecto digital. Respuesta en menos de 24 horas.",
    url: "https://www.fireforgerd.com/contacto",
  }),
};

// /contacto?similar=<proyecto> (desde "Quiero algo similar" en el home) lo
// lee ContactForm en el cliente: leer searchParams aquí hacía dinámica toda
// la página solo para rellenar un campo.
export default function ContactoPage() {
  return (
    <div className={`${dsRoot} min-h-screen bg-(--ds-bg)`}>
      <ContactForm />
    </div>
  );
}
