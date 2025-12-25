import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
import { useWindowSize } from "@react-md/core/useWindowSize";
import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
import { type ReactElement } from "react";

export interface PanelResizerProps {
  editorId: string;
}

export function PanelResizer({
  editorId,
}: Readonly<PanelResizerProps>): ReactElement {
  const { width } = useWindowSize();
  const { value, splitterProps } = useWindowSplitter({
    min: width * 0.2,
    max: width * 0.8,
    defaultValue: width / 2,
  });
  useCSSVariables([
    { value: `${value}px`, name: "--rmd-window-splitter-position" },
  ]);

  return (
    <WindowSplitter
      {...splitterProps}
      aria-controls={editorId}
      aria-label="Resize Preview Panel"
    />
  );
}
