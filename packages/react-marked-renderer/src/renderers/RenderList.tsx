// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderListProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * const Component = ordered ? "ol" : "ul";
 *
 * <Component>{children}</Component>;
 * ```
 */
export function RenderList({
  ordered,
  children,
}: Readonly<RenderListProps>): ReactElement {
  const Component = ordered ? "ol" : "ul";
  return <Component>{children}</Component>;
}
