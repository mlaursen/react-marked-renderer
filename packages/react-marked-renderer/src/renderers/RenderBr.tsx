// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

/**
 * The default implementation for rendering the {@link Tokens.Br} by rendering:
 *
 * ```tsx
 * <br />
 * ```
 */
export function RenderBr(): ReactElement {
  return <br />;
}
