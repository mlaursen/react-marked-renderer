import React, { ReactElement } from "react";
import cn from "classnames";
import { TabPanel, TabPanels, TabsManager } from "react-md";

import { Header } from "./Header";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import styles from "./Playground.module.scss";
import { useConfig } from "./useConfig";
import { useWindowSplitter } from "./useWindowSplitter";
import { MarkdownEditorLines } from "./MarkdownEditorLines";

const tabs = ["Editor", "Preview"];

export default function Playground(): ReactElement {
  const {
    splitView,
    headerProps,
    editorProps,
    editorLinesProps,
    previewProps,
  } = useConfig();
  const { splitterProps, gridStyle } = useWindowSplitter();

  return (
    <TabsManager tabs={tabs} tabsId="editor-tabs">
      <Header {...headerProps} />
      {splitView ? (
        <>
          <div
            style={gridStyle}
            className={cn(styles.grid, {
              [styles.offset1]: splitView,
              [styles.offset2]: !splitView,
            })}
          >
            <MarkdownEditor {...editorProps} />
            <MarkdownPreview {...previewProps} />
          </div>
          <div
            role="separator"
            className={styles.separator}
            {...splitterProps}
          />
          <MarkdownEditorLines {...editorLinesProps} />
        </>
      ) : (
        <TabPanels
          className={cn(styles.panels, {
            [styles.offset1]: splitView,
            [styles.offset2]: !splitView,
          })}
          disableTransition
        >
          <TabPanel>
            <MarkdownEditor {...editorProps} />
          </TabPanel>
          <TabPanel>
            <MarkdownPreview {...previewProps} />
          </TabPanel>
        </TabPanels>
      )}
    </TabsManager>
  );
}
