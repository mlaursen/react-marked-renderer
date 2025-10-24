import { marked } from "marked";
import { type ReactElement, useMemo } from "react";

import { mergeRenderers } from "./mergeRenderers.js";
import { RenderTokens } from "./renderers/RenderTokens.js";
import { type MarkdownProps } from "./types.js";

export function Markdown({
  lexer = marked.lexer,
  options,
  renderers,
  markdown,
}: Readonly<MarkdownProps>): ReactElement {
  const tokens = useMemo(
    () => lexer(markdown, options),
    [lexer, markdown, options]
  );
  const merged = useMemo(() => mergeRenderers(renderers), [renderers]);

  return <RenderTokens tokens={tokens} renderers={merged} />;
}
