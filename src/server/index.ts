import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPTransport } from "@hono/mcp";
import { z } from "zod";
import {
  type Item,
  type ItemDetailOutput,
  type ItemListOutput,
} from "../types";
import { HOST_URL } from "../constants";

// Single widget URI for all tools
const WIDGET_URI = "ui://widget/index.html";

// Helper function to load widget HTML (reads pre-built HTML from dist/)
function loadWidgetHtml(): string {
  const htmlPath = resolve(process.cwd(), "dist/index.html");
  return readFileSync(htmlPath, "utf-8");
}

// Helper function to create widget metadata
function widgetMeta(invoking?: string, invoked?: string) {
  return {
    "openai/outputTemplate": WIDGET_URI,
    "openai/toolInvocation/invoking": invoking,
    "openai/toolInvocation/invoked": invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

// Initialize MCP server
const server = new McpServer({
  name: "healthify-mcp-server",
  version: "1.0.0",
});

// In-memory data store
const items: Record<string, Item> = {};

// Tool 1: List all items
server.registerTool(
  "list_items",
  {
    description: "List all items",
    inputSchema: {},
    outputSchema: {
      items: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          createdAt: z.string(),
        })
      ),
    },
    _meta: widgetMeta("Loading items", "Loaded items"),
  },
  async () => {
    const itemList = Object.values(items);

    return {
      structuredContent: {
        kind: "item_list",
        items: itemList,
      } as ItemListOutput,
      content: [
        {
          type: "text",
          text: `Found ${itemList.length} item${
            itemList.length === 1 ? "" : "s"
          }`,
        },
      ],
      _meta: widgetMeta(),
    };
  }
);

// Tool 2: Add a new item
server.registerTool(
  "add_item",
  {
    description: "Add a new item",
    inputSchema: {
      title: z.string().describe("Item title"),
      description: z.string().describe("Item description"),
    },
    outputSchema: {
      id: z.string(),
      title: z.string(),
      description: z.string(),
      createdAt: z.string(),
    },
    _meta: widgetMeta("Adding item", "Added item"),
  },
  async (args) => {
    const newItem: Item = {
      id: Math.random().toString(36).substring(7),
      title: args.title,
      description: args.description,
      createdAt: new Date().toISOString(),
    };

    items[newItem.id] = newItem;

    return {
      structuredContent: {
        kind: "item_detail",
        ...newItem,
      } as ItemDetailOutput,
      content: [
        {
          type: "text",
          text: `Added "${newItem.title}"`,
        },
      ],
      _meta: widgetMeta(),
    };
  }
);

// Register widget resource
server.registerResource(
  "widget",
  WIDGET_URI,
  {
    title: "Widget",
    description: "Interactive widget for items",
    mimeType: "text/html+skybridge",
    _meta: {
      "openai/widgetDescription": "Interactive widget for items",
      "openai/widgetPrefersBorder": true,
    },
  },
  async (uri: URL) => {
    const html = loadWidgetHtml();

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: html,
          _meta: {
            "openai/widgetDescription": "Interactive widget for items",
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": HOST_URL,
            "openai/widgetCSP": {
              connect_domains: [HOST_URL],
              resource_domains: [HOST_URL],
            },
          },
        },
      ],
    };
  }
);

// Create Hono app
const app = new Hono();

// MCP endpoint
app.all("/mcp", async (c) => {
  const transport = new StreamableHTTPTransport();
  await server.connect(transport);
  return transport.handleRequest(c);
});

// Serve static assets from dist/ with CORS headers
app.use("/*", cors());
app.use("/*", serveStatic({ root: "./dist" }));

export default app;
