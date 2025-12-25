import { MaterialSymbol } from "@react-md/core/icon/MaterialSymbol";
import { type ColorScheme } from "@react-md/core/theme/types";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { type ReactElement, type ReactNode } from "react";

import { SegmentedButtonGroup } from "./SegmentedButtonGroup";

const modes: readonly ColorScheme[] = ["light", "dark", "system"];

const COLOR_SCHEME_ICONS = {
  light: <MaterialSymbol name="light_mode" />,
  dark: <MaterialSymbol name="dark_mode" />,
  system: <MaterialSymbol name="devices" />,
} satisfies Record<ColorScheme, ReactNode>;

export function ConfigureColorScheme(): ReactElement {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <SegmentedButtonGroup
      label="Color Scheme"
      items={modes}
      value={colorScheme}
      setValue={setColorScheme}
      icon={COLOR_SCHEME_ICONS}
      textTransform="capitalize"
    />
  );
}
