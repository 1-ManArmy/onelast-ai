/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  env: {
    SUBDOMAIN: 'pdfmind',
    MAIN_DOMAIN: 'onelast.ai'
  }
}

module.exports = nextConfig
