/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'picsum.photos'],
  },
};

module.exports = nextConfig;
