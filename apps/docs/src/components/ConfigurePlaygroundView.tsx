import { Divider } from "@react-md/core/divider/Divider";
import { type ReactElement } from "react";

import { usePlaygroundView } from "./PlaygroundViewProvider";
import { SegmentedButtonGroup } from "./SegmentedButtonGroup";

const ITEMS = ["tabs", "resizable"];

export function ConfigurePlaygroundView(): ReactElement | null {
  const { activeTab, setActiveTab, isLayoutAvailable } = usePlaygroundView();
  if (!isLayoutAvailable) {
    return null;
  }

  return (
    <>
      <Divider />
      <SegmentedButtonGroup
        label="Playground Layout"
        items={ITEMS}
        value={activeTab === "resizable" ? "resizable" : "tabs"}
        setValue={(nextValue) =>
          setActiveTab(nextValue === "tabs" ? "editor" : "resizable")
        }
      />
    </>
  );
}
