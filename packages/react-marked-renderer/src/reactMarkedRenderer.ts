import type { MarkedExtension } from "marked";
import type { ReactNode } from "react";

import { MarkedReactParser } from "./MarkedReactParser.js";
import { createReactElementExtensions } from "./createReactElementExtensions.js";
import { createRenderer } from "./createRenderer.js";
import { mergeRenderers } from "./mergeRenderers.js";
import type { ReactMarkedRendererOptions } from "./types.js";

/**
 * Allows `marked` to render markdown as React components. This should not be
 * used if using the `Markdown` component without the `marked` prop.
 *
 * @example Custom Setup Example
 * ```tsx
 * import { Marked } from  "marked";
 * import { reactMarkedRenderer } from "react-marked-renderer";
 *
 * const marked = new Marked<ReactNode, ReactNode>();
 * marked.use(...customExtensions);
 * marked.use(reactMarkedRenderer());
 *
 * <Markdown marked={marked} markdown={markdown} renderers={renderers} />
 *
 * // or manually
 * const result: ReactNode = marked.parse(markdown);
 * ```
 *
 *
 */
export function reactMarkedRenderer(
  options: Readonly<ReactMarkedRendererOptions> = {}
): MarkedExtension<ReactNode, ReactNode> {
  const { parseHtml } = options;
  const renderers = mergeRenderers(options.renderers);
  const renderer = createRenderer({ ...options, renderers });
  return {
    hooks: {
      provideParser() {
        const isBlock = this.block;

        return function parser(tokens, options = {}) {
          Object.assign(options, { renderer: options.renderer ?? renderer });
          if (isBlock) {
            return MarkedReactParser.parse(tokens, options);
          }

          return MarkedReactParser.parse(tokens, options);
        };
      },
    },
    renderer,
    extensions: parseHtml ? createReactElementExtensions({ renderers }) : null,
  };
}
