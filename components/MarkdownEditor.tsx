import React, { ReactElement } from "react";
import { TextArea } from "react-md";

import styles from "./MarkdownEditor.module.scss";
import type { MarkdownEditorProps } from "./useConfig";

export function MarkdownEditor({
  value,
  ...props
}: MarkdownEditorProps): ReactElement {
  return (
    <TextArea
      {...props}
      aria-label="Editor"
      id="editor"
      name="editor"
      theme="none"
      value={value}
      className={styles.editor}
      resize="none"
      animate={false}
      areaClassName={styles.area}
    />
  );
}
