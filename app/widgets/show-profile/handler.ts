import { createWidgetMeta } from "../types";
import {
  showProfileWidget,
  type ShowProfileInput,
  type ShowProfileOutput,
} from "./types";
import { registerWidget } from "../registry";
import { fetchHtmlContent, wrapHtmlContent } from "../../utils";
import {
  MIME_TYPES,
  WIDGET_META_KEYS,
  WIDGET_DEFAULTS,
} from "../../utils/constants";

// Tool handler for show_profile
const handleShowProfile = async ({}: ShowProfileInput) => {
  // In a real implementation, you would get this from the auth context
  // For now, we'll return mock data that matches the auth structure
  const profileData = {
    userId: "admin",
    email: "admin@example.com",
    token: "test-bearer-token-12345",
    scopes: ["read:content", "write:content"],
    timestamp: new Date().toISOString(),
  };

  return {
    content: [
      {
        type: "text",
        text: `Profile for ${profileData.email}`,
      },
    ],
    structuredContent: profileData as ShowProfileOutput,
    _meta: createWidgetMeta(showProfileWidget),
  };
};

// Resource provider for show_profile widget
const provideShowProfileResource = async (uri: URL) => {
  try {
    // Use the correct base URL and fetch the actual widget page
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://nextjs.org/docs";

    const html = await fetchHtmlContent(baseUrl, "/widgets/show-profile");

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: MIME_TYPES.HTML_SKYBRIDGE,
          text: wrapHtmlContent(html),
          _meta: {
            [WIDGET_META_KEYS.WIDGET_DESCRIPTION]:
              showProfileWidget.description,
            [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
              WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
            [WIDGET_META_KEYS.WIDGET_DOMAIN]: showProfileWidget.widgetDomain,
          },
        },
      ],
    };
  } catch (error) {
    console.error("Failed to fetch widget HTML:", error);
    // Fallback to a simple HTML response if fetching fails
    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Profile Widget</title></head>
        <body>
          <h1>User Profile Widget</h1>
          <p>This widget displays authenticated user information.</p>
          <p>Error: Unable to fetch widget content. Please try again later.</p>
        </body>
      </html>
    `;

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: MIME_TYPES.HTML_SKYBRIDGE,
          text: fallbackHtml,
          _meta: {
            [WIDGET_META_KEYS.WIDGET_DESCRIPTION]:
              showProfileWidget.description,
            [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
              WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
            [WIDGET_META_KEYS.WIDGET_DOMAIN]: showProfileWidget.widgetDomain,
          },
        },
      ],
    };
  }
};

// Main registration function for show-profile widget
export async function registerShowProfileWidget(server: any): Promise<void> {
  await registerWidget(
    server,
    showProfileWidget,
    {
      // Empty input schema but with proper structure
      type: "object",
      properties: {},
      required: [],
    },
    handleShowProfile,
    provideShowProfileResource
  );
}
