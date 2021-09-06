import type { ReactElement } from "react";
import cn from "classnames";

import type { MarkdownEditorLinesProps } from "./useConfig";

import styles from "./MarkdownEditorLines.module.scss";

export function MarkdownEditorLines({
  value,
  linesRef,
  splitView,
}: MarkdownEditorLinesProps): ReactElement {
  const lines = value.match(/\r?\n/g)?.length;
  return (
    <div
      ref={linesRef}
      className={cn(styles.lines, {
        [styles.offset]: splitView,
      })}
    >
      {Array.from(
        { length: typeof lines === "number" ? lines + 1 : 1 },
        (_, i) => (
          <span key={i} className={styles.line} />
        )
      )}
    </div>
  );
}
