export const HOST_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.HOST_URL || "https://ed4df19a03a9.ngrok-free.app";
