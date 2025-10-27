import { type ReactElement } from "react";

import { type RenderTableSectionProps } from "../types.js";

/**
 * The default implementation for rendering a `<thead>` or `<tbody>` which
 * defaults to:
 *
 * ```tsx
 * const Tag = header ? "thead" : "tbody":
 *
 * <Tag>{children}</Tag>
 * ```
 */
export function RenderTableSection({
  header,
  children,
}: Readonly<RenderTableSectionProps>): ReactElement {
  const Component = header ? "thead" : "tbody";
  return <Component>{children}</Component>;
}
