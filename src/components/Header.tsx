import React, { ReactElement } from "react";
import {
  AppBar,
  AppBarTitle,
  buttonThemeClassNames,
  Tabs,
  useActionClassName,
} from "react-md";

import { GithubIcon } from "./GithubIcon";
import { PlaygroundOptions, PlaygroundOptionsProps } from "./PlaygroundOptions";

export function Header(props: PlaygroundOptionsProps): ReactElement | null {
  const { splitView } = props;
  return (
    <AppBar
      theme="default"
      fixed
      height={splitView ? "dense" : "prominent-dense"}
    >
      <AppBar height="dense">
        <AppBarTitle>React Marked Renderer - Playground</AppBarTitle>
        <a
          href="https://github.com/mlaursen/react-marked-renderer"
          className={useActionClassName({
            first: true,
            inheritColor: true,
            className: buttonThemeClassNames({
              theme: "clear",
              buttonType: "icon",
            }),
          })}
        >
          <GithubIcon />
        </a>
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
