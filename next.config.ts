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
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

  // 3. React Compiler (movido de experimental en Next.js 16+)
  reactCompiler: true,

  // 4. Turbopack root para evitar warning de múltiples lockfiles
  turbopack: {
    root: path.resolve("."),
  },

  // 5. Optimización de bundles - Target moderno para evitar polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 6. Optimización experimental - tree shaking agresivo
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
  },

  // 7. Optimización de producción
  productionBrowserSourceMaps: false,

  // 8. Configuración de módulos modernos
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  // 9. Webpack config para excluir polyfills innecesarios
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // No incluir polyfills para APIs modernas que ya tienen soporte nativo
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
};

export default nextConfig;
