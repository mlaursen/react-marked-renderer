import React, { ReactElement } from "react";

import { Markdown } from "../Markdown";

import styles from "./MarkdownPreview.module.scss";
import { renderers } from "./renderers";

export interface MarkdownPreviewProps {
  markdown: string;
  customRenderers: boolean;
}

export function MarkdownPreview({
  markdown,
  customRenderers,
}: MarkdownPreviewProps): ReactElement {
  return (
    <div className={styles.container}>
      <Markdown
        markdown={markdown}
        renderers={customRenderers ? renderers : undefined}
      />
    </div>
  );
}
