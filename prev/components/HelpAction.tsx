import type { ReactElement } from "react";
import { useState } from "react";
import { HelpOutlineSVGIcon } from "react-md";

import { AppBarAction } from "./AppBarAction";
import { HelpDialog } from "./HelpDialog";

export function HelpAction(): ReactElement {
  const [visible, setVisible] = useState(false);
  const onRequestClose = (): void => {
    setVisible(false);
  };

  return (
    <>
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
    </>
  );
}
