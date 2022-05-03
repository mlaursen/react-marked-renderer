import type { ReactElement } from "react";
import { useState } from "react";
import {
  AppBar,
  AppBarTitle,
  FilterFramesSVGIcon,
  FilterNoneSVGIcon,
  HelpOutlineSVGIcon,
  SettingsOverscanSVGIcon,
  Tabs,
  ViewColumnSVGIcon,
} from "react-md";

import { AppBarAction } from "./AppBarAction";
import { HelpDialog } from "./HelpDialog";
import MarkdownFileUpload from "./MarkdownFileUpload";
import { ThemePreference } from "./ThemePreference";
import { usePlayground } from "./usePlayground";

export function Header(): ReactElement {
  const [visible, setVisible] = useState(false);
  const onRequestClose = (): void => {
    setVisible(false);
  };
  const { splitView, customRenderers, toggleSplitView, toggleCustomRenderers } =
    usePlayground();

  return (
    <AppBar
      theme="default"
      fixed
      height={splitView ? "dense" : "prominent-dense"}
    >
      <AppBar height="dense">
        <AppBarTitle>React Marked Renderer - Playground</AppBarTitle>
        <MarkdownFileUpload />
        <AppBarAction
          aria-label="Split View"
          aria-pressed={splitView}
          id="split-view"
          onClick={toggleSplitView}
          tooltip="Toggle between a split view or tab view"
        >
          {splitView ? <SettingsOverscanSVGIcon /> : <ViewColumnSVGIcon />}
        </AppBarAction>
        <AppBarAction
          aria-label="Custom Renderers"
          aria-pressed={customRenderers}
          id="custom-renderers"
          onClick={toggleCustomRenderers}
          tooltip="Enable custom renderers that use react-md as a component library"
        >
          {customRenderers ? <FilterFramesSVGIcon /> : <FilterNoneSVGIcon />}
        </AppBarAction>
        <ThemePreference />
        <AppBarAction
          aria-label="Help"
          id="website-help"
          last
          tooltip="Help"
          onClick={() => setVisible(true)}
        >
          <HelpOutlineSVGIcon />
        </AppBarAction>
        <HelpDialog visible={visible} onRequestClose={onRequestClose} />
      </AppBar>
      {!splitView && (
        <AppBar height="dense">
          <Tabs automatic />
        </AppBar>
      )}
    </AppBar>
  );
}
