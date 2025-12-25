"use client";

import { Box } from "@react-md/core/box/Box";
import { NullSuspense } from "@react-md/core/suspense/NullSuspense";
import dynamic from "next/dynamic";
import { type ReactElement, type ReactNode, useId } from "react";

import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownProvider } from "./MarkdownProvider";
import { MarkdownUploadProvider } from "./MarkdownUploadProvider";
import styles from "./PlaygroundLayout.module.scss";

const PanelResizer = dynamic(
  () => import("./PanelResizer").then((mod) => mod.PanelResizer),
  { ssr: false }
);

export interface PlaygroundLayoutProps {
  children: ReactNode;
}

export function PlaygroundLayout({
  children,
}: Readonly<PlaygroundLayoutProps>): ReactElement {
  const editorId = useId();
  return (
    <MarkdownProvider>
      <MarkdownUploadProvider>
        <Box grid align="start" className={styles.container} disablePadding>
          <MarkdownEditor />
          <NullSuspense>
            <PanelResizer editorId={editorId} />
          </NullSuspense>
          <output aria-label="Markdown Preview" className={styles.output}>
            {children}
          </output>
        </Box>
      </MarkdownUploadProvider>
    </MarkdownProvider>
  );
}

export default PlaygroundLayout;
