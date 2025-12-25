import { useStorage } from "@react-md/core/storage/useStorage";
import { type UseStateObject } from "@react-md/core/types";
import { createContext, useContext } from "react";
import { type ReactElement, type ReactNode } from "react";

export const RENDERERS = ["default", "prismjs", "highlightjs"] as const;
export type Renderer = (typeof RENDERERS)[number];

function isRenderer(renderer: string): renderer is Renderer {
  return RENDERERS.includes(renderer as Renderer);
}

const context = createContext<UseStateObject<"renderer", Renderer> | null>(
  null
);
const { Provider } = context;

export function useRenderer(): UseStateObject<"renderer", Renderer> {
  const value = useContext(context);
  if (!value) {
    throw new Error("RendererProvider has not been initialized");
  }

  return value;
}

export interface RendererProviderProps {
  children: ReactNode;
}

export function RendererProvider({
  children,
}: Readonly<RendererProviderProps>): ReactElement {
  const { value, setValue } = useStorage<Renderer>({
    key: "renderer",
    defaultValue: "default",
    deserializer: (item) => (!isRenderer(item) ? "default" : item),
  });

  return (
    <Provider value={{ renderer: value, setRenderer: setValue }}>
      {children}
    </Provider>
  );
}
