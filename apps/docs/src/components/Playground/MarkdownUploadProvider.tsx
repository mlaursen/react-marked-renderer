"use client";

import {
  type FileUploadHookReturnValue,
  useFileUpload,
} from "@react-md/core/files/useFileUpload";
import {
  type CompletedFileUploadStats,
  type GetFileParser,
  getSplitFileUploads,
} from "@react-md/core/files/utils";
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";

import { useMarkdown } from "./MarkdownProvider";

export type MarkdownUploadContext = Pick<
  FileUploadHookReturnValue,
  "onDrop" | "onChange" | "accept"
>;

const context = createContext<MarkdownUploadContext | null>(null);
const { Provider } = context;

export function useMarkdownUpload(): MarkdownUploadContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("MarkdownUploadProvider must be initialized.");
  }

  return value;
}

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
  "html",
] as const;

const getFileType = (stats: CompletedFileUploadStats | undefined): string => {
  if (!stats?.file) {
    return "";
  }

  const [extension] = stats.file.name.split(".").reverse();
  if (extension === "md" || extension === "txt") {
    return "markdown";
  }

  if (extensions.includes(extension as (typeof extensions)[number])) {
    return extension;
  }

  return "";
};

export interface MarkdownUploadProviderProps {
  children: ReactNode;
}

export function MarkdownUploadProvider({
  children,
}: Readonly<MarkdownUploadProviderProps>): ReactElement {
  const { setMarkdown } = useMarkdown();
  const { onDrop, stats, reset, errors, clearErrors, accept, onChange } =
    useFileUpload({
      maxFiles: 1,
      getFileParser,
      extensions,
    });
  const { complete } = getSplitFileUploads(stats);
  const [current] = complete;
  const type = getFileType(current);
  const fileContents = current?.result;
  useEffect(() => {
    if (typeof fileContents !== "string") {
      return;
    }

    let contents = fileContents;
    if (type !== "markdown" && type) {
      contents = `\`\`\`${type}
${fileContents}${/\r?\n$/.test(fileContents) ? "" : "\n"}\`\`\``;
    }

    setMarkdown(contents);
    reset();
  }, [fileContents, reset, setMarkdown, type]);

  return <Provider value={{ accept, onDrop, onChange }}>{children}</Provider>;
}
