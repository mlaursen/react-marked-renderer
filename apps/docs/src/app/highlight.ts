import hljs from "highlight.js";

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

export const highlightCode: HighlightCode = (options) => {
  if (options.lang === "markup") {
    console.log("SKIP");
    return options.code;
  }
  console.log("highlighting...");
  return hljs.highlight(options.code, { language: options.lang }).value;
};
