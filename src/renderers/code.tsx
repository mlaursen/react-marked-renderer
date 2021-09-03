import type { ReactElement } from "react";

import type { CodeBlockRendererProps, CodeSpanRendererProps } from "../types";

/**
 * The default implementation for rendering the {@link Tokens.Codespan} by
 * rendering:
 *
 * ```tsx
 * <code>{children}</code>
 * ```
 */
export function CodeSpanRenderer({
  children,
}: CodeSpanRendererProps): ReactElement {
  return <code>{children}</code>;
}

/**
 * The default implementation for rendering the {@link Tokens.Code} by
 * rendering:
 *
 * ```tsx
 * <pre>
 *   <code>{children}</code>
 * </pre>
 * ```
 */
export function CodeBlockRenderer({
  children,
}: CodeBlockRendererProps): ReactElement {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}
