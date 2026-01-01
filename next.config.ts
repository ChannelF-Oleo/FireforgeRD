import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Configuración para permitir imágenes de Firebase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        // Esto limita el acceso solo a tu bucket 'fireforgerd', es más seguro
        pathname: '/v0/b/fireforgerd.firebasestorage.app/o/**',
      },
    ],
  },

  // 2. Tu configuración existente
  // Nota: Si te da error en 'reactCompiler', muévelo dentro de un objeto 'experimental: { ... }'
  reactCompiler: true,
  
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

