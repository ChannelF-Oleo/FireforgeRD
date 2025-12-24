import { HeroSection, ServicesGrid, PricingMatrix, ContactForm, FAQSection, PortfolioCTA  } from '@/components/sections';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <PricingMatrix />
      <PortfolioCTA />
      <FAQSection />
      <ContactForm />
    </>
  );
}
