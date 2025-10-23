// @ts-check
import { configs, defineConfig, gitignore } from "@mlaursen/eslint-config";
import { join } from "node:path";

export default defineConfig(
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.frontend("vitest")
);
