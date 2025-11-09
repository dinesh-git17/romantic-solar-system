// vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          "three-core": ["three"],
          "three-fiber": ["@react-three/fiber", "@react-three/drei"],
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});
