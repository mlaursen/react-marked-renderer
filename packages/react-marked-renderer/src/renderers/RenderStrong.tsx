// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderStrongProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Strong} by
 * rendering:
 *
 * ```tsx
 * <strong>{children}</strong>
 * ```
 */
export function RenderStrong({
  children,
}: Readonly<RenderStrongProps>): ReactElement {
  return <strong>{children}</strong>;
}
