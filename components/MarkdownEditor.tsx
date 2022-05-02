import cn from "classnames";
import type { ReactElement } from "react";
import { useRef } from "react";
import { TextArea } from "react-md";

import styles from "./MarkdownEditor.module.scss";
import { usePlayground } from "./usePlayground";

export function MarkdownEditor(): ReactElement {
  const { markdown, setMarkdown, splitView } = usePlayground();
  const linesRef = useRef<HTMLDivElement>(null);
  const lines = markdown.match(/\r?\n/g)?.length;

  return (
    <>
      <TextArea
        aria-label="Editor"
        id="markdown-editor"
        name="editor"
        theme="none"
        value={markdown}
        placeholder="# Enter some markdown here!"
        className={styles.editor}
        resize="none"
        animate={false}
        areaClassName={styles.area}
        onChange={(event) => setMarkdown(event.currentTarget.value)}
        onScroll={(event) => {
          if (linesRef.current) {
            linesRef.current.scrollTop = event.currentTarget.scrollTop;
          }
        }}
        containerProps={{
          "aria-label": "Editor",
          id: "markdown-editor-container",
          role: "region",
        }}
      />
      <div
        ref={linesRef}
        className={cn(styles.lines, {
          [styles.linesOffset]: splitView,
        })}
      >
        {Array.from(
          { length: typeof lines === "number" ? lines + 1 : 1 },
          (_, i) => (
            <span key={i} className={styles.line} />
          )
        )}
      </div>
    </>
  );
}
