import type { ReactElement } from "react";
import {
  AppBar,
  AppBarTitle,
  FilterFramesSVGIcon,
  FilterNoneSVGIcon,
  SettingsOverscanSVGIcon,
  Tabs,
  useAppSize,
  ViewColumnSVGIcon,
} from "react-md";

import { AppBarAction } from "./AppBarAction";
import { HelpAction } from "./HelpAction";
import { MarkdownFileUpload } from "./MarkdownFileUpload";
import { ThemePreference } from "./ThemePreference";
import { usePlayground } from "./usePlayground";

export function Header(): ReactElement {
  const { splitView, customRenderers, toggleSplitView, toggleCustomRenderers } =
    usePlayground();
  const { isPhone } = useAppSize();
  const title = `${isPhone ? "" : "React Marked Renderer - "}Playground`;

  return (
    <AppBar
      theme="default"
      fixed
      height={splitView ? "dense" : "prominent-dense"}
    >
      <AppBar height="dense">
        <AppBarTitle>{title}</AppBarTitle>
        {!isPhone && <MarkdownFileUpload />}
        {!isPhone && (
          <AppBarAction
            aria-label="Split View"
            aria-pressed={splitView}
            id="split-view"
            onClick={toggleSplitView}
            tooltip="Toggle between a split view or tab view"
          >
            {splitView ? <SettingsOverscanSVGIcon /> : <ViewColumnSVGIcon />}
          </AppBarAction>
        )}
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
        <HelpAction />
      </AppBar>
      {!splitView && (
        <AppBar height="dense">
          <Tabs automatic />
        </AppBar>
      )}
    </AppBar>
  );
}
