import type { ReactElement } from "react";

import { getTokensText, useSluggedId } from "../context";
import type {
  ListItemRendererProps,
  ListRendererProps,
  TaskRendererProps,
} from "../types";

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

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * const id = useSluggedId(`${getTokensText(props.tokens)}-task`);
 *
 * <li {...props}>
 *   <input id={id} type="checkbox" defaultChecked={defaultChecked} />
 *   <label htmlFor={id}>{children}</label>
 * </li>
 * ```
 *
 * @remarks You'll most likely need to implement a custom renderer for this
 * since the default styles aren't very pretty.
 */
export function TaskRenderer({
  defaultChecked,
  children,
  ...props
}: TaskRendererProps): ReactElement {
  const id = useSluggedId(`${getTokensText(props.tokens)}-task`);

  return (
    <li>
      <input id={id} type="checkbox" defaultChecked={defaultChecked} />
      <label htmlFor={id}>{children}</label>
    </li>
  );
}
