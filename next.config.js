/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
}

module.exports = nextConfig
