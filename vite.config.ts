import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
 plugins: [
  react(),
  VitePWA({
   manifest: {
    name: "Vite-React-PWA-demo",
    short_name: "Vite-React-PWA",
    description: "PWA built with React and Vite",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
     {
      src: "/icons/logo48.png",
      type: "image/png",
      sizes: "48x48",
     },
     {
      src: "/icons/logo72.png",
      type: "image/png",
      sizes: "72x72",
     },
     {
      src: "/icons/logo96.png",
      type: "image/png",
      sizes: "96x96",
     },
     {
      src: "/icons/logo144.png",
      type: "image/png",
      sizes: "144x144",
     },
     {
      src: "/icons/logo192.png",
      type: "image/png",
      sizes: "192x192",
     },
     {
      src: "/icons/logo512.png",
      type: "image/png",
      sizes: "512x512",
     },
    ],
   },
   registerType: "autoUpdate",
   workbox: {
    runtimeCaching: [
     {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: "NetworkOnly",
     },
     {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkOnly",
     },
    ],
   },
  }),
 ],
 resolve: {
  alias: {
   "@": path.resolve(__dirname, "./src"),
  },
 },
});
