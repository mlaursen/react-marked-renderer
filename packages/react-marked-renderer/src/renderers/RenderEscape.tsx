// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderEscapeProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Escape} by
 * rendering:
 *
 * ```tsx
 * <>{text}</>
 * ```
 */
export function RenderEscape({
  text,
}: Readonly<RenderEscapeProps>): ReactElement {
  return <>{text}</>;
}
