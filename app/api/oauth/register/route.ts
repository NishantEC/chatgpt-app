import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_name, redirect_uris, grant_types, response_types } = body;

    // Generate a simple client ID and secret for the POC
    const clientId = `client_${Date.now()}`;
    const clientSecret = `secret_${Math.random().toString(36).substring(7)}`;

    // Return client registration response
    return NextResponse.json({
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0, // Never expires for POC
      registration_access_token: `reg_token_${Math.random().toString(36).substring(7)}`,
      registration_client_uri: `${request.url}/client/${clientId}`,
      redirect_uris: redirect_uris || ["http://localhost:3000/callback"],
      grant_types: grant_types || ["authorization_code", "client_credentials"],
      response_types: response_types || ["code", "token"],
      token_endpoint_auth_method: "client_secret_basic",
      application_type: "web",
    }, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "invalid_client_metadata", error_description: "Invalid request body" },
      { 
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
