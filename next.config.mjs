/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },devIndicators: {
    buildActivity: false, // this hides the bottom-left Next.js icon in dev mode
  },
}

export default nextConfig