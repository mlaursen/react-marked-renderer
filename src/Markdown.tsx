import { getDefaults, lexer, MarkedOptions, Slugger } from "marked";
import type { ReactElement } from "react";

import { DEFAULT_RENDERERS, TokensRenderer } from "./renderers";
import type { Renderers } from "./types";
import { MarkdownRendererProvider } from "./useRenderers";
import { MarkdownSluggerProvider } from "./useSlugger";

export interface MarkdownProps {
  /**
   * The markdown to be parsed by [marked](https://github.com/markedjs/marked)
   * and rendered in react components.
   */
  markdown: string;

  /**
   * Any options to use while parsing the markdown string.
   *
   * Note: This will always be called as:
   *
   * ```ts
   * const tokens = lexer(markdown, {
   *   ...marked.getDefaults(),
   *   mangle: false,
   *   ...options,
   * });
   * ```
   *
   * The default options are always merged with the new options since most of
   * the time you only want to change a few options instead of all of them.
   * `marked` does not merge by default, so everything omitted will be set to
   * `false`.
   *
   * In addition, the `mangle` option is set to `false` by default since it
   * would prevent emails from being displayed correctly.
   */
  options?: MarkedOptions;

  /**
   * An optional slugger to provide that generates unique ids for different
   * components. You'll most likely never need to use this prop unless you are
   * rendering multiple {@link Markdown} components on the same page that have a
   * change of having the same ids.
   *
   * @example
   * Preventing Duplicated Ids
   * ```tsx
   * import { render } from "react-dom";
   * import { Markdown, Slugger } from "react-marked-renderer";
   *
   * const slugger = new Slugger();
   *
   * // Without providing the same slugger, both headings would have the same id
   * const markdown = "# Heading"
   *
   * function App() {
   *   return (
   *     <>
   *       <Markdown markdown={markdown} slugger={slugger} />
   *       <Markdown markdown={markdown} slugger={slugger} />
   *     </>
   *   );
   * }
   *
   * render(
   *   <App />,
   *   document.getElementById("root")
   * );
   * ```
   */
  slugger?: Slugger;

  /** {@inheritDoc Renderers} */
  renderers?: Partial<Renderers>;
}

/**
 * This component renders markdown as react components.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { render } from "react-dom";
 * import { Markdown } from "react-marked-renderer";
 *
 * const markdown = `# Heading 1
 *
 * This is some text that will be rendered as a paragraph.
 *
 * Markdown defaults to the github-flavored markdown.
 * `;
 *
 * render(
 *   <Markdown markdown={markdown} />,
 *   document.getElementById("root")
 * );
 * ```
 *
 * @example
 * Custom Renderers
 * ```tsx
 * import { useState } from "react";
 * import { render } from "react-dom";
 * import {
 *   ListRenderer,
 *   getTokensText,
 *   Markdown,
 *   Renderers,
 * } from "react-marked-renderer";
 *
 * const renderers: Partial<Renderers> = {
 *   blockquote: function Blockquote({ children }) {
 *     return <blockquote className="custom">{children}</blockquote>;
 *   },
 *
 *   task: function Task({ defaultChecked, tokens, children }) {
 *     // hooks can be used in these renderers
 *     const id = useSluggedId(`${getTokensText(tokens)}-task`);
 *     const [checked, setChecked] = useState(defaultChecked);
 *     return (
 *       <li className="task-item">
 *         <input
 *           id={id}
 *           checked={checked}
 *           onChange={event => setChecked(event.currentTarget.checked)}
 *         />
 *         <label htmlFor={d}>{children}</label>
 *       </li>
 *     );
 *   },
 *
 *   list: function List(props) {
 *     // can get the current renderers as well
 *     const renderers = useRenderers();
 *     const { listitem: ListItem } = renderers;
 *     const item = <ListItem>Content</ListItem>;
 *
 *     // or just return the default renderer
 *     return <ListRenderer {...props} />;
 *   }
 * };
 *
 * render(
 *   <Markdown markdown={markdown} renderers={renderers} />,
 *   document.getElementById("root")
 * );
 * ```
 *
 * @example
 * Code Highlighting (PrismJS)
 * ```tsx
 * import { render } from "react-dom";
 * import { Markdown, Renderers } from "react-marked-renderer";
 * import { highlightElement } from "prismjs";
 *
 * const renderers: Partial<Renderers> = {
 *   // Note: You might need to update the `lang` to be one of the known Prism
 *   // languages
 *   codeblock: function CodeBlock({ lang, text }) {
 *     const highlight = useCallback(
 *       (instance: HTMLElement ) => {
 *         if (!instance || !text) {
 *           return;
 *         }
 *
 *         highlightElement(instance);
 *       },
 *       []
 *     );
 *
 *     // a key is added to the `<pre>` element so that the code will be
 *     // re-highlighted if the text or language changes. This is only really
 *     // required if creating a "real-time" markdown previewer
 *     return (
 *       <pre key={`${lang}${text}`} className={`language-${lang}`}>
 *         <code ref={highlight}>{text}</code>
 *       </pre>
 *     );
 *   },
 *
 *   codespan: function CodeSpan({ children }) {
 *     // just so it gets some prism styling
 *     return <code className="language-none">{children}</code>
 *   }
 * };
 *
 * render(
 *   <Markdown markdown={markdown} renderers={renderers} />,
 *   document.getElementById("root")
 * );
 * ```
 */
export function Markdown({
  options,
  slugger,
  markdown,
  renderers = DEFAULT_RENDERERS,
}: MarkdownProps): ReactElement {
  const tokens = lexer(markdown, {
    ...getDefaults(),
    mangle: false,
    ...options,
  });
  return (
    <MarkdownRendererProvider
      value={{
        ...DEFAULT_RENDERERS,
        ...renderers,
      }}
    >
      <MarkdownSluggerProvider slugger={slugger}>
        <TokensRenderer tokens={tokens} />
      </MarkdownSluggerProvider>
    </MarkdownRendererProvider>
  );
}
