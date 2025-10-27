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
 *
 * So this will match things like:
 *
 * ```markdown
 * Allow \\_\\_tests\\_\\_.
 * ```
 *
 * This would be called 4 times with `_`.
 */
export function RenderEscape({
  text,
}: Readonly<RenderEscapeProps>): ReactElement {
  return <>{text}</>;
}
