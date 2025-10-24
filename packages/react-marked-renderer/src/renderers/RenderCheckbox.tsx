// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement, useId } from "react";

import { type RenderCheckboxProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Checkbox} by
 * rendering:
 *
 * ```tsx
 * const genId = useId();
 * return <input id={id || genId} type="checkbox" defaultChecked={checked} />;
 * ```
 */
export function RenderCheckbox({
  id,
  checked,
}: Readonly<RenderCheckboxProps>): ReactElement {
  const genId = useId();
  return <input id={id || genId} type="checkbox" defaultChecked={checked} />;
}
