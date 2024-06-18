import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
     // add this to cache all the imports
    workbox: {
      globPatterns: ["**/*"],
  },
  // add this to cache all the
  // static assets in the public folder
  includeAssets: [
      "**/*",
  ],
        manifest: {
          "name": "Egypt Here: An E-Tourism Web app",
          "short_name": "Egypt Here",
          "description": "Our E-Tourism website serves as a dedicated online hub, offering extensive travel insights and services tailored to tourists exploring Egypt",
          "theme_color": "#9ab8dc",
          "background_color": "#9ab8dc",
          "display": "fullscreen",
          "scope": "/",
          "start_url": "/",
          "orientation": "portrait",
          "icons": [
            {
              "src": "public/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "public/manifest-icon-192.maskable.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "public/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "public/manifest-icon-512.maskable.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "/icon-256x256.png",
              "sizes": "256x256",
              "type": "image/png"
            },
            {
              "src": "/icon-384x384.png",
              "sizes": "384x384",
              "type": "image/png"
            }
          ]
        }
})],
})
