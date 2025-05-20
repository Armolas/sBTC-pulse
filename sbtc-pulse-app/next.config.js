/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/leaderboard',
        destination: '/dashboard/leaderboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
