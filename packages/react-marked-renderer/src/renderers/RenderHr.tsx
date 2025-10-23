// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

/**
 * The default implementation for rendering the {@link Tokens.Hr} by rendering:
 *
 * ```tsx
 * <hr />
 * ```
 */
export function RenderHr(): ReactElement {
  return <hr />;
}
