import { cssUtils } from "@react-md/core/cssUtils";
import { cnb } from "cnbuilder";
import hljs from "highlight.js";
import { type ReactElement } from "react";
import { type RenderCodeProps } from "react-marked-renderer";

import { CopyToClipboard } from "./CopyToClipboard";
import styles from "./RenderCopyPasteCodeBlock.module.scss";

export function RenderCopyPasteCodeBlock({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): ReactElement {
  const language = hljs.getLanguage(lang) ? lang : "plaintext";

  return (
    <div
      className={cnb(
        styles.container,
        cssUtils({
          textColor: "text-primary",
          surfaceColor: "dark",
        })
      )}
    >
      <div className={styles.scrollContainer}>
        <div className={styles.preContainer}>
          <pre className={cnb(styles.pre, styles.preWrap)}>
            <code
              className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(text, { language }).value,
              }}
            />
          </pre>
        </div>
      </div>
      <CopyToClipboard copyText={text} />
    </div>
  );
}
