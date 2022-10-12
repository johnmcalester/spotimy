/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['links.papareact.com', 'i.scdn.co', 'newjams-images.scdn.co', 'mosaic.scdn.co'],
  },
}

module.exports = nextConfig
