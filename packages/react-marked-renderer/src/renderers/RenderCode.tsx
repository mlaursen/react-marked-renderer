// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderCodeProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Code} by
 * rendering:
 *
 * ```tsx
 * <code>{children}</code>
 * ```
 */
export function RenderCode({
  raw,
  type,
  text,
  codeBlockStyle,
  escaped,
  lang,
  children,
}: Readonly<RenderCodeProps>): ReactElement {
  return (
    <pre className={lang ? `language-${lang}` : undefined}>
      <code>{children}</code>
    </pre>
  );
}
