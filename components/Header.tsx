import React, { ReactElement } from "react";
import { AppBar, AppBarTitle, FunctionsSVGIcon, Tabs } from "react-md";

import { AppBarLink } from "./AppBarLink";
import { GithubIcon } from "./GithubIcon";
import { PlaygroundOptions } from "./PlaygroundOptions";
import type { PlaygroundOptionsProps } from "./useConfig";

export function Header(props: PlaygroundOptionsProps): ReactElement {
  const { splitView } = props;
  return (
    <AppBar
      theme="default"
      fixed
      height={splitView ? "dense" : "prominent-dense"}
    >
      <AppBar height="dense">
        <AppBarTitle>React Marked Renderer - Playground</AppBarTitle>
        <AppBarLink
          id="github-link"
          first
          href="https://github.com/mlaursen/react-marked-renderer"
          target="_blank"
          tooltip="GitHub"
        >
          <GithubIcon />
        </AppBarLink>
        <AppBarLink
          id="typedoc-links"
          href="/tsdocs/index.html"
          tooltip="API (typedoc)"
        >
          <FunctionsSVGIcon />
        </AppBarLink>
        <PlaygroundOptions {...props} />
      </AppBar>
      {!splitView && (
        <AppBar height="dense">
          <Tabs automatic />
        </AppBar>
      )}
    </AppBar>
  );
}
