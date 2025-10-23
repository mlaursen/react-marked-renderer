// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderLinkProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Link} by
 * rendering:
 *
 * ```tsx
 * <a href={href} title={title}>{children}</href>
 * ```
 */
export function RenderLink({
  href,
  title,
  children,
}: Readonly<RenderLinkProps>): ReactElement {
  return (
    <a href={href} title={title || undefined}>
      {children}
    </a>
  );
}
