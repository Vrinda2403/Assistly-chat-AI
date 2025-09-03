import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Vercel expects this
  },
  server: {
    port: 5173, // optional, for local dev
    open: true, // auto-open browser when running `npm run dev`
  },
  resolve: {
    alias: {
      "@": "/src", // lets you import like "@/components/Chat"
    },
  },
});
