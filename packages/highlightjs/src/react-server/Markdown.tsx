import type { ReactElement } from "react";
import {
  type MarkdownProps,
  Markdown as ReactMarkdown,
} from "react-marked-renderer";

import { RenderHighlightJsCode } from "./RenderHighlightJs.js";

export function Markdown(props: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      {...props}
      renderers={{
        code: RenderHighlightJsCode,
        ...props.renderers,
      }}
    />
  );
}
