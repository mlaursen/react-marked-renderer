// @ts-check
import { configs } from "@mlaursen/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**", "types/**"]),
  ...configs.frontend("vitest", true),
]);
