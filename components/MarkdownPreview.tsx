import Prism from "prismjs";
import type { ReactElement } from "react";

import { DangerouslyHighlightCode, GetCodeLanguage, Markdown } from "../src";
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
    <div id="preview-panel" className={styles.container}>
      <Markdown
        markdown={markdown}
        renderers={customRenderers ? renderers : undefined}
        getLanguage={customRenderers ? undefined : getLanguage}
        highlightCode={customRenderers ? highlightCode : undefined}
      />
    </div>
  );
}
