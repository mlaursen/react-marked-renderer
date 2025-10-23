// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderDelProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Del} by rendering:
 *
 * ```tsx
 * <del>{children}</del>
 * ```
 */
export function RenderDel({
  children,
}: Readonly<RenderDelProps>): ReactElement {
  return <del>{children}</del>;
}
