/**
 * Common constants used across widgets and the application
 */

// Widget display modes
export const DISPLAY_MODES = {
  PIP: "pip",
  INLINE: "inline",
  FULLSCREEN: "fullscreen",
} as const;

// Widget domains for different environments
export const WIDGET_DOMAINS = {
  DEVELOPMENT: "http://localhost:3000",
  PRODUCTION: "https://nextjs.org/docs",
  STAGING: "https://staging.example.com",
} as const;

// Common MIME types
export const MIME_TYPES = {
  HTML_SKYBRIDGE: "text/html+skybridge",
  HTML: "text/html",
  JSON: "application/json",
  TEXT: "text/plain",
} as const;

// Widget metadata keys
export const WIDGET_META_KEYS = {
  OUTPUT_TEMPLATE: "openai/outputTemplate",
  TOOL_INVOCATION_INVOKING: "openai/toolInvocation/invoking",
  TOOL_INVOCATION_INVOKED: "openai/toolInvocation/invoked",
  WIDGET_ACCESSIBLE: "openai/widgetAccessible",
  RESULT_CAN_PRODUCE_WIDGET: "openai/resultCanProduceWidget",
  WIDGET_DESCRIPTION: "openai/widgetDescription",
  WIDGET_PREFERS_BORDER: "openai/widgetPrefersBorder",
  WIDGET_DOMAIN: "openai/widgetDomain",
} as const;

// Common widget configuration defaults
export const WIDGET_DEFAULTS = {
  WIDGET_ACCESSIBLE: false,
  RESULT_CAN_PRODUCE_WIDGET: true,
  WIDGET_PREFERS_BORDER: true,
  MAX_INPUT_LENGTH: 1000,
  MAX_OUTPUT_LENGTH: 10000,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_INPUT: "Invalid input provided",
  WIDGET_NOT_FOUND: "Widget not found",
  FETCH_ERROR: "Failed to fetch widget content",
  VALIDATION_ERROR: "Input validation failed",
  UNKNOWN_ERROR: "An unknown error occurred",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  WIDGET_LOADED: "Widget loaded successfully",
  CONTENT_UPDATED: "Content updated successfully",
  STATE_SAVED: "Widget state saved",
} as const;

// Common widget IDs (for reference)
export const WIDGET_IDS = {
  SHOW_CONTENT: "show_content",
  SHOW_PROFILE: "show_profile",
  // Add more widget IDs as they are created
} as const;

// API endpoints
export const API_ENDPOINTS = {
  MCP: "/mcp",
  OAUTH_AUTHORIZE: "/api/oauth/authorize",
  OAUTH_TOKEN: "/api/oauth/token",
  OAUTH_REGISTER: "/api/oauth/register",
} as const;

// Widget route patterns
export const WIDGET_ROUTES = {
  BASE: "/widgets",
  SHOW_CONTENT: "/widgets/show-content",
  SHOW_PROFILE: "/widgets/show-profile",
  // Add more widget routes as they are created
} as const;
