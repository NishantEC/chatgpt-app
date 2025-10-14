import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { grant_type, client_id, client_secret, code } = body;

    // For client_credentials grant type (simpler for MCP)
    if (grant_type === "client_credentials") {
      // Validate client credentials (for now, accept any)
      if (!client_id) {
        return NextResponse.json(
          {
            error: "invalid_client",
            error_description: "client_id is required",
          },
          { status: 400 }
        );
      }

      // Return a token (in real implementation, this would be generated)
      const token = "test-bearer-token-12345";

      return NextResponse.json({
        access_token: token,
        token_type: "Bearer",
        expires_in: 3600,
        scope: "read:content write:content",
      });
    }

    // For authorization_code grant type
    if (grant_type === "authorization_code") {
      if (!code) {
        return NextResponse.json(
          { error: "invalid_request", error_description: "code is required" },
          { status: 400 }
        );
      }

      // In a real implementation, you'd validate the authorization code
      const token = "test-bearer-token-12345";

      return NextResponse.json({
        access_token: token,
        token_type: "Bearer",
        expires_in: 3600,
        scope: "read:content write:content",
      });
    }

    return NextResponse.json(
      { error: "unsupported_grant_type" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Invalid request body" },
      { status: 400 }
    );
  }
}
