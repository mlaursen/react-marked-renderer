import type { ReactElement, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { useAppSize } from "react-md";

import { DEFAULT_MARKDOWN } from "../constants";

export type ThemeType = "light" | "dark" | "system";

interface PlaygroundState {
  markdown: string;
  themeType: ThemeType;
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
  setThemeType(themeType: ThemeType): void;
  toggleSplitView(): void;
  toggleCustomRenderers(): void;
}

const noop = (): void => {
  // do nothing
};

export const MIN_SPLIT_PERCENTAGE = 20;
export const MAX_SPLIT_PERCENTAGE = 80;
const SPLIT_PERCENTAGE_INCREMENT = 1;
const LOCAL_STORAGE_KEY = "playgroundState";
const INITIAL_STATE: PlaygroundState = {
  markdown: DEFAULT_MARKDOWN,
  themeType: "system",
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
  setThemeType: noop,
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
    | "toggleSplitView"
    | "toggleCustomRenderers";
}

interface SetThemeTypeAction {
  type: "setThemeType";
  themeType: ThemeType;
}

interface SetMarkdownAction {
  type: "setMarkdown";
  markdown: string;
}

interface SetSplitPercentageAction {
  type: "setSplitPercentage";
  percentage: number;
}

interface SetPlaygroundStateAction {
  type: "setState";
  state: PlaygroundState;
}

type PlaygroundAction =
  | SimplePlaygroundAction
  | SetThemeTypeAction
  | SetMarkdownAction
  | SetSplitPercentageAction
  | SetPlaygroundStateAction;

export function usePlayground(): Readonly<PlaygroundContext> {
  return useContext(context);
}

const validateBool = (value: unknown, initial: boolean): boolean => {
  if (typeof value === "boolean") {
    return value;
  }

  return initial;
};

const validateThemeType = (value: unknown, initial: ThemeType): ThemeType => {
  if (value !== "light" && value !== "dark" && value !== "system") {
    return initial;
  }

  return value;
};

const getNextSplitPercentageState = (
  state: PlaygroundState,
  nextPercentage: number
): PlaygroundState => {
  const splitPercentage = Math.min(
    MAX_SPLIT_PERCENTAGE,
    Math.max(MIN_SPLIT_PERCENTAGE, nextPercentage)
  );
  if (state.splitPercentage === splitPercentage) {
    return state;
  }

  return {
    ...state,
    splitPercentage,
  };
};

function reducer(
  state: PlaygroundState,
  action: PlaygroundAction
): PlaygroundState {
  switch (action.type) {
    case "reset":
      return INITIAL_STATE;
    case "setState":
      return action.state;
    case "setMarkdown":
      return {
        ...state,
        markdown: action.markdown,
      };
    case "setThemeType":
      return {
        ...state,
        themeType: action.themeType,
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
}

export function PlaygroundProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { markdown, themeType, splitView, splitPercentage, customRenderers } =
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
  const setThemeType = useCallback((themeType: ThemeType) => {
    dispatch({ type: "setThemeType", themeType });
  }, []);
  const toggleSplitView = useCallback(() => {
    dispatch({ type: "toggleSplitView" });
  }, []);
  const toggleCustomRenderers = useCallback(() => {
    dispatch({ type: "toggleCustomRenderers" });
  }, []);

  const { isPhone } = useAppSize();
  const value = useMemo<PlaygroundContext>(
    () => ({
      markdown,
      themeType: themeType,
      splitView: splitView && !isPhone,
      splitPercentage,
      customRenderers,
      reset,
      setMarkdown,
      setSplitPercentage,
      minSplitPercentage,
      maxSplitPercentage,
      incrementSplitPercentage,
      decrementSplitPercentage,
      setThemeType: setThemeType,
      toggleSplitView,
      toggleCustomRenderers,
    }),
    [
      markdown,
      themeType,
      splitView,
      isPhone,
      splitPercentage,
      customRenderers,
      reset,
      setMarkdown,
      setSplitPercentage,
      minSplitPercentage,
      maxSplitPercentage,
      incrementSplitPercentage,
      decrementSplitPercentage,
      setThemeType,
      toggleSplitView,
      toggleCustomRenderers,
    ]
  );

  const firstRender = useRef(true);
  useEffect(() => {
    if (typeof localStorage == "undefined") {
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;

      // try to get the initial state for localStorage and update the state with
      // that value. this is only required since I'm not sure how to disable SSR
      // in vercel and if one of the settings are save, it'll cause the page to
      // be out of sync until another action occurs

      const cached =
        typeof localStorage !== "undefined" &&
        localStorage.getItem(LOCAL_STORAGE_KEY);
      if (typeof cached !== "string") {
        return;
      }

      try {
        const { themeType, splitView, customRenderers } = JSON.parse(cached);
        const state = {
          ...INITIAL_STATE,
          themeType: validateThemeType(themeType, INITIAL_STATE.themeType),
          splitView: validateBool(splitView, INITIAL_STATE.splitView),
          customRenderers: validateBool(
            customRenderers,
            INITIAL_STATE.customRenderers
          ),
        };
        dispatch({ type: "setState", state });
      } catch (e) {
        // do nothing
      }
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        splitView,
        themeType,
        customRenderers,
      })
    );
  }, [customRenderers, themeType, splitView]);

  return <Provider value={value}>{children}</Provider>;
}
