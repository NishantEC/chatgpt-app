import { z } from "zod";
import { WIDGET_DEFAULTS, WIDGET_META_KEYS } from "../utils/constants";

// Base widget configuration interface
export interface WidgetConfig {
  id: string;
  title: string;
  description: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  widgetDomain: string;
}

// Widget metadata for OpenAI integration
export interface WidgetMeta {
  [WIDGET_META_KEYS.OUTPUT_TEMPLATE]: string;
  [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKING]: string;
  [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKED]: string;
  [WIDGET_META_KEYS.WIDGET_ACCESSIBLE]: boolean;
  [WIDGET_META_KEYS.RESULT_CAN_PRODUCE_WIDGET]: boolean;
}

// Tool handler function type
export type WidgetToolHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput
) => Promise<{
  content: Array<{ type: string; text: string }>;
  structuredContent: TOutput;
  _meta: WidgetMeta;
}>;

// Resource provider function type
export type WidgetResourceProvider = (uri: URL) => Promise<{
  contents: Array<{
    uri: string;
    mimeType: string;
    text: string;
    _meta: Record<string, unknown>;
  }>;
}>;

// Widget registration function type
export type WidgetRegistrationFunction = (server: any) => Promise<void>;

// Helper function to create widget metadata
export function createWidgetMeta(widget: WidgetConfig): WidgetMeta {
  return {
    [WIDGET_META_KEYS.OUTPUT_TEMPLATE]: widget.templateUri,
    [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKING]: widget.invoking,
    [WIDGET_META_KEYS.TOOL_INVOCATION_INVOKED]: widget.invoked,
    [WIDGET_META_KEYS.WIDGET_ACCESSIBLE]: WIDGET_DEFAULTS.WIDGET_ACCESSIBLE,
    [WIDGET_META_KEYS.RESULT_CAN_PRODUCE_WIDGET]:
      WIDGET_DEFAULTS.RESULT_CAN_PRODUCE_WIDGET,
  } as const;
}

// Helper function to create widget configuration
export function createWidgetConfig(config: WidgetConfig): WidgetConfig {
  return {
    id: config.id,
    title: config.title,
    description: config.description,
    templateUri: config.templateUri,
    invoking: config.invoking,
    invoked: config.invoked,
    widgetDomain: config.widgetDomain,
  };
}

// Common input/output types
export interface BaseToolInput {
  [key: string]: unknown;
}

export interface BaseToolOutput {
  [key: string]: unknown;
  timestamp: string;
}
