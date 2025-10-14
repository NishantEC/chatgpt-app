import { z } from "zod";

// Input schema for the show_content tool
export const ShowContentInputSchema = {
  name: z.string().describe("The name of the user to display on the homepage"),
};

// Input type for the show_content tool
export interface ShowContentInput {
  name: string;
}

// Output type for the show_content tool
export interface ShowContentOutput {
  name: string;
  timestamp: string;
}

// Widget configuration for show-content
export const showContentWidget = {
  id: "show_content",
  title: "Show Content",
  description:
    "Fetch and display the homepage content with the name of the user",
  templateUri: "ui://widget/content-template.html",
  invoking: "Loading content...",
  invoked: "Content loaded",
  widgetDomain: "https://nextjs.org/docs",
};
