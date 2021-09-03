import type { ReactElement } from "react";

import type { ImageRendererProps } from "../types";

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
