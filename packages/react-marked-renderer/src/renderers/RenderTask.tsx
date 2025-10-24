// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement, useId } from "react";

import type { RenderTaskProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * const id = useId();
 *
 * <li>
 *   <renderers.checkbox id={id} checked={checked} renderers={renderers} />
 *   <label htmlFor={id}>{children}</label>
 * </li>
 * ```
 *
 * @remarks You'll most likely need to implement a custom renderer for this
 * since the default styles aren't very pretty.
 */
export function RenderTask({
  checked,
  children,
  renderers,
}: Readonly<RenderTaskProps>): ReactElement {
  const id = useId();
  const { checkbox: RenderCheckbox } = renderers;

  return (
    <li>
      <RenderCheckbox id={id} checked={checked} renderers={renderers} />
      <label htmlFor={id}>{children}</label>
    </li>
  );
}
