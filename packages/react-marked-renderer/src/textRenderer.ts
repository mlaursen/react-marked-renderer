import type { TextRenderer, Tokens } from "marked";

export const textRenderer: TextRenderer = {
  strong({ text }: Tokens.Strong): string {
    return text;
  },
  em({ text }: Tokens.Em): string {
    return text;
  },
  codespan({ text }: Tokens.Codespan): string {
    return text;
  },
  del({ text }: Tokens.Del): string {
    return text;
  },
  html({ text }: Tokens.HTML | Tokens.Tag): string {
    return text;
  },
  text({ text }: Tokens.Text | Tokens.Escape | Tokens.Tag): string {
    return text;
  },
  link({ text }: Tokens.Link): string {
    return text;
  },
  image({ text }: Tokens.Image): string {
    return text;
  },
  br(): string {
    return "";
  },
};
