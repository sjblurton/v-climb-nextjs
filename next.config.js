/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },
  reactStrictMode: true,
  images: {
    domains: [
      "cdn11.bigcommerce.com",
      "lcdn.sportiva.com",
      "assets.adidas.com",
    ],
  },
};

module.exports = nextConfig;
