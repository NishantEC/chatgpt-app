import {
  protectedResourceHandler,
  metadataCorsOptionsRequestHandler,
} from "mcp-handler";

const baseUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000";

const handler = protectedResourceHandler({
  authServerUrls: [`${baseUrl}/api/oauth`],
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
