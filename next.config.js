/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
}

export default nextConfig
