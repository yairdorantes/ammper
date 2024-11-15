import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
// import { VitePWA } from "vite-plugin-pwa/dist/index.cjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MB
        globPatterns: ["**/*"],
      },
      devOptions: {
        enabled: true,
        // type: "module",
      },
      // add this to cache all the imports
      // workbox: {
      //   globPatterns: ["**/*"],
      // },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      registerType: "autoUpdate",
      manifest: {
        short_name: "Eurocotton Fulfillment",
        name: "Eurocotton Fulfillment",
        icons: [
          {
            src: "fav.png",
            sizes: "192x192",
            type: "image/png",
          },
          // {
          //   src: "/oms2.png",
          //   type: "image/png",
          //   sizes: "512x512",
          // },
          // {
          //   src: "/oms2.png",
          //   type: "image/png",
          //   sizes: "512x512",
          // },
        ],
        // start_url: ".",
        start_url: "/",
        display: "standalone",
        theme_color: "#0041a1",
        background_color: "#0041a1",
      },
    }),
  ],
});
