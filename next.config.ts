import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
  
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
