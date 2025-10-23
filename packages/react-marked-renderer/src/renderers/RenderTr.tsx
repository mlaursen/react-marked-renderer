import { type ReactElement } from "react";

import { type RenderTableRowProps } from "../types.js";

export function RenderTr({
  children,
}: Readonly<RenderTableRowProps>): ReactElement {
  return <tr>{children}</tr>;
}
