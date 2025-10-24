// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderListItemProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * if (task) {
 *   return <renderers.task {...props}  />
 * }
 *
 * return <li>{children}</li>
 * ```
 */
export function RenderListItem(
  props: Readonly<RenderListItemProps>
): ReactElement {
  const { task, checked = false, children, renderers } = props;
  const { task: RenderTask } = renderers;
  if (task) {
    return <RenderTask {...props} task checked={checked} />;
  }

  return <li>{children}</li>;
}
