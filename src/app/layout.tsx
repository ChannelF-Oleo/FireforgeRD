import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { siteJsonLd } from "@/lib/site-schema";

// EMBER GLASS: Sans-serif geométrica para UI
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Serif de display del diseño anterior. El sitio público ya usa Outfit/Work
// Sans (src/components/ds/fonts.ts); Fraunces queda solo para el panel de
// administración (.font-display). Se conserva opsz porque .font-display usa
// font-optical-sizing: auto. El eje WONK ya no hace falta: solo servía para el
// ampersand del hero anterior.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
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
    "Desarrollo web, tiendas online y sistemas a medida. Desarrollamos soluciones escalables para empresas que buscan control total y crecimiento.",

  keywords: [
    "Desarrollo Web República Dominicana",
    "Agencia de Software Santo Domingo",
    "Programación a medida",
    "Next.js Expertos",
    "Sistemas CRM",
    "Tiendas online República Dominicana",
    "Perfil de Google para negocios",
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

  // Sin canonical aquí: se heredaba a toda página sin canonical propia (el blog
  // y cada artículo declaraban el home como canónica, y Google no los
  // indexaba). Cada página define la suya; la del home está en app/page.tsx.

  openGraph: {
    title: "FireforgeRD | Forjando el Futuro Digital",
    description:
      "Desarrollo web, tiendas online y sistemas a medida en República Dominicana.",
    url: "https://www.fireforgerd.com",
    siteName: "FireforgeRD",
    locale: "es_DO",
    type: "website",
    // La imagen (1200x630) la genera src/app/opengraph-image.tsx.
  },

  twitter: {
    // Tarjeta grande: la imagen 1200x630 sale de src/app/twitter-image.tsx.
    card: "summary_large_image",
    title: "FireforgeRD | Agencia de Desarrollo Web",
    description:
      "Desarrollo web, tiendas online y sistemas a medida. Alto rendimiento para empresas líderes.",
    creator: "@fireforgerd",
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
  return (
    <html lang="es">
      <head>
        {/* Favicon - Forzar actualización con versión */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        
        {/* Sin preconnect a fonts.googleapis/gstatic: next/font descarga las
            fuentes en build y las sirve desde el propio dominio, así que ya no
            hay origen de terceros al que adelantarse. */}

      </head>
      <body
        className={`${inter.className} ${fraunces.variable} bg-background text-text-muted min-h-screen flex flex-col antialiased`}
      >
        {/* Analítica: solo GA4 (gtag). Tag Manager se quitó: no enviaba nada a
            Analytics, solo tenía el vinculador de conversiones de Google Ads
            (que no se usa) y costaba ~0,9 s de bloqueo en móvil. */}
        <GoogleAnalytics />

        {/* INYECCIÓN JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />

        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
