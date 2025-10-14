import devServer from "@hono/vite-dev-server";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { HOST_URL } from "./src/constants";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: "src/server/index.ts",
      exclude: [/.*\.tsx?$/, /.*\.(s?css|less)$/, /public\/.*/],
    }),
  ],
  server: {
    allowedHosts: true,
  },
  base: `${HOST_URL}/`,
  define: {
    "import.meta.env.HOST_URL": JSON.stringify(HOST_URL),
  },
});
