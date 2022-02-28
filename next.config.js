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
      "eb-climbing.com",
      "cdn.shopify.com",
      "www.eb-escalade.com",
      "www.unparallelsports.com",
      "cypherclimbing.com",
      "www.borealoutdoor.com",
      "www.ocun.com",
      "shop.epictv.com",
      "www.evolvsports.com",
      "www.wildclimb.it",
      "www.redchiliclimbing.com",
    ],
  },
};

module.exports = nextConfig;
