import {
  type BundledLanguage,
  type BundledTheme,
  type CodeToHastOptions,
} from "shiki";

export const SHIKI_CONFIG = {
  themes: {
    light: "solarized-light",
    dark: "solarized-dark",
  },
  defaultColor: "light",
} satisfies Partial<CodeToHastOptions<BundledLanguage, BundledTheme>>;
