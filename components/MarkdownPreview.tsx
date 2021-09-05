import Prism from "prismjs";
import React, { ReactElement } from "react";

import { DangerouslyHighlightCode, GetCodeLanguage, Markdown } from "../src";
import styles from "./MarkdownPreview.module.scss";
import { renderers } from "./renderers";

export interface MarkdownPreviewProps {
  markdown: string;
  customRenderers: boolean;
}

const getLanguage: GetCodeLanguage = (lang) => {
  lang = lang === "sh" ? "bash" : lang;
  if (!Prism.languages[lang]) {
    return "markup";
  }

  return lang;
};

const highlightCode: DangerouslyHighlightCode = (code, lang) => {
  return Prism.highlight(code, Prism.languages[lang], lang);
};

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
