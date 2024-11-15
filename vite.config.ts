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
        short_name: "Ammper",
        name: "Ammper",
        icons: [
          {
            src: "fav.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "m.png",
            sizes: "1920x1080",
            // form_factor: "wide",
            type: "image/png",
          },
          {
            src: "m.png",
            sizes: "1080x1920",
            // form_factor: "narrow",
            type: "image/png",
          },
          {
            src: "m.png",
            sizes: "32X32",
            type: "image/png",
            // form_factor: "narrow",
          },
          {
            src: "m.png",
            sizes: "512x512",
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
        theme_color: "#ED4046",
        background_color: "#ED4046",
      },
    }),
  ],
});
