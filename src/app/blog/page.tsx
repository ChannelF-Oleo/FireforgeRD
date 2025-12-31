import type { Metadata } from "next";
import { BlogList } from "@/components/sections/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, tecnología, automatización e inteligencia artificial para empresas en República Dominicana.",
  openGraph: {
    title: "Blog | FireforgeRD",
    description:
      "Artículos sobre desarrollo web, tecnología y automatización para empresas.",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogList />
    </div>
  );
}
