# Widget Architecture

This directory contains the modular widget system for the ChatGPT Apps SDK. Each widget is self-contained with co-located backend and frontend code.

## Directory Structure

```
/app/
  /widgets/               # Widget system
    /show-content/        # Example widget
      - handler.ts        # MCP tool & resource registration
      - ui.tsx           # Widget UI component
      - types.ts         # Widget-specific types
      - page.tsx         # Next.js route at /widgets/show-content
    /[widget-name]/       # Future widgets follow this pattern
      - handler.ts
      - ui.tsx
      - types.ts
      - page.tsx
    - types.ts           # Shared widget types
    - registry.ts        # Widget registration system
    - README.md          # This documentation
  /utils/                # Common utilities
    - index.ts           # Export all utilities
    - html.ts            # HTML processing utilities
    - validation.ts      # Input validation utilities
    - formatting.ts      # Data formatting utilities
    - constants.ts       # Application constants
```

## Creating a New Widget

### 1. Create Widget Directory

Create a new directory under `/app/widgets/` with your widget name:

```bash
mkdir /app/widgets/my-widget
```

### 2. Define Types (`types.ts`)

```typescript
import { z } from "zod";

// Input schema for the tool
export const MyWidgetInputSchema = {
  param1: z.string().describe("Description of param1"),
  param2: z.number().describe("Description of param2"),
};

// Input/Output types
export interface MyWidgetInput {
  param1: string;
  param2: number;
}

export interface MyWidgetOutput {
  result: string;
  timestamp: string;
}

// Widget configuration
export const myWidgetConfig = {
  id: "my_widget",
  title: "My Widget",
  description: "Description of what this widget does",
  templateUri: "ui://widget/my-widget-template.html",
  invoking: "Loading my widget...",
  invoked: "My widget loaded",
  widgetDomain: "https://example.com",
};
```

### 3. Create Handler (`handler.ts`)

```typescript
import { baseUrl } from "@/baseUrl";
import { createWidgetMeta } from "../types";
import {
  myWidgetConfig,
  type MyWidgetInput,
  type MyWidgetOutput,
} from "./types";
import { registerWidget } from "../registry";
import { fetchHtmlContent, wrapHtmlContent } from "../../utils";
import {
  MIME_TYPES,
  WIDGET_META_KEYS,
  WIDGET_DEFAULTS,
} from "../../utils/constants";

// Tool handler function
const handleMyWidget = async ({ param1, param2 }: MyWidgetInput) => {
  // Your widget logic here
  const result = `Processed ${param1} with ${param2}`;

  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
    structuredContent: {
      result,
      timestamp: new Date().toISOString(),
    } as MyWidgetOutput,
    _meta: createWidgetMeta(myWidgetConfig),
  };
};

// Resource provider function
const provideMyWidgetResource = async (uri: URL) => {
  const html = await fetchHtmlContent(baseUrl, "/widgets/my-widget");

  return {
    contents: [
      {
        uri: uri.href,
        mimeType: MIME_TYPES.HTML_SKYBRIDGE,
        text: wrapHtmlContent(html),
        _meta: {
          [WIDGET_META_KEYS.WIDGET_DESCRIPTION]: myWidgetConfig.description,
          [WIDGET_META_KEYS.WIDGET_PREFERS_BORDER]:
            WIDGET_DEFAULTS.WIDGET_PREFERS_BORDER,
          [WIDGET_META_KEYS.WIDGET_DOMAIN]: myWidgetConfig.widgetDomain,
        },
      },
    ],
  };
};

// Main registration function
export async function registerMyWidget(server: any): Promise<void> {
  await registerWidget(
    server,
    myWidgetConfig,
    {
      param1: {
        type: "string",
        description: "Description of param1",
      },
      param2: {
        type: "number",
        description: "Description of param2",
      },
    },
    handleMyWidget,
    provideMyWidgetResource
  );
}
```

### 4. Create UI Component (`ui.tsx`)

