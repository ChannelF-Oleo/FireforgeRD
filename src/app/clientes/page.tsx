import type { Metadata } from "next";
import { ClientsGrid } from "@/components/sections/ClientsGrid";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

export const metadata: Metadata = {
  title: "Nuestros Clientes",
  description:
    "Conoce los proyectos que hemos desarrollado para empresas en República Dominicana. Portafolio de sitios web, sistemas y soluciones digitales.",
  alternates: {
    canonical: "https://www.fireforgerd.com/clientes",
  },
  openGraph: {
    title: "Nuestros Clientes | FireforgeRD",
    description:
      "Portafolio de proyectos web y sistemas desarrollados por FireforgeRD.",
    url: "https://www.fireforgerd.com/clientes",
  },
};

export default function ClientesPage() {
  return (
    <div className="min-h-screen">
      <ClientsGrid />
      <GoogleReviews />
    </div>
  );
}
