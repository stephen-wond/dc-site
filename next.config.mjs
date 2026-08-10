/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  // Static export — GitHub Pages has no server.
  output: 'export',
  basePath,
  // Pages serves flat files, so each route needs its own index.html.
  trailingSlash: true,
  // next/image optimisation needs a server; we use plain <img> anyway.
  images: { unoptimized: true },
};

export default nextConfig;
