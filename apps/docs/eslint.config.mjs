// @ts-check
import { configs, defineConfig, gitignore } from "@mlaursen/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig(
  nextPlugin.configs["core-web-vitals"],
  gitignore(import.meta.url),
  ...configs.frontend("vitest"),
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
    },
  }
);
