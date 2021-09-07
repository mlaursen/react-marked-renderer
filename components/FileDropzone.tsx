import cn from "classnames";
import { ReactElement, useEffect, useState } from "react";
import {
  GetFileParser,
  getSplitFileUploads,
  useDropzone,
  useFileUpload,
  Text,
  TextContainer,
  FileUploadSVGIcon,
} from "react-md";

import { ErrorModal } from "./ErrorModal";
import styles from "./FileDropzone.module.scss";
import { usePlayground } from "./usePlayground";

const getFileParser: GetFileParser = () => "readAsText";
const extensions = [
  "md",
  "txt",
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "yml",
  "yaml",
] as const;

export function FileDropzone(): ReactElement {
  const { setMarkdown } = usePlayground();
  const [enabled, setEnabled] = useState(false);
  const { onDrop, stats, reset, errors, clearErrors } = useFileUpload({
    maxFiles: 1,
    getFileParser,
    extensions,
    onDrop() {
      setEnabled(false);
    },
  });
  const [isOver, handlers] = useDropzone({
    onDrop,
    onDragEnter: reset,
  });

  const { complete } = getSplitFileUploads(stats);
  const [current] = complete;
  const type = current?.file.type?.replace(/^.*\//, "");
  const fileContents = current?.result;
  useEffect(() => {
    if (typeof fileContents !== "string") {
      return;
    }

    let contents = fileContents;
    if (type !== "markdown" && type) {
      contents = `\`\`\`${type}
${fileContents}\`\`\`
`;
    }

    setMarkdown(contents);
  }, [fileContents, setMarkdown, type]);

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

  return (
    <>
      <ErrorModal errors={errors} clearErrors={clearErrors} />
      {enabled && (
        <div
          {...handlers}
          className={cn(styles.container, isOver && styles.hovering)}
          onMouseLeave={() => setEnabled(false)}
        >
          <TextContainer>
            <Text type="headline-5">
              Drag and drop a text file to update the markdown text with the
              file contents.
            </Text>
            <FileUploadSVGIcon />
          </TextContainer>
        </div>
      )}
    </>
  );
}
