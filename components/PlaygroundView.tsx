import type { ReactElement } from "react";
import { TabPanel, TabPanels } from "react-md";

import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { PanelResizer } from "./PanelResizer";
import styles from "./PlaygroundView.module.scss";
import { usePlayground } from "./usePlayground";

interface CSSProperties extends React.CSSProperties {
  "--percentage"?: string;
}

export function PlaygroundView(): ReactElement | null {
  const { splitView, splitPercentage } = usePlayground();
  if (!splitView) {
    return (
      <TabPanels className={styles.panels} disableTransition>
        <TabPanel>
          <MarkdownEditor />
        </TabPanel>
        <TabPanel>
          <MarkdownPreview />
        </TabPanel>
      </TabPanels>
    );
  }
  const style: CSSProperties = {
    "--percentage": `${splitPercentage}%`,
  };

  return (
    <div style={style} className={styles.grid}>
      <MarkdownEditor />
      <PanelResizer />
      <MarkdownPreview />
    </div>
  );
}
