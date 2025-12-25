"use client";

import { type UseStateObject } from "@react-md/core/types";
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import { DEFAULT_MARKDOWN } from "./constants";

export interface MarkdownContext extends UseStateObject<"markdown", string> {
  reset: () => void;
}

const context = createContext<MarkdownContext | null>(null);
const { Provider } = context;

export function useMarkdown(): MarkdownContext {
  const value = useContext(context);
  if (!value) {
    throw new Error("MarkdownProvider must be initialized.");
  }

  return value;
}

export interface MarkdownProviderProps {
  children: ReactNode;
}

export function MarkdownProvider({
  children,
}: Readonly<MarkdownProviderProps>): ReactElement {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  return (
    <Provider
      value={{
        reset: () => setMarkdown(DEFAULT_MARKDOWN),
        markdown,
        setMarkdown,
      }}
    >
      {children}
    </Provider>
  );
}
