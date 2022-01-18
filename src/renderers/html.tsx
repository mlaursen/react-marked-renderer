import type { marked } from "marked";
import type { ComponentType, ReactElement, ReactNode } from "react";

export interface TagRendererProps extends marked.Tokens.Tag {
  children: ReactNode;
}

/**
 * The default implementation for rendering the {@link Tokens.Tag} that will
 * render nothing.
 */
export function TagRenderer(_props: TagRendererProps): null {
  return null;
}

export interface HtmlRendererProps extends marked.Tokens.HTML {
  children: ReactNode;
}

/**
 * The default implementation for rendering the {@link Tokens.HTML} that will
 * render nothing.
 */
export function HtmlRenderer(_props: HtmlRendererProps): null {
  return null;
}

export type EscapeRendererProps = marked.Tokens.Escape;

/**
 * The default implementation for rendering the {@link Tokens.Escape} by
 * rendering:
 *
 * ```tsx
 * <>{text}</>
 * ```
 */
export function EscapeRenderer({ text }: EscapeRendererProps): ReactElement {
  return <>{text}</>;
}

export interface HtmlRenderers {
  /** @see {@link TagRenderer} for default implementation */
  tag: ComponentType<TagRendererProps>;
  /** @see {@link HtmlRenderer} for default implementation */
  html: ComponentType<HtmlRendererProps>;
  /** @see {@link EscapeRenderer} for default implementation */
  escape: ComponentType<EscapeRendererProps>;
}

export const HTML_RENDERERS: HtmlRenderers = {
  tag: TagRenderer,
  html: HtmlRenderer,
  escape: EscapeRenderer,
};
