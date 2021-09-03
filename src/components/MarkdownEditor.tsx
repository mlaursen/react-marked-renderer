import React, { ChangeEventHandler, ReactElement } from "react";
import { TextArea } from "react-md";

import styles from "./MarkdownEditor.module.scss";

export interface MarkdownEditorProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  defaultValue?: string;
}

export function MarkdownEditor({
  onChange,
  placeholder,
  defaultValue,
}: MarkdownEditorProps): ReactElement {
  return (
    <TextArea
      aria-label="Editor"
      id="editor"
      name="editor"
      theme="none"
      defaultValue={defaultValue}
      onChange={onChange}
      className={styles.editor}
      resize="none"
      animate={false}
      placeholder={placeholder}
      areaClassName={styles.area}
    />
  );
}
