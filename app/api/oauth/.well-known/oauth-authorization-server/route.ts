import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000";
  const fullBaseUrl = baseUrl.startsWith("http")
    ? baseUrl
    : `https://${baseUrl}`;

  const config = {
    issuer: fullBaseUrl,
    authorization_endpoint: `${fullBaseUrl}/api/oauth/authorize`,
    token_endpoint: `${fullBaseUrl}/api/oauth/token`,
    scopes_supported: ["read:content", "write:content"],
    response_types_supported: ["code", "token"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
      "implicit",
    ],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "none",
    ],
    code_challenge_methods_supported: ["S256"],
    // Remove registration endpoint for now due to deployment issues
    version: "1.0.2",
  };

  return NextResponse.json(config, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
