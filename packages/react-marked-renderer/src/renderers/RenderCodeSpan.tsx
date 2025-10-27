// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderCodeSpanProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.CodeSpan} by
 * rendering:
 *
 * ```tsx
 * <code>{children}</code>
 * ```
 */
export function RenderCodeSpan({
  children,
}: Readonly<RenderCodeSpanProps>): ReactElement {
  return <code>{children}</code>;
}
