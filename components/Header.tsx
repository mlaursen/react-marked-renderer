import type { ReactElement } from "react";
import { useState } from "react";
import {
  AppBar,
  AppBarTitle,
  FileInput,
  FileUploadSVGIcon,
  FilterFramesSVGIcon,
  FilterNoneSVGIcon,
  HelpOutlineSVGIcon,
  SettingsOverscanSVGIcon,
  Tabs,
  ViewColumnSVGIcon,
} from "react-md";

import { AppBarAction } from "./AppBarAction";
import { HelpDialog } from "./HelpDialog";
import { ThemePreference } from "./ThemePreference";
import { usePlayground } from "./usePlayground";
import { useUpload } from "./useUpload";

export function Header(): ReactElement {
  const [visible, setVisible] = useState(false);
  const onRequestClose = (): void => {
    setVisible(false);
  };
  const { splitView, customRenderers, toggleSplitView, toggleCustomRenderers } =
    usePlayground();
  const { accept, onChange } = useUpload();

  return (
    <AppBar
      theme="default"
      fixed
      height={splitView ? "dense" : "prominent-dense"}
    >
      <AppBar height="dense">
        <AppBarTitle>React Marked Renderer - Playground</AppBarTitle>
        <AppBarAction
          aria-label="Split View"
          aria-pressed={splitView}
          id="split-view"
          first
          onClick={toggleSplitView}
          tooltip="Toggle between a split view or tab view"
        >
          {splitView ? <SettingsOverscanSVGIcon /> : <ViewColumnSVGIcon />}
        </AppBarAction>
        <FileInput
          id="file-upload"
          accept={accept}
          onChange={onChange}
          theme="clear"
          themeType="flat"
          style={{ flexShrink: 0 }}
          icon={<FileUploadSVGIcon />}
        />
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
