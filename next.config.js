/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },
  reactStrictMode: true,
  images: {
    domains: ["cdn11.bigcommerce.com"],
  },
};

module.exports = nextConfig;
