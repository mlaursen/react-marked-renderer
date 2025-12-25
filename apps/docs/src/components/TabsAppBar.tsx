"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { cssUtils } from "@react-md/core/cssUtils";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { PLAYGROUND_VIEWS, usePlaygroundView } from "./PlaygroundViewProvider";

export function TabsAppBar(): ReactElement {
  const { getTabListProps, getTabProps, isTabsAvailable } = usePlaygroundView();

  return (
    <AppBar
      theme="clear"
      height="auto"
      className={cnb(!isTabsAvailable && DISPLAY_NONE_CLASS)}
    >
      <TabList {...getTabListProps()}>
        {PLAYGROUND_VIEWS.map((view) => (
          <Tab
            {...getTabProps(view)}
            key={view}
            className={cssUtils({ textTransform: "capitalize" })}
          >
            {view}
          </Tab>
        ))}
      </TabList>
    </AppBar>
  );
}
