import { marked } from "marked";
import { type ReactElement } from "react";

import { mergeRenderers } from "../mergeRenderers.js";
import { RenderTokens } from "../renderers/RenderTokens.js";
import { type MarkdownProps } from "../types.js";
import { Provider } from "./renderers.js";

export function Markdown({
  lexer = marked.lexer,
  options,
  renderers,
  markdown,
}: Readonly<MarkdownProps>): ReactElement {
  const tokens = lexer(markdown, options);
  const merged = mergeRenderers(renderers);

  return (
    <Provider value={merged}>
      <RenderTokens tokens={tokens} renderers={merged} />
    </Provider>
  );
}
