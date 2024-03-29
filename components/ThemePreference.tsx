import dynamic from "next/dynamic";
import { type ReactElement, type ReactNode, useId } from "react";
import {
  BELOW_INNER_RIGHT_ANCHOR,
  BrightnessAutoSVGIcon,
  BrightnessHighSVGIcon,
  BrightnessLowSVGIcon,
  DropdownMenu,
  MenuItemRadio,
  Tooltip,
  useTooltip,
} from "react-md";

import { type ThemeType, usePlayground } from "./usePlayground";

const LightTheme = dynamic(() => import("./LightTheme"));
const DarkTheme = dynamic(() => import("./DarkTheme"));

const ICONS: Record<ThemeType, ReactElement> = {
  light: <BrightnessHighSVGIcon data-icon="light" />,
  dark: <BrightnessLowSVGIcon data-icon="dark" />,
  system: <BrightnessAutoSVGIcon data-icon="system" />,
};

export function ThemePreference(): ReactElement {
  const { themeType, setThemeType } = usePlayground();
  const { elementProps, tooltipProps } = useTooltip({ baseId: useId() });
  let theme: ReactNode;
  switch (themeType) {
    case "light":
      theme = <LightTheme />;
      break;
    case "dark":
      theme = <DarkTheme />;
      break;
  }

  return (
    <>
      {theme}
      <DropdownMenu
        {...elementProps}
        aria-label="Theme Preference"
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        buttonType="icon"
        buttonChildren={ICONS[themeType]}
      >
        <MenuItemRadio
          id={useId()}
          addon={ICONS.light}
          checked={themeType === "light"}
          onCheckedChange={() => setThemeType("light")}
        >
          Light Theme
        </MenuItemRadio>
        <MenuItemRadio
          id={useId()}
          addon={ICONS.dark}
          checked={themeType === "dark"}
          onCheckedChange={() => setThemeType("dark")}
        >
          Dark Theme
        </MenuItemRadio>
        <MenuItemRadio
          id={useId()}
          addon={ICONS.system}
          checked={themeType === "system"}
          onCheckedChange={() => setThemeType("system")}
        >
          System Theme
        </MenuItemRadio>
      </DropdownMenu>
      <Tooltip {...tooltipProps}>
        Customize Light and Dark Theme Behavior
      </Tooltip>
    </>
  );
}
