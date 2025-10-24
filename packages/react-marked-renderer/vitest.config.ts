import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: resolve(import.meta.dirname, "src/testSetup.ts"),
    // I do not like having tests in the same folders as the rest of the files
    include: ["**/__tests__/*.{ts,tsx}"],
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/mocks/**", "**/types.ts", "src/testSetup.ts"],
    },
  },
});
