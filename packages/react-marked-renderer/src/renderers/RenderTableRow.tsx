// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderTableRowProps } from "../types.js";

/**
 * The default implementation for rendering a {@link Tokens.TableRow}
 *
 * ```tsx
 * <tr>{children}</tr>
 * ```
 */
export function RenderTableRow({
  children,
}: Readonly<RenderTableRowProps>): ReactElement {
  return <tr>{children}</tr>;
}
