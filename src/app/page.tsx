import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
// Server Component con fetch a Firestore: se importa directo, no vía dynamic().
import { FeaturedClientsCarousel } from "@/components/sections/FeaturedClientsCarousel";

// Componentes below-the-fold cargados dinámicamente para reducir TBT
const PricingMatrix = dynamic(
  () =>
    import("@/components/sections/PricingMatrix").then((mod) => ({
      default: mod.PricingMatrix,
    })),
  { ssr: true },
);

const PortfolioCTA = dynamic(
  () =>
    import("@/components/sections/PortfolioCTA").then((mod) => ({
      default: mod.PortfolioCTA,
    })),
  { ssr: true },
);

const FAQSection = dynamic(
  () =>
    import("@/components/sections/FAQSection").then((mod) => ({
      default: mod.FAQSection,
    })),
  { ssr: true },
);

const ContactForm = dynamic(
  () =>
    import("@/components/sections/ContactForm").then((mod) => ({
      default: mod.ContactForm,
    })),
  { ssr: true },
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <PricingMatrix />
      <PortfolioCTA />
      <FeaturedClientsCarousel />
      <FAQSection />
      <ContactForm />
    </>
  );
}
