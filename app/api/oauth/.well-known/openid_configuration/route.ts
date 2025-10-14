import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000";

  // Ensure the baseUrl has the correct protocol
  const fullBaseUrl = baseUrl.startsWith("http")
    ? baseUrl
    : `https://${baseUrl}`;

  const config = {
    issuer: `${fullBaseUrl}/api/oauth`,
    authorization_endpoint: `${fullBaseUrl}/api/oauth/authorize`,
    token_endpoint: `${fullBaseUrl}/api/oauth/token`,
    scopes_supported: ["read:content", "write:content"],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
    ],
    code_challenge_methods_supported: ["S256"],
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
