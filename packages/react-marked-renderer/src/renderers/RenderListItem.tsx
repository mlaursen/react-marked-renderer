// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderListItemProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * <li>{children}</li>
 * ```
 */
export function RenderListItem({
  children,
}: Readonly<RenderListItemProps>): ReactElement {
  return <li>{children}</li>;
}
