import cn from "classnames";
import { ReactElement, useEffect, useState } from "react";
import { FileUploadSVGIcon, Text, TextContainer, useDropzone } from "react-md";

import styles from "./FileDropzone.module.scss";
import { useUpload } from "./useUpload";

export function FileDropzone(): ReactElement | null {
  const { onDrop } = useUpload();
  const [enabled, setEnabled] = useState(false);
  const [isOver, handlers] = useDropzone({
    onDrop(event) {
      setEnabled(false);
      onDrop(event);
    },
  });

  useEffect(() => {
    if (enabled) {
      return;
    }

    const enable = (): void => {
      setEnabled(true);
    };

    window.addEventListener("dragenter", enable, true);
    return () => {
      window.removeEventListener("dragenter", enable, true);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      {...handlers}
      className={cn(styles.container, isOver && styles.hovering)}
      onMouseLeave={() => setEnabled(false)}
    >
      <TextContainer>
        <Text type="headline-5">
          Drag and drop a text file to update the markdown text with the file
          contents.
        </Text>
        <FileUploadSVGIcon />
      </TextContainer>
    </div>
  );
}
