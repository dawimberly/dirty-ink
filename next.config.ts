import type { NextConfig } from "next";

const shopUrl =
  process.env.NEXT_PUBLIC_SHOP_URL?.replace(/\/$/, "") ||
  "https://7fegea-va.myshopify.com";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    return [
      { source: "/shop", destination: shopUrl, permanent: false },
      { source: "/merch", destination: shopUrl, permanent: false },
    ];
  },
};

export default nextConfig;
