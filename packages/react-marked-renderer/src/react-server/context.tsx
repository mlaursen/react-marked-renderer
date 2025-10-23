import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  cache,
} from "react";

export interface ServerContextProviderProps<T> {
  value: T;
  children?: ReactNode;
}

export interface ServerContext<T> {
  Provider: ComponentType<ServerContextProviderProps<T>>;
  useContext: () => T;
}

export function createServerContext<T>(defaultValue: T): ServerContext<T> {
  const context = cache(() => ({ current: defaultValue }));

  function Provider({
    value,
    children,
  }: Readonly<ServerContextProviderProps<T>>): ReactElement {
    context().current = value;
    return <>{children}</>;
  }

  return {
    Provider,
    useContext: () => context().current,
  };
}
