import { baseUrl } from "@/baseUrl";
import { createWidgetMeta } from "../types";
import {
  showContentWidget,
  type ShowContentInput,
  type ShowContentOutput,
} from "./types";
import { registerWidget } from "../registry";
import { fetchHtmlContent, wrapHtmlContent } from "../../utils";
import {
  MIME_TYPES,
  WIDGET_META_KEYS,
  WIDGET_DEFAULTS,
} from "../../utils/constants";

// Tool handler for show_content
const handleShowContent = async ({ name }: ShowContentInput) => {
  return {
    content: [
      {
        type: "text",
        text: name,
      },
    ],
    structuredContent: {
      name: name,
      timestamp: new Date().toISOString(),
    } as ShowContentOutput,
    _meta: createWidgetMeta(showContentWidget),
  };
};

// Resource provider for show_content widget
const provideShowContentResource = async (uri: URL) => {
  try {
    const html = await fetchHtmlContent(baseUrl, "/widgets/show-content");

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: MIME_TYPES.HTML_SKYBRIDGE,
          text: wrapHtmlContent(html),
          _meta: {
            [WIDGET_META_KEYS.WIDGET_DESCRIPTION]:
              showContentWidget.description,
            [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
              WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
            [WIDGET_META_KEYS.WIDGET_DOMAIN]: showContentWidget.widgetDomain,
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
        <head><title>Content Widget</title></head>
        <body>
          <h1>Show Content Widget</h1>
          <p>This widget displays homepage content with user name.</p>
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
              showContentWidget.description,
            [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
              WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
            [WIDGET_META_KEYS.WIDGET_DOMAIN]: showContentWidget.widgetDomain,
          },
        },
      ],
    };
  }
};

// Main registration function for show-content widget
export async function registerShowContentWidget(server: any): Promise<void> {
  await registerWidget(
    server,
    showContentWidget,
    {
      name: {
        type: "string",
        description: "The name of the user to display on the homepage",
      },
    },
    handleShowContent,
    provideShowContentResource
  );
}
