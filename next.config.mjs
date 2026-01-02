/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ fixes Image Optimization error for static export
  },
};

export default nextConfig;
