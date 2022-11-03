/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env:{
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
  }
}

module.exports = nextConfig
