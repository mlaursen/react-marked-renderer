import { createContext, ReactElement, ReactNode, useContext } from "react";

import { CodeRenderers, CODE_RENDERERS } from "./code";
import { HtmlRenderers, HTML_RENDERERS } from "./html";
import { ListRenderers, LIST_RENDERERS } from "./list";
import { MediaRenderers, MEDIA_RENDERERS } from "./media";
import {
  PRESENTATIONAL_RENDERERS,
  PresentationRenderers,
} from "./presentational";
import { TableRenderers, TABLE_RENDERERS } from "./table";
import { TextRenderers, TEXT_RENDERERS } from "./text";

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
