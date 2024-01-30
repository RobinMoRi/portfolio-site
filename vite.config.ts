import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const __dirname = path.resolve(path.dirname(""));
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  server: {
    host: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
