import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

// EMBER GLASS: Sans-serif geométrica para UI
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-geist",
  display: 'swap',
});

// EMBER GLASS: Viewport con tema claro
export const viewport: Viewport = {
  themeColor: '#F9F8F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fireforgerd.com'),

  title: {
    default: "FireforgeRD | Agencia de Desarrollo Web",
    template: "%s | FireforgeRD"
  },
  
  description: "Ingeniería web, sistemas a medida y automatización con IA. Desarrollamos soluciones escalables para empresas que buscan control total y crecimiento.",
  
  keywords: [
    "Desarrollo Web República Dominicana",
    "Agencia de Software Santo Domingo",
    "Programación a medida",
    "Next.js Expertos",
    "Sistemas CRM",
    "Automatización IA",
    "Diseño Web Premium",
    "E-commerce avanzado",
    "Paginas web",
    "Republica Dominicana",
    "Diseño de paginas",
    "Fireforgerd",
    "Fireforge"
  ],

  authors: [{ name: "Fireforge Engineering Team" }],
  creator: "FireforgeRD",
  publisher: "FireforgeRD",

  openGraph: {
    title: "FireforgeRD | Forjando el Futuro Digital",
    description: "Desarrollo Web, sistemas a medida y automatizacion con IA en Republica Dominicana, RD.",
    url: 'https://fireforgerd.com',
    siteName: 'FireforgeRD',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/Icon.png', // Next.js buscará opengraph-image en src/app si usas file conventions
        width: 1200,
        height: 630,
        alt: 'FireforgeRD Digital Infrastructure',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "FireforgeRD | Agencia de Desarrollo Web",
    description: "Desarrollo web, sistemas a medida y automatizacion con IA. Alto rendimiento para empresas líderes.",
    creator: '@fireforgerd',
    images: ['/Icon.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Nota: Si usas icon.png en src/app, esta sección de 'icons' es opcional, 
  // pero dejarla como fallback está bien.
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // DATOS ESTRUCTURADOS (Schema.org)
  // Definidos DENTRO del componente para ser inyectados
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "FireforgeRD",
    "image": "https://fireforgerd.com/og-image.jpg",
    "description": "Desarrollo web, sistemas a medida y automatización con IA.",
    "url": "https://fireforgerd.com",
    "telephone": "+18094202288",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santo Domingo",
      "addressCountry": "DO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.4861,
      "longitude": -69.9312
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://instagram.com/fireforgerd",
      "https://linkedin.com/company/fireforgerd"
    ]
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text-muted min-h-screen flex flex-col antialiased`}>
        
        {/* INYECCIÓN JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Header />
        
        <main className="flex-grow pt-20 relative z-10 min-h-screen"> 
          {children}
        </main>
        
        <Footer />
        <FloatingWhatsApp />
        
      </body>
    </html>
  );
}
