import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Enable relative paths for IPFS/PinMe deployment
  base: "./",
  
  plugins: [
    react(),
    cloudflare()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});