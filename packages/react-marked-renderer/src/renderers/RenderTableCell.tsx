import { type ReactElement } from "react";

import { type RenderTableCellProps } from "../types.js";

/**
 * The default implementation for rendering a {@link Tokens.TableCell} that
 * renders:
 *
 * ```tsx
 * const Tag = header ? "th" : "td";
 * <Tag align={align}>{children}</Tag>
 * ```
 */
export function RenderTableCell({
  align,
  children,
  header,
}: Readonly<RenderTableCellProps>): ReactElement {
  const Component = header ? "th" : "td";
  return <Component align={align || undefined}>{children}</Component>;
}
