"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/core/button/Button";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { Divider } from "@react-md/core/divider/Divider";
import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

import styles from "./Configuration.module.scss";
import { ConfigureColorScheme } from "./ConfigureColorScheme";
import { ConfigurePlaygroundView } from "./ConfigurePlaygroundView";
import { ConfigureRenderer } from "./ConfigureRenderer";

export function Configuration(): ReactElement {
  const { enable, disable, toggled } = useToggle();
  const { elementProps, tooltipProps } = useTooltip();

  return (
    <>
      <Button
        aria-label="Show Configuration"
        buttonType="icon"
        {...elementProps}
        onClick={enable}
      >
        <MaterialSymbol name="more_vert" />
      </Button>
      <Tooltip {...tooltipProps}>Configuration</Tooltip>
      <Sheet
        aria-label="Configuration"
        position="right"
        horizontalSize="none"
        visible={toggled}
        onRequestClose={disable}
        className={styles.sheet}
      >
        <AppBar theme="clear">
          <AppBarTitle>Configuration</AppBarTitle>
          <Button aria-label="Close" onClick={disable} buttonType="icon">
            <MaterialSymbol name="close" />
          </Button>
        </AppBar>
        <DialogContent>
          <Box align="stretch" stacked disablePadding>
            <ConfigureColorScheme />
            <Divider />
            <ConfigureRenderer />
            <ConfigurePlaygroundView />
          </Box>
        </DialogContent>
      </Sheet>
    </>
  );
}
