/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  // Disable CSS preloading if the warnings persist
  // experimental: {
  //   disableOptimizedLoading: true,
  // },
}

module.exports = nextConfig