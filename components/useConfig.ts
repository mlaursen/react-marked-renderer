import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProvidedNumberFieldMessageProps, useNumberField } from "react-md";

const UPDATE_INTERVAL_HELP_TEXT = `
The amount of time (in ms) before the preview window should be updated. This
only really needs to be changed if the page becomes unresponsive while
  making markdown changes.
`;

export interface PlaygroundConfig {
  darkTheme: boolean;
  splitView: boolean;
  updateInterval: number;
  customRenderers: boolean;
}

export interface PlaygroundOptionsProps
  extends Omit<PlaygroundConfig, "updateInterval"> {
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
  intervalProps: ProvidedNumberFieldMessageProps;
  resetUpdateInterval(): void;
  setSplitView: Dispatch<SetStateAction<boolean>>;
  setCustomRenderers: Dispatch<SetStateAction<boolean>>;
}

interface ConfigHookReturnValue extends PlaygroundConfig {
  headerProps: PlaygroundOptionsProps;
}

const LOCAL_STORAGE_KEY = "state";
const getCachedState = (): PlaygroundConfig => {
  const json = JSON.parse(
    (typeof localStorage !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEY)) ||
      "{}"
  );

  const darkTheme =
    typeof json.darkTheme === "boolean" ? json.darkTheme : false;
  const splitView = typeof json.splitView === "boolean" ? json.splitView : true;
  const updateInterval =
    typeof json.updateInterval === "number"
      ? Math.max(0, json.updateInterval)
      : 0;
  const customRenderers =
    typeof json.customRenderers === "boolean" ? json.customRenderers : false;

  return {
    darkTheme,
    splitView,
    updateInterval,
    customRenderers,
  };
};

export function useConfig(): ConfigHookReturnValue {
  const [updateInterval, intervalProps, { reset }] = useNumberField({
    id: "update-interval",
    min: 0,
    step: 100,
    helpText: UPDATE_INTERVAL_HELP_TEXT,
    defaultValue: () => getCachedState().updateInterval,
    updateOnChange: false,
    validateOnChange: true,
  });
  const [splitView, setSplitView] = useState(() => getCachedState().splitView);
  const [customRenderers, setCustomRenderers] = useState(
    () => getCachedState().customRenderers
  );
  const [darkTheme, setDarkTheme] = useState(() => getCachedState().darkTheme);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ darkTheme, splitView, customRenderers, updateInterval })
    );
  }, [darkTheme, splitView, customRenderers, updateInterval]);

  return {
    darkTheme,
    splitView,
    customRenderers,
    updateInterval,
    headerProps: {
      intervalProps,
      resetUpdateInterval: reset,
      splitView,
      setSplitView,
      customRenderers,
      setCustomRenderers,
      darkTheme,
      setDarkTheme,
    },
  };
}
