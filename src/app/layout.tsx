import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// EMBER GLASS: Sans-serif geométrica para UI
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// EMBER GLASS: Viewport con tema claro
// NOTA: Permitimos zoom (sin maximumScale: 1) para accesibilidad móvil
export const viewport: Viewport = {
  themeColor: "#F9F8F6",
  width: "device-width",
  initialScale: 1,
  // maximumScale removido para permitir zoom - mejor accesibilidad
};

export const metadata: Metadata = {
  // IMPORTANTE: Usar www para consistencia con redirecciones
  metadataBase: new URL("https://www.fireforgerd.com"),

  title: {
    default: "FireforgeRD | Agencia de Desarrollo Web",
    template: "%s | FireforgeRD",
  },

  description:
    "Ingeniería web, sistemas a medida y automatización con IA. Desarrollamos soluciones escalables para empresas que buscan control total y crecimiento.",

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
    "Fireforge",
  ],

  authors: [{ name: "Fireforge Engineering Team" }],
  creator: "FireforgeRD",
  publisher: "FireforgeRD",

  // URL canónica alternativa
  alternates: {
    canonical: "https://www.fireforgerd.com",
  },

  openGraph: {
    title: "FireforgeRD | Forjando el Futuro Digital",
    description:
      "Desarrollo Web, sistemas a medida y automatizacion con IA en Republica Dominicana, RD.",
    url: "https://www.fireforgerd.com",
    siteName: "FireforgeRD",
    locale: "es_DO",
    type: "website",
    images: [
      {
        url: "/Icon.png", // Next.js buscará opengraph-image en src/app si usas file conventions
        width: 1200,
        height: 630,
        alt: "FireforgeRD Digital Infrastructure",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FireforgeRD | Agencia de Desarrollo Web",
    description:
      "Desarrollo web, sistemas a medida y automatizacion con IA. Alto rendimiento para empresas líderes.",
    creator: "@fireforgerd",
    images: ["/Icon.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/ico_32x32.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/ico_512x512.ico", sizes: "512x512", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
    name: "FireforgeRD",
    image: "https://fireforgerd.com/og-image.jpg",
    description: "Desarrollo web, sistemas a medida y automatización con IA.",
    url: "https://fireforgerd.com",
    telephone: "+18094202288",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santo Domingo",
      addressCountry: "DO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.4861,
      longitude: -69.9312,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://instagram.com/fireforgerd",
      "https://linkedin.com/company/fireforgerd",
    ],
  };

  return (
    <html lang="es">
      <head>
        {/* Favicon - Forzar actualización con versión */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        
        {/* Preconnect para recursos críticos - mejora LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager - improved loading */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PHGP7H7M');`}
        </Script>
      </head>
      <body
        className={`${inter.className} bg-background text-text-muted min-h-screen flex flex-col antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHGP7H7M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <GoogleAnalytics />

        {/* INYECCIÓN JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
