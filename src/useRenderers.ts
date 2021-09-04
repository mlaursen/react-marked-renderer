import { createContext, useContext } from "react";

import { DEFAULT_RENDERERS } from "./renderers";
import type { Renderers } from "./types";

const context = createContext<Renderers>(DEFAULT_RENDERERS);

/** @internal */
export const { Provider: MarkdownRendererProvider } = context;
context.displayName = "MarkdownRenderer";

/**
 * This hooks is mostly an internal hook for creating some reasonable renderer
 * defaults for the {@link Renderers.list} and {@link Renderers.table}. It is
 * used to get the current implementation for all the renderers that were
 * provided to the {@link Markdown} component.
 *
 * @returns the current renderers
 */
export function useRenderers(): Renderers {
  return useContext(context);
}
