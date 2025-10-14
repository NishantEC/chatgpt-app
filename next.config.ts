import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
  async rewrites() {
    return [
      {
        source: "/.well-known/oauth-protected-resource",
        destination: "/api/.well-known/oauth-protected-resource",
      },
      {
        source: "/.well-known/oauth-protected-resource/mcp",
        destination: "/api/.well-known/oauth-protected-resource/mcp",
      },
    ];
  },
};

export default nextConfig;
