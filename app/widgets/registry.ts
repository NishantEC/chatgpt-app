import type {
  WidgetConfig,
  WidgetMeta,
  WidgetRegistrationFunction,
} from "./types";
import {
  MIME_TYPES,
  WIDGET_META_KEYS,
  WIDGET_DEFAULTS,
} from "../utils/constants";

/**
 * Centralized widget registration system
 * Provides helper functions for registering widgets with MCP server
 */

// Helper function to register a widget's resource
export async function registerWidgetResource(
  server: any,
  widget: WidgetConfig,
  resourceProvider: (uri: URL) => Promise<{
    contents: Array<{
      uri: string;
      mimeType: string;
      text: string;
      _meta: Record<string, unknown>;
    }>;
  }>
): Promise<void> {
  server.registerResource(
    `${widget.id}-widget`,
    widget.templateUri,
    {
      title: widget.title,
      description: widget.description,
      mimeType: MIME_TYPES.HTML_SKYBRIDGE,
      _meta: {
        [WIDGET_META_KEYS.WIDGET_DESCRIPTION]: widget.description,
        [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
          WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
      },
    },
    resourceProvider
  );
}

// Helper function to register a widget's tool
export async function registerWidgetTool(
  server: any,
  widget: WidgetConfig,
  inputSchema: Record<string, any>,
  toolHandler: (input: any) => Promise<{
    content: Array<{ type: string; text: string }>;
    structuredContent: any;
    _meta: WidgetMeta;
  }>
): Promise<void> {
  // @ts-ignore ignore zod type error
  server.registerTool(
    widget.id,
    {
      title: widget.title,
      description: widget.description,
      inputSchema,
      _meta: {
        [WIDGET_META_KEYS.OUTPUT_TEMPLATE]: widget.templateUri,
        [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKING]: widget.invoking,
        [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKED]: widget.invoked,
        [WIDGET_META_KEYS.WIDGET_ACCESSIBLE]: WIDGET_DEFAULTS.WIDGET_ACCESSIBLE,
        [WIDGET_META_KEYS.RESULT_CAN_PRODUCE_WIDGET]:
          WIDGET_DEFAULTS.RESULT_CAN_PRODUCE_WIDGET,
      },
    },
    toolHandler
  );
}

// Main widget registration function
export async function registerWidget(
  server: any,
  widget: WidgetConfig,
  inputSchema: Record<string, any>,
  toolHandler: (input: any) => Promise<{
    content: Array<{ type: string; text: string }>;
    structuredContent: any;
    _meta: WidgetMeta;
  }>,
  resourceProvider: (uri: URL) => Promise<{
    contents: Array<{
      uri: string;
      mimeType: string;
      text: string;
      _meta: Record<string, unknown>;
    }>;
  }>
): Promise<void> {
  // Register both tool and resource
  await registerWidgetTool(server, widget, inputSchema, toolHandler);
  await registerWidgetResource(server, widget, resourceProvider);
}
