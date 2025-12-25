import Prism from "prismjs";
import type { ReactElement } from "react";

import type { DangerouslyHighlightCode, GetCodeLanguage } from "../src";
import { Markdown } from "../src";
import styles from "./MarkdownPreview.module.scss";
import { renderers } from "./renderers";
import { usePlayground } from "./usePlayground";

const getLanguage: GetCodeLanguage = (lang) => {
  lang = lang === "sh" ? "bash" : lang;
  if (!Prism.languages[lang]) {
    return "none";
  }

  return lang;
};

const highlightCode: DangerouslyHighlightCode = (code, lang) =>
  Prism.highlight(code, Prism.languages[lang], lang);

export function MarkdownPreview(): ReactElement {
  const { markdown, customRenderers } = usePlayground();
  return (
    <output
      aria-label="Preview"
      id="preview-panel"
      htmlFor="markdown-editor"
      className={styles.container}
    >
      <Markdown
        markdown={markdown}
        renderers={customRenderers ? renderers : undefined}
        getLanguage={customRenderers ? undefined : getLanguage}
        highlightCode={customRenderers ? highlightCode : undefined}
      />
    </output>
  );
}
