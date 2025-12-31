import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para iniciar tu proyecto de desarrollo web, sistemas a medida o automatización con IA. Respuesta en menos de 24 horas.",
  openGraph: {
    title: "Contacto | FireforgeRD",
    description:
      "Contáctanos para iniciar tu proyecto digital. Respuesta en menos de 24 horas.",
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <ContactForm />
    </div>
  );
}
