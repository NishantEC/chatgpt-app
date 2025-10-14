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
  const html = await fetchHtmlContent(
    process.env.NODE_ENV === "development" 
      ? "http://localhost:3000" 
      : "https://nextjs.org/docs", 
    "/widgets/show-profile"
  );

  return {
    contents: [
      {
        uri: uri.href,
        mimeType: MIME_TYPES.HTML_SKYBRIDGE,
        text: wrapHtmlContent(html),
        _meta: {
          [WIDGET_META_KEYS.WIDGET_DESCRIPTION]: showProfileWidget.description,
          [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
            WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
          [WIDGET_META_KEYS.WIDGET_DOMAIN]: showProfileWidget.widgetDomain,
        },
      },
    ],
  };
};

// Main registration function for show-profile widget
export async function registerShowProfileWidget(server: any): Promise<void> {
  await registerWidget(
    server,
    showProfileWidget,
    {}, // No input schema needed
    handleShowProfile,
    provideShowProfileResource
  );
}
