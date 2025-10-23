import { type MarkdownRenderers } from "react-marked-renderer";

import { highlightCode } from "./highlight";
// import { highlightCode } from "./prism";
import { CUSTOM_RENDERERS } from "./renderers";

export const SERVER_RENDERERS = {
  ...CUSTOM_RENDERERS,
  code: function RenderCode({ lang = "markdown", text }) {
    const code = highlightCode({ code: text, lang });
    return (
      <pre className={`language-${lang} hljs`}>
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    );
  },
} satisfies Partial<MarkdownRenderers>;
