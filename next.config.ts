import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignorar errores de TypeScript durante el build si se presentan
    ignoreBuildErrors: true,
  },
  
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
