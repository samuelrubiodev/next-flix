import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      new URL('https://image.tmdb.org/t/p/w500/**'),
      new URL("https://placehold.co/**")
    ],
  },
};

export default nextConfig;
