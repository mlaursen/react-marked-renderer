// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderCodeProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Code} by
 * rendering:
 *
 * ```tsx
 * <pre><code>{children}</code></pre>
 * ```
 */
export function RenderCode({
  children,
}: Readonly<RenderCodeProps>): ReactElement {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}
