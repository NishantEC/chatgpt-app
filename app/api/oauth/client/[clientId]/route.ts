import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  // Return client information (simplified for POC)
  return NextResponse.json(
    {
      client_id: clientId,
      client_secret: "***", // Don't expose the secret
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      redirect_uris: ["http://localhost:3000/callback"],
      grant_types: ["authorization_code", "client_credentials"],
      response_types: ["code", "token"],
      token_endpoint_auth_method: "client_secret_basic",
      application_type: "web",
      scope: "read:content write:content",
      client_name: "ChatGPT App",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  try {
    const body = await request.json();

    // Update client information (simplified for POC)
    return NextResponse.json(
      {
        client_id: clientId,
        client_secret: "***", // Don't expose the secret
        client_id_issued_at: Math.floor(Date.now() / 1000),
        client_secret_expires_at: 0,
        ...body, // Include updated fields
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "invalid_client_metadata",
        error_description: "Invalid request body",
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  // Delete client (simplified for POC)
  return NextResponse.json(
    { message: `Client ${clientId} deleted successfully` },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    },
  });
}
