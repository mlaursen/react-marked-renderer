import Prism from "prismjs";
import React, { ReactElement } from "react";

import { DangerouslyHighlightCode, GetCodeLanguage, Markdown } from "../src";
import styles from "./MarkdownPreview.module.scss";
import { renderers } from "./renderers";
import type { MarkdownPreviewProps } from "./useConfig";

const getLanguage: GetCodeLanguage = (lang) => {
  lang = lang === "sh" ? "bash" : lang;
  if (!Prism.languages[lang]) {
    return "";
  }

  return lang;
};

const highlightCode: DangerouslyHighlightCode = (code, lang) =>
  Prism.highlight(code, Prism.languages[lang], lang);

export function MarkdownPreview({
  markdown,
  customRenderers,
}: MarkdownPreviewProps): ReactElement {
  return (
    <div className={styles.container}>
      <Markdown
        markdown={markdown}
        renderers={customRenderers ? renderers : undefined}
        getLanguage={getLanguage}
        highlightCode={highlightCode}
      />
    </div>
  );
}
