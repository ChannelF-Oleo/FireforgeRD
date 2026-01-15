import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 1. Configuración para permitir imágenes de Firebase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/fireforgerd.firebasestorage.app/o/**",
      },
    ],
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
};

export default nextConfig;
