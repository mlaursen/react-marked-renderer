import type { Tokens } from "marked";
import type { ComponentType, ReactElement } from "react";

export type ImageRendererProps = Tokens.Image;

/**
 * The default implementation for rendering the {@link Tokens.Image} by
 * rendering:
 *
 * ```tsx
 * <img src={href} alt={text || ""} title={title || undefined} />
 * ```
 */
export function ImageRenderer({
  href,
  text,
  title,
}: ImageRendererProps): ReactElement {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={href} alt={text || ""} title={title || undefined} />;
}

/**
 * These types of renderers are used for rendering media-like elements.
 */
export interface MediaRenderers {
  /** @see {@link ImageRenderer} for default implementation */
  img: ComponentType<ImageRendererProps>;
}

export const MEDIA_RENDERERS: MediaRenderers = {
  img: ImageRenderer,
};
