import { TextArea } from "@react-md/core/form/TextArea";
import { type ReactElement } from "react";

import styles from "./MarkdownEditor.module.scss";
import { useMarkdown } from "./MarkdownProvider";

export function MarkdownEditor(): ReactElement {
  const { markdown, setMarkdown } = useMarkdown();

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
        // resize="none"
        // disableTransition
        // animate={false}
        areaClassName={styles.area}
        onChange={(event) => setMarkdown(event.currentTarget.value)}
        // onScroll={(event) => {
        //   if (linesRef.current) {
        //     linesRef.current.scrollTop = event.currentTarget.scrollTop;
        //   }
        // }}
        containerProps={{
          "aria-label": "Editor",
          id: "markdown-editor-container",
          role: "region",
        }}
      />
    </>
  );
}
