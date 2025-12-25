import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

import type { CodeRenderers } from "./code";
import { CODE_RENDERERS } from "./code";
import type { HtmlRenderers } from "./html";
import { HTML_RENDERERS } from "./html";
import type { ListRenderers } from "./list";
import { LIST_RENDERERS } from "./list";
import type { MediaRenderers } from "./media";
import { MEDIA_RENDERERS } from "./media";
import type { PresentationRenderers } from "./presentational";
import { PRESENTATIONAL_RENDERERS } from "./presentational";
import type { TableRenderers } from "./table";
import { TABLE_RENDERERS } from "./table";
import type { TextRenderers } from "./text";
import { TEXT_RENDERERS } from "./text";

/**
 * @see {@link DEFAULT_MARKDOWN_RENDERERS} for the default implementation
 */
export interface MarkdownRenderers
  extends CodeRenderers,
    HtmlRenderers,
    ListRenderers,
    MediaRenderers,
    PresentationRenderers,
    TableRenderers,
    TextRenderers {}

/**
 * The default implementation for the {@link MarkdownRenderers}
 *
 * @see {@link CODE_RENDERERS}
 * @see {@link HTML_RENDERERS}
 * @see {@link LIST_RENDERERS}
 * @see {@link MEDIA_RENDERERS}
 * @see {@link PRESENTATIONAL_RENDERERS}
 * @see {@link TABLE_RENDERERS}
 * @see {@link TEXT_RENDERERS}
 */
export const DEFAULT_MARKDOWN_RENDERERS: MarkdownRenderers = {
  ...CODE_RENDERERS,
  ...HTML_RENDERERS,
  ...LIST_RENDERERS,
  ...MEDIA_RENDERERS,
  ...PRESENTATIONAL_RENDERERS,
  ...TABLE_RENDERERS,
  ...TEXT_RENDERERS,
};

const context = createContext<MarkdownRenderers>(DEFAULT_MARKDOWN_RENDERERS);
context.displayName = "MarkdownRenderers";
const { Provider } = context;

/**
 * This hook is pretty much an internal hook since it is used for the
 * {@link TokenRenderer} component to render the tokens that `marked` has
 * parsed. This can be used externally, but it's probably easier just to just
 * import your components manually.
 *
 * @example
 * Simple Example
 * ```tsx
 * function CustomHtmlRenderer({ text, raw }: HtmlRendererProps): ReactElement | null {
 *   const renderers = useMarkdownRenderers();
 *   const { codeblock: CodeBlock } = renderers;
 *
 *   const rawCode = `\`\`\`html\n${raw}\n\`\`\``;
 *   return (
 *     <CodeBlock
 *       type="code"
 *       raw={rawCode}
 *       text={text}
 *       lang="html"
 *     >
 *       {text}
 *     </CodeBlock>
 *   );
 * }
 * ```
 *
 * @returns the current renderers for the {@link Markdown} component.
 */
export function useMarkdownRenderers(): Readonly<MarkdownRenderers> {
  return useContext(context);
}

/** @internal */
export interface MarkdownRenderersProviderProps {
  children: ReactNode;
  renderers: Readonly<MarkdownRenderers>;
}

/** @internal */
export function MarkdownRenderersProvider({
  children,
  renderers,
}: MarkdownRenderersProviderProps): ReactElement {
  return <Provider value={renderers}>{children}</Provider>;
}
