// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import type { RenderTableProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Table} by
 * rendering:
 *
 * ```tsx
 * <table>{children}</table>
 * ```
 */
export function RenderTable({
  children,
}: Readonly<RenderTableProps>): ReactElement {
  return <table>{children}</table>;
}
