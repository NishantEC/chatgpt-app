import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");

  // For now, redirect to login page with the OAuth parameters
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("client_id", clientId || "");
  loginUrl.searchParams.set("redirect_uri", redirectUri || "");
  loginUrl.searchParams.set("state", state || "");

  return NextResponse.redirect(loginUrl);
}
