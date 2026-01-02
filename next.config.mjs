/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    unoptimized: true, // ✅ fixes Image Optimization error for static export
  },
};

export default nextConfig;
