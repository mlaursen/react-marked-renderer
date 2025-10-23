import { type ReactElement, type ReactNode } from "react";

import { type RenderTableCellProps } from "../types.js";

export function RenderTableCell({
  align,
  children,
  header,
}: Readonly<RenderTableCellProps>): ReactElement {
  const Component = header ? "th" : "td";
  return <Component align={align || undefined}>{children}</Component>;
}
