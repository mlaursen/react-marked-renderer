// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderParagraphProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Paragraph} by
 * rendering:
 *
 * ```tsx
 * <p>{children}</p>
 * ```
 */

export function RenderParagraph({
  children,
}: Readonly<RenderParagraphProps>): ReactElement {
  return <p>{children}</p>;
}
