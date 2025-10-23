// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderEmProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Em} by rendering:
 *
 * ```tsx
 * <em>{children}</em>
 * ```
 */
export function RenderEm({ children }: Readonly<RenderEmProps>): ReactElement {
  return <em>{children}</em>;
}
