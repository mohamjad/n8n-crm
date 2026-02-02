/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack config (Next.js 16+)
  turbopack: {},
  // Keep webpack config for compatibility, but Turbopack will be used
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}

module.exports = nextConfig
