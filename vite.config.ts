import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ZeroReuse AI",
        short_name: "ZR AI",
        description: "Privacy-first AI image protection system",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/zr-192.png", sizes: "192x192", type: "image/png" },
          { src: "/zr-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});
