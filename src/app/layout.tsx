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
    default: "FireforgeRD | Infraestructura Digital de Alto Rendimiento",
    template: "%s | FireforgeRD"
  },
  
  description: "Ingeniería web, sistemas a medida y automatización con IA. Desarrollamos soluciones escalables para empresas que buscan control total y cero deuda técnica.",
  
  keywords: [
    "Desarrollo Web República Dominicana",
    "Agencia de Software Santo Domingo",
    "Programación a medida",
    "Next.js Expertos",
    "Sistemas CRM",
    "Automatización IA",
    "Diseño Web Premium",
    "E-commerce avanzado"
  ],

  authors: [{ name: "Fireforge Engineering Team" }],
  creator: "FireforgeRD",
  publisher: "FireforgeRD",

  openGraph: {
    title: "FireforgeRD | Forjando el Futuro Digital",
    description: "Infraestructura digital robusta. Sin plantillas. Solo código de alto rendimiento.",
    url: 'https://fireforgerd.com',
    siteName: 'FireforgeRD',
    locale: 'es_DO',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FireforgeRD Digital Infrastructure',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "FireforgeRD | Infraestructura Digital",
    description: "Ingeniería web y sistemas a medida. Alto rendimiento para empresas líderes.",
    creator: '@fireforgerd',
    images: ['/og-image.jpg'],
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
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text-muted min-h-screen flex flex-col antialiased`}>
        
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
