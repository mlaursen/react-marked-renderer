// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderImageProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Image} by
 * rendering:
 *
 * ```tsx
 * <img src={href} alt={text || ""} title={title || undefined} />
 * ```
 */
export function RenderImage({
  href,
  text = "",
  title,
}: Readonly<RenderImageProps>): ReactElement {
  return <img src={href} alt={text} title={title || undefined} />;
}
