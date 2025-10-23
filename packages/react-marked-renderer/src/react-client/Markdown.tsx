import { marked } from "marked";
import { type ReactElement, useMemo } from "react";

import { mergeRenderers } from "../mergeRenderers.js";
import { RenderTokens } from "../renderers/RenderTokens.js";
import { type MarkdownProps } from "../types.js";
import { context } from "./renderers.js";

export function Markdown({
  lexer = marked.lexer,
  options,
  renderers,
  markdown,
}: Readonly<MarkdownProps>): ReactElement {
  const tokens = lexer(markdown, options);
  const merged = useMemo(() => mergeRenderers(renderers), [renderers]);

  return (
    <context.Provider value={merged}>
      <RenderTokens tokens={tokens} renderers={merged} />
    </context.Provider>
  );
}
