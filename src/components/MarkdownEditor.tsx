import React, {
  ChangeEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { TextArea } from "react-md";

import styles from "./MarkdownEditor.module.scss";

export interface MarkdownEditorProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  splitView: boolean;
  placeholder: string;
  defaultValue: string;
}

export function MarkdownEditor({
  onChange,
  splitView,
  placeholder,
  defaultValue,
}: MarkdownEditorProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const lines = value.match(/\r?\n/g)?.length ?? 0 + 1;

  return (
    <>
      <div
        className={cn(styles.lines, {
          [styles.offset]: splitView,
        })}
        ref={ref}
      >
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className={styles.line} />
        ))}
      </div>
      <TextArea
        aria-label="Editor"
        id="editor"
        name="editor"
        theme="none"
        value={value}
        onChange={(event) => {
          onChange?.(event);
          setValue(event.currentTarget.value);
        }}
        className={styles.editor}
        resize="none"
        animate={false}
        placeholder={placeholder}
        areaClassName={styles.area}
        onScroll={(event) => {
          if (!ref.current) {
            return;
          }

          ref.current.scrollTop = event.currentTarget.scrollTop;
        }}
      />
    </>
  );
}
