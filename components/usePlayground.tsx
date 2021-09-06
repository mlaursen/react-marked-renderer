import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { DEFAULT_MARKDOWN } from "../constants";

interface PlaygroundState {
  markdown: string;
  darkTheme: boolean;
  splitView: boolean;
  splitPercentage: number;
  customRenderers: boolean;
}

interface PlaygroundContext extends PlaygroundState {
  reset(): void;
  setMarkdown(markdown: string): void;
  setSplitPercentage(percentage: number): void;
  minSplitPercentage(): void;
  maxSplitPercentage(): void;
  incrementSplitPercentage(): void;
  decrementSplitPercentage(): void;
  toggleDarkTheme(): void;
  toggleSplitView(): void;
  toggleCustomRenderers(): void;
}

const noop = (): void => {
  // do nothing
};

const LOCAL_STORAGE_KEY = "playgroundState";
export const MIN_SPLIT_PERCENTAGE = 20;
export const MAX_SPLIT_PERCENTAGE = 80;
const SPLIT_PERCENTAGE_INCREMENT = 1;
const INITIAL_STATE: PlaygroundState = {
  markdown: DEFAULT_MARKDOWN,
  darkTheme: false,
  splitView: true,
  splitPercentage: 50,
  customRenderers: false,
};

const context = createContext<PlaygroundContext>({
  ...INITIAL_STATE,
  reset: noop,
  setMarkdown: noop,
  setSplitPercentage: noop,
  minSplitPercentage: noop,
  maxSplitPercentage: noop,
  incrementSplitPercentage: noop,
  decrementSplitPercentage: noop,
  toggleSplitView: noop,
  toggleDarkTheme: noop,
  toggleCustomRenderers: noop,
});
context.displayName = "Playground";
const { Provider } = context;

interface SimplePlaygroundAction {
  type:
    | "reset"
    | "minSplitPercentage"
    | "maxSplitPercentage"
    | "incrementSplitPercentage"
    | "decrementSplitPercentage"
    | "toggleDarkTheme"
    | "toggleSplitView"
    | "toggleCustomRenderers";
}

interface SetMarkdownAction {
  type: "setMarkdown";
  markdown: string;
}

interface SetSplitPercentageAction {
  type: "setSplitPercentage";
  percentage: number;
}

type PlaygroundAction =
  | SimplePlaygroundAction
  | SetMarkdownAction
  | SetSplitPercentageAction;

export function usePlayground(): Readonly<PlaygroundContext> {
  return useContext(context);
}

const validateBool = (value: unknown, initial: boolean): boolean => {
  if (typeof value === "boolean") {
    return value;
  }

  return initial;
};

const getNextSplitPercentageState = (
  state: PlaygroundState,
  nextPercentage: number
): PlaygroundState => {
  const splitPercentage = Math.min(80, Math.max(20, nextPercentage));
  if (state.splitPercentage === splitPercentage) {
    return state;
  }

  return {
    ...state,
    splitPercentage,
  };
};

export function PlaygroundProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(
    (state: PlaygroundState, action: PlaygroundAction) => {
      switch (action.type) {
        case "reset":
          return INITIAL_STATE;
        case "setMarkdown":
          return {
            ...state,
            markdown: action.markdown,
          };
        case "toggleDarkTheme":
          return {
            ...state,
            darkTheme: !state.darkTheme,
          };
        case "toggleSplitView":
          return {
            ...state,
            splitView: !state.splitView,
          };
        case "toggleCustomRenderers":
          return {
            ...state,
            customRenderers: !state.customRenderers,
          };
        case "setSplitPercentage":
          return getNextSplitPercentageState(state, action.percentage);
        case "maxSplitPercentage":
          return getNextSplitPercentageState(state, MAX_SPLIT_PERCENTAGE);
        case "minSplitPercentage":
          return getNextSplitPercentageState(state, MIN_SPLIT_PERCENTAGE);
        case "incrementSplitPercentage":
          return getNextSplitPercentageState(
            state,
            state.splitPercentage + SPLIT_PERCENTAGE_INCREMENT
          );
        case "decrementSplitPercentage":
          return getNextSplitPercentageState(
            state,
            state.splitPercentage - SPLIT_PERCENTAGE_INCREMENT
          );
        default:
          return state;
      }
    },
    INITIAL_STATE,
    (initialState) => {
      const cached =
        typeof localStorage !== "undefined" &&
        localStorage.getItem(LOCAL_STORAGE_KEY);
      if (typeof cached !== "string") {
        return initialState;
      }

      try {
        const { darkTheme, splitView, customRenderers } = JSON.parse(cached);

        return {
          ...initialState,
          darkTheme: validateBool(darkTheme, initialState.darkTheme),
          splitView: validateBool(splitView, initialState.splitView),
          customRenderers: validateBool(
            customRenderers,
            initialState.customRenderers
          ),
        };
      } catch (e) {
        return initialState;
      }
    }
  );
  const { markdown, darkTheme, splitView, splitPercentage, customRenderers } =
    state;

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);
  const setMarkdown = useCallback((markdown: string) => {
    dispatch({ type: "setMarkdown", markdown });
  }, []);
  const setSplitPercentage = useCallback((percentage: number) => {
    dispatch({ type: "setSplitPercentage", percentage });
  }, []);
  const minSplitPercentage = useCallback(() => {
    dispatch({ type: "minSplitPercentage" });
  }, []);
  const maxSplitPercentage = useCallback(() => {
    dispatch({ type: "maxSplitPercentage" });
  }, []);
  const incrementSplitPercentage = useCallback(() => {
    dispatch({ type: "incrementSplitPercentage" });
  }, []);
  const decrementSplitPercentage = useCallback(() => {
    dispatch({ type: "decrementSplitPercentage" });
  }, []);
  const toggleDarkTheme = useCallback(() => {
    dispatch({ type: "toggleDarkTheme" });
  }, []);
  const toggleSplitView = useCallback(() => {
    dispatch({ type: "toggleSplitView" });
  }, []);
  const toggleCustomRenderers = useCallback(() => {
    dispatch({ type: "toggleCustomRenderers" });
  }, []);
  const value = useMemo<PlaygroundContext>(
    () => ({
      markdown,
      darkTheme,
      splitView,
      splitPercentage,
      customRenderers,
      reset,
      setMarkdown,
      setSplitPercentage,
      minSplitPercentage,
      maxSplitPercentage,
      incrementSplitPercentage,
      decrementSplitPercentage,
      toggleDarkTheme,
      toggleSplitView,
      toggleCustomRenderers,
    }),
    [
      customRenderers,
      darkTheme,
      decrementSplitPercentage,
      incrementSplitPercentage,
      markdown,
      maxSplitPercentage,
      minSplitPercentage,
      reset,
      setMarkdown,
      setSplitPercentage,
      splitPercentage,
      splitView,
      toggleCustomRenderers,
      toggleDarkTheme,
      toggleSplitView,
    ]
  );

  useEffect(() => {
    if (typeof localStorage == "undefined") {
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        splitView,
        darkTheme,
        customRenderers,
      })
    );
  }, [customRenderers, darkTheme, splitView]);
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

  return <Provider value={value}>{children}</Provider>;
}
