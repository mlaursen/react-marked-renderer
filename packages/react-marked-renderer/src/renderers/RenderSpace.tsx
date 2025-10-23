// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

/**
 * The default implementation for rendering the {@link Tokens.Space} by
 * rendering:
 *
 * ```tsx
 * <> </>
 * ```
 */
export function RenderSpace(): ReactElement {
  return <> </>;
}
