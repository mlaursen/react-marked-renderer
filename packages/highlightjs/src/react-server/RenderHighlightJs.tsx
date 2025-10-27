import hljs from "highlight.js";
import type { ReactElement } from "react";
import type { RenderCodeProps } from "react-marked-renderer";

export function RenderHighlightJsCode({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): ReactElement {
  const language = hljs.getLanguage(lang) ? lang : "plaintext";

  return (
    <pre>
      <code
        className={`hljs language-${language}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(text, { language }).value,
        }}
      />
    </pre>
  );
}
