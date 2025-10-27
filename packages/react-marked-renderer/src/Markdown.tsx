import { Marked } from "marked";
import { type ReactElement, type ReactNode, useMemo } from "react";

import { reactMarkedRenderer } from "./reactMarkedRenderer.js";
import type {
  ReactMarkedExtension,
  ReactMarkedOptions,
  ReactMarkedRendererOptions,
} from "./types.js";

const EMPTY_LIST = [] as const;

export interface MarkdownProps extends ReactMarkedRendererOptions {
  /**
   * The markdown string to convert to React components.
   */
  markdown: string;

  /**
   * An optional list of extensions to apply before the main
   * `reactMarkedRenderer` extension. This will only work if the extensions
   * also output `ReactNode` instead of an html string.
   */
  extensions?: readonly ReactMarkedExtension[];

  /**
   * An optional marked instance if you want to control it manually.
   */
  marked?: Marked<ReactNode, ReactNode>;

  /**
   * Optional options to pass to `marked.parse(markdown, options)`. This
   * probably won't be used.
   */
  options?: ReactMarkedOptions;
}

/**
 * Renders markdown with custom React components.
 */
export function Markdown({
  marked: propMarked,
  options,
  renderers,
  extensions = EMPTY_LIST,
  markdown,
  parseHtml,
  parseHtmlProps,
}: Readonly<MarkdownProps>): ReactElement {
  const marked = useMemo(() => {
    if (propMarked) {
      return propMarked;
    }

    return new Marked<ReactNode, ReactNode>().use(
      ...extensions,
      reactMarkedRenderer({ renderers, parseHtml, parseHtmlProps })
    );
  }, [extensions, parseHtml, parseHtmlProps, propMarked, renderers]);

  return <>{marked.parse(markdown, options)}</>;
}
