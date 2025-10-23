import { DEFAULT_MARKDOWN_RENDERERS } from "../constants.js";
import { type MarkdownRenderers } from "../types.js";
import { createServerContext } from "./context.js";

export const { Provider, useContext } = createServerContext<MarkdownRenderers>(
  DEFAULT_MARKDOWN_RENDERERS
);
