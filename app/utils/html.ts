/**
 * HTML utility functions for widget rendering
 */

/**
 * Fetches HTML content from a given URL
 * Used by widgets to get their rendered HTML for ChatGPT integration
 */
export async function fetchHtmlContent(
  baseUrl: string,
  path: string
): Promise<string> {
  try {
    const result = await fetch(`${baseUrl}${path}`);
    if (!result.ok) {
      throw new Error(`Failed to fetch HTML from ${path}: ${result.status}`);
    }
    return await result.text();
  } catch (error) {
    console.error(`Error fetching HTML from ${path}:`, error);
    throw error;
  }
}

/**
 * Wraps HTML content with proper HTML structure
 * Ensures the content is valid HTML for ChatGPT display
 */
export function wrapHtmlContent(html: string): string {
  return `<html>${html}</html>`;
}

/**
 * Sanitizes HTML content for safe display
 * Removes potentially dangerous scripts and content
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/javascript:/gi, "");
}

/**
 * Creates a complete HTML document with proper structure
 */
export function createHtmlDocument(content: string, title?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Widget"}</title>
</head>
<body>
  ${content}
</body>
</html>`;
}
