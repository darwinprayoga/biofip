/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const prod = process.env.NODE_ENV === 'production'

const nextConfig = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: prod ? false : true
  }
})

module.exports = nextConfig