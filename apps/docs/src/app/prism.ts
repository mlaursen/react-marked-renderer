import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-git";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

export type SupportedCodeLanguage =
  | "css"
  | "scss"
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "html"
  | "json"
  | "sh"
  | "diff"
  | ({} & string);

export interface TransformCodeOptions {
  code: string;
  lang: SupportedCodeLanguage;
}

export type FormatCode = (options: TransformCodeOptions) => Promise<string>;
export type HighlightCode = (options: TransformCodeOptions) => string;

Prism.manual = true;

export const highlightCode: HighlightCode = (options): string => {
  const { code, lang } = options;
  return Prism.highlight(code, Prism.languages[lang], lang);
};
