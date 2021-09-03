import type { HtmlRendererProps, TagRendererProps } from "../types";

/**
 * The default implementation for rendering the {@link Tokens.Tag} that will
 * render nothing.
 */
export function TagRenderer(_props: TagRendererProps): null {
  return null;
}

/**
 * The default implementation for rendering the {@link Tokens.HTML} that will
 * render nothing.
 */
export function HtmlRenderer(_props: HtmlRendererProps): null {
  return null;
}
