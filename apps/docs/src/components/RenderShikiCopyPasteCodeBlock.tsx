import { cssUtils } from "@react-md/core/cssUtils";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import { type RenderCodeProps } from "react-marked-renderer";
import { codeToHtml } from "shiki";

import { CopyToClipboard } from "./CopyToClipboard";
import styles from "./RenderShikiCopyPasteCodeBlock.module.scss";

export async function RenderShikiCopyPasteCodeBlock({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): Promise<ReactElement> {
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
        <div
          className={styles.preContainer}
          dangerouslySetInnerHTML={{
            __html: await codeToHtml(text, {
              lang,
              themes: {
                dark: "solarized-dark",
                light: "github-light-default",
              },
              defaultColor: "light",
            }),
          }}
        />
      </div>
      <CopyToClipboard copyText={text} />
    </div>
  );
}
