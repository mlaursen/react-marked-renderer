// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Tokens } from "marked";
import { type ReactElement, useId } from "react";

import type { RenderTaskProps } from "../types.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RenderTaskUnsafe } from "./RenderTaskUnsafe.js";

/**
 * The default implementation for rendering the {@link Tokens.ListItem} when
 * the `task` prop is `true` by rendering:
 *
 * ```tsx
 * const id = useId();
 *
 * <li>
 *   <renderers.checkbox id={id} checked={checked} renderers={renderers} />
 *   {loose ? children : <label htmlFor={id}>{children}</label>}
 * </li>
 * ```
 *
 * @see {@link RenderTaskUnsafe} for a way to possibly render loose task lists
 * @remarks You'll most likely need to implement a custom renderer for this
 * since the default styles aren't very pretty.
 */
export function RenderTask({
  loose,
  parser,
  checked,
  children,
  renderers,
}: Readonly<RenderTaskProps>): ReactElement {
  const id = useId();
  const { checkbox: RenderCheckbox } = renderers;

  return (
    <li>
      <RenderCheckbox
        id={id}
        checked={checked}
        parser={parser}
        renderers={renderers}
      />
      {loose ? children : <label htmlFor={id}>{children}</label>}
    </li>
  );
}
