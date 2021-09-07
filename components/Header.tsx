import { ReactElement, useState } from "react";
import {
  AppBar,
  AppBarTitle,
  Brightness4SVGIcon,
  FileInput,
  FilterFramesSVGIcon,
  FilterNoneSVGIcon,
  HelpOutlineSVGIcon,
  IconRotator,
  SettingsOverscanSVGIcon,
  Tabs,
  ViewColumnSVGIcon,
} from "react-md";

import { AppBarAction } from "./AppBarAction";
import { HelpDialog } from "./HelpDialog";
import { usePlayground } from "./usePlayground";
import { useUpload } from "./useUpload";

export function Header(): ReactElement {
  const [visible, setVisible] = useState(false);
  const onRequestClose = (): void => {
    setVisible(false);
  };
  const {
    darkTheme,
    splitView,
    customRenderers,
    toggleDarkTheme,
    toggleSplitView,
    toggleCustomRenderers,
  } = usePlayground();
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
          id="file-uploa"
          accept={accept}
          onChange={onChange}
          theme="clear"
          themeType="flat"
          style={{ flexShrink: 0 }}
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
        <AppBarAction
          aria-label="Light Theme"
          id="theme-type"
          aria-pressed={darkTheme}
          onClick={toggleDarkTheme}
          tooltip="Toggle between light and dark themes"
        >
          <IconRotator rotated={darkTheme}>
            <Brightness4SVGIcon />
          </IconRotator>
        </AppBarAction>
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
