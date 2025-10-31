import type { ReactElement } from "react";
import {
  type MarkdownProps,
  Markdown as ReactMarkdown,
} from "react-marked-renderer";

import { RenderPrismJs } from "./RenderPrismJs.js";

/**
 * @see {@link ReactMarkdown} for examples
 */
export function Markdown(props: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      {...props}
      renderers={{
        code: RenderPrismJs,
        ...props.renderers,
      }}
    />
  );
}
