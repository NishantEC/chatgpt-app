import { z } from "zod";

// Input schema for the show_profile tool
export const ShowProfileInputSchema = {
  // No input required - we'll get user info from auth context
};

// Input type for the show_profile tool
export interface ShowProfileInput {
  // No input parameters needed
}

// Output type for the show_profile tool
export interface ShowProfileOutput {
  userId: string;
  email: string;
  token: string;
  scopes: string[];
  timestamp: string;
}

// Widget configuration for show-profile
export const showProfileWidget = {
  id: "show_profile",
  title: "Show Profile",
  description: "Display the authenticated user's profile information including token and details",
  templateUri: "ui://widget/profile-template.html",
  invoking: "Loading profile...",
  invoked: "Profile loaded",
  widgetDomain: "https://nextjs.org/docs",
};
