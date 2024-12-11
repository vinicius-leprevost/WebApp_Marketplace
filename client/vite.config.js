import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `https://webapp-marketplace-backend2.onrender.com/`,
        changeOrigin: true,
      },
      '/auth': {
        target: `https://webapp-marketplace-backend2.onrender.com/`,
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});
