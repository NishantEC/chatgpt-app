import { z } from "zod";

/**
 * Validation utilities for widget inputs and outputs
 */

/**
 * Common validation schemas that can be reused across widgets
 */
export const commonSchemas = {
  // String with length constraints
  string: (minLength = 1, maxLength = 1000) =>
    z.string().min(minLength).max(maxLength),

  // Email validation
  email: z.string().email(),

  // URL validation
  url: z.string().url(),

  // Positive number
  positiveNumber: z.number().positive(),

  // Date string (ISO format)
  dateString: z.string().datetime(),

  // Optional string
  optionalString: z.string().optional(),

  // Optional number
  optionalNumber: z.number().optional(),
};

/**
 * Validates widget input against a schema
 */
export function validateWidgetInput<T>(
  input: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  try {
    const data = schema.parse(input);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      return { success: false, error: errorMessage };
    }
    return { success: false, error: "Unknown validation error" };
  }
}

/**
 * Creates a safe input schema with common constraints
 */
export function createSafeInputSchema<T extends Record<string, z.ZodTypeAny>>(
  schema: T
): z.ZodObject<T> {
  return z.object(schema);
}

/**
 * Validates that a widget ID follows the naming convention
 */
export function validateWidgetId(id: string): boolean {
  // Widget IDs should be snake_case, alphanumeric with underscores
  const widgetIdPattern = /^[a-z][a-z0-9_]*[a-z0-9]$/;
  return widgetIdPattern.test(id) && id.length >= 3 && id.length <= 50;
}

/**
 * Validates that a template URI follows the expected format
 */
export function validateTemplateUri(uri: string): boolean {
  // Template URIs should start with "ui://widget/"
  return uri.startsWith("ui://widget/") && uri.length > 12;
}
