import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    // Old Shopify /merch deep links → in-app shop
    return [{ source: "/merch", destination: "/shop", permanent: false }];
  },
};

export default nextConfig;