```typescript
"use client";

import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
} from "../../hooks";

export default function MyWidgetUI() {
  const toolOutput = useWidgetProps<{ result?: string }>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const requestDisplayMode = useRequestDisplayMode();

  return (
    <div
      className="font-sans p-8"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      {/* Your widget UI here */}
      <h1>My Widget</h1>
      <p>Result: {toolOutput?.result ?? "..."}</p>

      {/* Fullscreen button if needed */}
      {displayMode !== "fullscreen" && (
        <button
          onClick={() => requestDisplayMode("fullscreen")}
          className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {/* Fullscreen icon */}
        </button>
      )}
    </div>
  );
}
```

### 5. Create Page Route (`page.tsx`)

```typescript
import MyWidgetUI from "./ui";

export default function MyWidgetPage() {
  return <MyWidgetUI />;
}
```

### 6. Register Widget

Add your widget to `/app/mcp/route.ts`:

```typescript
import { registerMyWidget } from "../widgets/my-widget/handler";

const handler = createMcpHandler(async (server) => {
  await registerShowContentWidget(server);
  await registerMyWidget(server); // Add your widget here
});
```

## Widget Features

### Dual Rendering

- **ChatGPT Integration**: Widgets are rendered as static HTML for ChatGPT via MCP
- **Browser Access**: Widgets are also accessible as React pages at `/widgets/[widget-name]`
- **Dynamic Content**: The MCP handler fetches the rendered HTML from the widget page

### Available Hooks

- `useWidgetProps<T>()` - Access tool input/output data
- `useWidgetState<T>()` - Manage widget state
- `useCallTool()` - Call other MCP tools from within widgets
- `useDisplayMode()` - Get current display mode (pip/inline/fullscreen)
- `useRequestDisplayMode()` - Request display mode changes
- `useMaxHeight()` - Get maximum height constraint

### Utilities

The `/app/utils/` directory provides common utilities for widgets:

#### HTML Utilities (`utils/html.ts`)

- `fetchHtmlContent()` - Safely fetch HTML content from URLs
- `wrapHtmlContent()` - Wrap HTML with proper structure
- `sanitizeHtml()` - Sanitize HTML for safe display
- `createHtmlDocument()` - Create complete HTML documents

#### Validation Utilities (`utils/validation.ts`)

- `validateWidgetInput()` - Validate widget inputs with Zod schemas
- `createSafeInputSchema()` - Create type-safe input schemas
- `validateWidgetId()` - Validate widget ID format
- `validateTemplateUri()` - Validate template URI format

#### Formatting Utilities (`utils/formatting.ts`)

- `formatTimestamp()` - Format timestamps for display
- `truncateText()` - Truncate text with ellipsis
- `capitalize()` - Capitalize strings
- `formatNumber()` - Format numbers with commas
- `formatFileSize()` - Format file sizes
- `formatDuration()` - Format durations

#### Constants (`utils/constants.ts`)

- `WIDGET_META_KEYS` - OpenAI metadata keys
- `MIME_TYPES` - Common MIME types
- `WIDGET_DEFAULTS` - Default widget settings
- `ERROR_MESSAGES` - Standard error messages
- `API_ENDPOINTS` - API endpoint constants

### Best Practices

1. **Keep widgets focused**: Each widget should have a single, clear purpose
2. **Use TypeScript**: Define proper types for inputs, outputs, and configurations
3. **Handle errors gracefully**: Widgets should work even with missing or invalid data
4. **Test both contexts**: Ensure widgets work both in ChatGPT and as standalone pages
5. **Follow naming conventions**: Use kebab-case for directories, snake_case for widget IDs

## Example Widgets

- **show-content**: Displays homepage content with user name input
- **calendar**: (Future) Calendar widget for date/time selection
- **weather**: (Future) Weather information display
- **todo-list**: (Future) Task management widget

## Troubleshooting

### Widget not appearing in ChatGPT

- Check that the widget is registered in `/app/mcp/route.ts`
- Verify the MCP server is running and accessible
- Check browser console for errors

### Widget UI not loading

- Ensure the widget page route is correct (`/widgets/[widget-name]`)
- Check that the UI component is properly exported
- Verify all required hooks are imported

### Type errors

- Make sure all types are properly defined in `types.ts`
- Check that input/output types match between handler and UI
- Verify Zod schemas match TypeScript interfaces
