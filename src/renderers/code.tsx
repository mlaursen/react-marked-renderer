import { DOMAttributes, ReactElement, ReactNode, useCallback } from "react";

import { useMarkdownConfig } from "../context";
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
 * The default implementation for rendering the {@link Tokens.Code} that will:
 *
 * - apply a `className={${langPrefix}${lang}\}` if there is a `lang` to both
 *   the `<pre>` and `<code>` elements
 * - highlight the `<code>` block if either the {@link DangerouslyHighlightCode}
 *   or {@link HighlightElement} functions were provided to the {@link Markdown}
 *   component
 */
export function CodeBlockRenderer({
  lang,
  text,
  children: propChildren,
}: CodeBlockRendererProps): ReactElement {
  const { options, highlightCode, highlightElement } = useMarkdownConfig();
  const { langPrefix } = options;

  let key: string | undefined;
  let children: ReactNode;
  let dangerouslySetInnerHTML: DOMAttributes<HTMLElement>["dangerouslySetInnerHTML"];
  if (highlightCode) {
    dangerouslySetInnerHTML = {
      __html: highlightCode(text, lang),
    };
  } else {
    children = propChildren;

    // a key is added to the `<pre>` element so that the code will be
    // re-highlighted if the text or language changes. This is only really
    // required if creating a "real-time" markdown previewer
    if (highlightElement) {
      key = `${text}${lang}`;
    }
  }

  const className = lang ? `${langPrefix}${lang}` : undefined;
  return (
    <pre key={key} className={className}>
      <code
        ref={useCallback(
          (instance: HTMLElement | null) => {
            if (!instance || !highlightElement) {
              return;
            }

            highlightElement(instance);
          },
          [highlightElement]
        )}
        className={className}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      >
        {children}
      </code>
    </pre>
  );
}
