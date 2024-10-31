import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode === "production" ? "prod" : "", process.cwd());

  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    // Example: set base path or other config options using env variables
    base: env.VITE_BASE_URL || "/",
  };
});
