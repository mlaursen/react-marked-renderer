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
 * <Component start={start}>{children}</Component>;
 * ```
 */
export function RenderList({
  start,
  ordered,
  children,
}: Readonly<RenderListProps>): ReactElement {
  const Component = ordered ? "ol" : "ul";
  return (
    <Component start={typeof start === "number" ? start : undefined}>
      {children}
    </Component>
  );
}
