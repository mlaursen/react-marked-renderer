// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import type { RenderTextProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Text} by
 * rendering:
 *
 * ```tsx
 * <>{children || raw}</>
 * ```
 *
 * @remarks This defaults to using `raw` instead of the sanitized `text` because
 * React already handles the sanitization. If the `text` is used, the generated
 * text would display html entities instead of the correct string.
 */
export function RenderText({
  raw,
  children,
}: Readonly<RenderTextProps>): ReactElement {
  return <>{children || raw}</>;
}
