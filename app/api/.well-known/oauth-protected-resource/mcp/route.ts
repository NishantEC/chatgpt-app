import {
  protectedResourceHandler,
  metadataCorsOptionsRequestHandler,
} from "mcp-handler";

const baseUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || "http://localhost:3000";
const fullBaseUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

const handler = protectedResourceHandler({
  authServerUrls: [fullBaseUrl],
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };
