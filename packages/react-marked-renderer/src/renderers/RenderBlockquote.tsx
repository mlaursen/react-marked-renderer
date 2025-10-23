// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderBlockquoteProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Blockquote} by
 * rendering:
 *
 * ```tsx
 * <blockquote>{children}</blockquote>
 * ```
 */
export function RenderBlockquote({
  children,
}: Readonly<RenderBlockquoteProps>): ReactElement {
  return <blockquote>{children}</blockquote>;
}
