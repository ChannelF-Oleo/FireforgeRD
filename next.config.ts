import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 1. Configuración para permitir imágenes de Firebase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
    // ⚡ SOLUCIÓN: Configuración adicional para Firebase Storage
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // ⚡ SOLUCIÓN: Agregar calidades personalizadas para evitar warnings
    qualities: [75, 85, 90],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // ⚡ SOLUCIÓN: Configuración para manejar timeouts de Firebase
    loader: 'default',
    unoptimized: false,
  },

  // 2. Redirecciones permanentes (301/308) para SEO
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "fireforgerd.com",
          },
        ],
        destination: "https://www.fireforgerd.com/:path*",
        permanent: true,
      },
    ];
  },

  // 3. Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        // Solo aplicar headers de seguridad a páginas HTML, no a assets estáticos
        source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$).*)',
        headers: [
          // Seguridad
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // Headers específicos para assets estáticos
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          // Rate limiting headers
          {
            key: 'X-RateLimit-Limit',
            value: '100',
          },
          {
            key: 'X-RateLimit-Remaining',
            value: '99',
          },
        ],
      },
    ];
  },

  // 4. React Compiler (deshabilitado por estabilidad)
  // reactCompiler: true,

  // 5. Turbopack root para evitar warning de múltiples lockfiles
  turbopack: {
    root: path.resolve("."),
  },

  // 6. Optimización de bundles - Target moderno para evitar polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 7. Optimización experimental - tree shaking agresivo
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-email/components",
      "firebase",
      "firebase/firestore",
      "firebase/storage",
      "firebase/auth",
    ],
    // PWA support
    webVitalsAttribution: ['CLS', 'LCP'],
    // Optimización de CSS
    optimizeCss: true,
  },

  // 8. Optimización de producción
  productionBrowserSourceMaps: false,

  // 9. Configuración de módulos modernos
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  // 10. Webpack config para excluir polyfills innecesarios
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // No incluir polyfills para APIs modernas que ya tienen soporte nativo
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    // Bundle analyzer en desarrollo
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

export default nextConfig;
