import type { Metadata } from "next";
import { pageSocial } from "@/lib/og";
import { BlogList } from "@/components/sections/BlogList";
import { BlogErrorBoundary } from "@/components/ui/BlogErrorBoundary";
import { dsRoot } from "@/components/ds/fonts";

// ⚡ SOLUCIÓN: Revalidar cada 5 minutos para mostrar nuevos posts
export const revalidate = 300; // 5 minutos

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías prácticas sobre páginas web, tiendas online, Google y ventas por internet para negocios en República Dominicana.",
  alternates: {
    canonical: "https://www.fireforgerd.com/blog",
  },
  ...pageSocial({
    title: "Blog | FireforgeRD",
    description:
      "Guías prácticas sobre páginas web, tiendas online y ventas por internet para negocios dominicanos.",
    url: "https://www.fireforgerd.com/blog",
  }),
};

export default function BlogPage() {
  return (
    <div className={`${dsRoot} min-h-screen bg-(--ds-bg)`}>
      <BlogErrorBoundary>
        <BlogList />
      </BlogErrorBoundary>
    </div>
  );
}
