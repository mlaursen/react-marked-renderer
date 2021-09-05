import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import cn from "classnames";
import {
  Grid,
  GridCell,
  TabPanel,
  TabPanels,
  TabsManager,
  throttle,
} from "react-md";

import { DEFAULT_MARKDOWN } from "../constants";
import { Header } from "./Header";
import { MarkdownEditor, MarkdownEditorProps } from "./MarkdownEditor";
import { MarkdownPreview, MarkdownPreviewProps } from "./MarkdownPreview";
import styles from "./Playground.module.scss";
import { useConfig } from "./useConfig";

const tabs = ["Editor", "Preview"];

export default function Playground(): ReactElement {
  const { darkTheme, splitView, customRenderers, updateInterval, headerProps } =
    useConfig();
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html || !darkTheme) {
      return;
    }

    const className = "dark-theme";
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [darkTheme]);

  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const updateMarkdown = useMemo(
    () =>
      throttle(
        (markdown: string, setMarkdown: Dispatch<SetStateAction<string>>) => {
          setMarkdown(markdown);
        },
        updateInterval
      ),
    [updateInterval]
  );

  const editorProps: MarkdownEditorProps = {
    splitView,
    placeholder: "# Enter some markdown here!",
    defaultValue: markdown,
    onChange: (event) => updateMarkdown(event.currentTarget.value, setMarkdown),
  };
  const previewProps: MarkdownPreviewProps = {
    markdown,
    customRenderers,
  };

  return (
    <TabsManager tabs={tabs} tabsId="editor-tabs">
      <Header {...headerProps} />
      {splitView ? (
        <Grid
          gutter="0px"
          columns={2}
          padding={0}
          className={cn(styles.grid, {
            [styles.offset1]: splitView,
            [styles.offset2]: !splitView,
          })}
        >
          <GridCell>
            <MarkdownEditor {...editorProps} />
          </GridCell>
          <div role="separator" className={styles.separator} />
          <GridCell className={styles.scrollable}>
            <MarkdownPreview {...previewProps} />
          </GridCell>
        </Grid>
      ) : (
        <TabPanels
          className={cn(styles.panels, {
            [styles.offset1]: splitView,
            [styles.offset2]: !splitView,
          })}
          persistent
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
