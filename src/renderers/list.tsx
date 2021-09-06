import type { Tokens } from "marked";
import type { ComponentType, ReactElement, ReactNode } from "react";

import { getTokensText, useSluggedId } from "../useSluggedId";

export interface ListRendererProps extends Tokens.List {
  children: ReactNode;
}

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

export interface ListItemRendererProps
  extends Omit<Tokens.ListItem, "checked" | "task"> {
  children: ReactNode;
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

export interface TaskRendererProps extends ListItemRendererProps {
  defaultChecked: boolean;
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

/**
 * These types of renderers are used for rendering lists.
 */
export interface ListRenderers {
  /** @see {@link ListRenderer} for default implementation */
  list: ComponentType<ListRendererProps>;
  /** @see {@link ListItemRenderer} for default implementation */
  listitem: ComponentType<ListItemRendererProps>;
  /** @see {@link TaskRenderer} for default implementation */
  task: ComponentType<TaskRendererProps>;
}

export const LIST_RENDERERS: ListRenderers = {
  list: ListRenderer,
  listitem: ListItemRenderer,
  task: TaskRenderer,
};
