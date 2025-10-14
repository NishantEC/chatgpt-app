import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");
  const responseType = searchParams.get("response_type");

  // Validate required parameters
  if (!clientId) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "client_id is required" },
      { status: 400 }
    );
  }

  if (!redirectUri) {
    return NextResponse.json(
      {
        error: "invalid_request",
        error_description: "redirect_uri is required",
      },
      { status: 400 }
    );
  }

  // For implicit flow (response_type=token), return token directly
  if (responseType === "token") {
    const token = "test-bearer-token-12345";
    const redirectUrl = new URL(redirectUri, request.url);
    redirectUrl.searchParams.set("access_token", token);
    redirectUrl.searchParams.set("token_type", "Bearer");
    redirectUrl.searchParams.set("expires_in", "3600");
    if (state) redirectUrl.searchParams.set("state", state);

    return NextResponse.redirect(redirectUrl);
  }

  // For authorization code flow, redirect to login page with OAuth parameters
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("client_id", clientId);
  loginUrl.searchParams.set("redirect_uri", redirectUri);
  if (state) loginUrl.searchParams.set("state", state);

  return NextResponse.redirect(loginUrl);
}
