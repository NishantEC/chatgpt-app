import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

const VALID_TOKEN = "test-bearer-token-12345";

export async function verifyToken(
  req: Request,
  bearerToken?: string
): Promise<AuthInfo | undefined> {
  if (!bearerToken || bearerToken !== VALID_TOKEN) {
    return undefined;
  }

  return {
    token: bearerToken,
    scopes: ["read:content", "write:content"],
    clientId: "admin-user",
    extra: {
      userId: "admin",
      email: "admin@example.com",
    },
  };
}

