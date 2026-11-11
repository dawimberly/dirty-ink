import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    return [
      // Old Shopify /merch deep links → in-app shop
      { source: "/merch", destination: "/shop", permanent: false },
      { source: "/letterheads", destination: "/shirt-work", permanent: true },
    ];
  },
};

export default nextConfig;
