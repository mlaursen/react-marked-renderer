import type { ReactElement } from "react";

import type { ListItemRendererProps, ListRendererProps } from "../types";

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
export function ListRenderer({
  ordered,
  children,
}: ListRendererProps): ReactElement {
  const Component = ordered ? "ol" : "ul";
  return <Component>{children}</Component>;
}

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * <li>{children}</li>
 * ```
 */
export function ListItemRenderer({
  children,
}: ListItemRendererProps): ReactElement {
  return <li>{children}</li>;
}
