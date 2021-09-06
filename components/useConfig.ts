import {
  ChangeEventHandler,
  Dispatch,
  Ref,
  SetStateAction,
  UIEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ProvidedNumberFieldMessageProps,
  throttle,
  useNumberField,
} from "react-md";

import { DEFAULT_MARKDOWN } from "../constants";

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

export interface MarkdownEditorProps {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onScroll: UIEventHandler<HTMLTextAreaElement>;
}

export interface MarkdownEditorLinesProps {
  value: string;
  linesRef: Ref<HTMLDivElement>;
  splitView: boolean;
}

export interface MarkdownPreviewProps {
  markdown: string;
  customRenderers: boolean;
}

interface ConfigHookReturnValue {
  splitView: boolean;
  editorProps: MarkdownEditorProps;
  editorLinesProps: MarkdownEditorLinesProps;
  headerProps: PlaygroundOptionsProps;
  previewProps: MarkdownPreviewProps;
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
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [previewMarkdown, setPreviewMarkdown] = useState(markdown);
  const linesRef = useRef<HTMLDivElement>(null);

  const updatePreviewMarkdown = useMemo(
    () =>
      throttle(
        (markdown: string, setMarkdown: Dispatch<SetStateAction<string>>) => {
          setMarkdown(markdown);
        },
        updateInterval
      ),
    [updateInterval]
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ darkTheme, splitView, customRenderers, updateInterval })
    );
  }, [darkTheme, splitView, customRenderers, updateInterval]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html || !darkTheme) {
      return;
    }

    const className = "dark-theme";
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [darkTheme]);

  return {
    splitView,
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
    editorProps: {
      value: markdown,
      placeholder: "# Enter some markdown here!",
      onChange(event) {
        const { value } = event.currentTarget;
        setMarkdown(value);
        updatePreviewMarkdown(value, setPreviewMarkdown);
      },
      onScroll(event) {
        if (!linesRef.current) {
          return;
        }

        linesRef.current.scrollTop = event.currentTarget.scrollTop;
      },
    },
    editorLinesProps: {
      linesRef,
      value: markdown,
      splitView,
    },
    previewProps: {
      markdown: previewMarkdown,
      customRenderers,
    },
  };
}
