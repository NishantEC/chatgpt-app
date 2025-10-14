import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
  async rewrites() {
    return [
      {
        source: "/.well-known/oauth-protected-resource",
        destination: "/api/.well-known/oauth-protected-resource/mcp",
      },
      {
        source: "/.well-known/oauth-protected-resource/mcp",
        destination: "/api/.well-known/oauth-protected-resource/mcp",
      },
      {
        source: "/.well-known/oauth-authorization-server",
        destination: "/api/oauth/.well-known/oauth-authorization-server",
      },
    ];
  },
};

export default nextConfig;
