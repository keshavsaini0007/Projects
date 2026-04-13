/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators:false,
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
