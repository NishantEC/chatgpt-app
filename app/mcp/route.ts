import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { verifyToken } from "./auth";
import { registerShowContentWidget } from "../widgets/show-content/handler";
import { registerShowProfileWidget } from "../widgets/show-profile/handler";

const handler = createMcpHandler(async (server) => {
  try {
    // Register all widgets
    await registerShowContentWidget(server);
    // await registerShowProfileWidget(server);
    // Future widgets can be added here:
    // await registerAnotherWidget(server);
  } catch (error) {
    console.error("Error registering widgets:", error);
    // Don't throw the error to avoid breaking the MCP server
  }
});

const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ["read:content"],
});

export const GET = authHandler;
export const POST = authHandler;
