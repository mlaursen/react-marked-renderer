import marked from "marked";
import type { ReactElement } from "react";

import { DEFAULT_MARKDOWN_OPTIONS, MarkdownConfigProvier } from "./context";
import { DEFAULT_RENDERERS } from "./renderers";
import { TokensRenderer } from "./renderers/tokens";
import type {
  DangerouslyHighlightCode,
  HighlightCodeOptions,
  HighlightElement,
  Renderers,
  ValidMarkedOptions,
} from "./types";

export interface BaseMarkdownProps extends HighlightCodeOptions {
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
  options?: ValidMarkedOptions;

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
  slugger?: marked.Slugger;

  /** {@inheritDoc Renderers} */
  renderers?: Partial<Renderers>;
}

/**
 * All the props for the {@link Markdown} component that ensures that both of
 * the {@link HighlightCodeOptions} are not provided at the same time.
 */
export type MarkdownProps = BaseMarkdownProps &
  (
    | {
        highlightCode: DangerouslyHighlightCode;
        highlightElement?: never;
      }
    | {
        highlightCode?: never;
        highlightElement: HighlightElement;
      }
    | {
        highlightCode?: never;
        highlightElement?: never;
      }
  );

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
 * import { BrowserRouter as Router, Link } from "react-router-dom";
 *
 * const renderers: Partial<Renderers> = {
 *   link: function CustomLink({ href, title, children }: LinkRendererProps) {
 *     // make links use html5 history and not cause reloads
 *     return (
 *       <Link to={href} title={title}>
 *         {children}
 *       </Link>
 *     );
 *   },
 *
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
 *           onChange={(event) => setChecked(event.currentTarget.checked)}
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
 *   },
 * };
 *
 * render(
 *   <Router>
 *     <Markdown markdown={markdown} renderers={renderers} />
 *   </Router>,
 *   document.getElementById("root")
 * );
 * ```
 *
 * @example
 * Code Highlighting (PrismJS)
 * ```tsx
 * import { render } from "react-dom";
 * import { Markdown, Renderers } from "react-marked-renderer";
 * import Prism from "prismjs";
 *
 * const renderers: Partial<Renderers> = {
 *   codespan: function CodeSpan({ children }) {
 *     // just so it gets some prism styling
 *     return <code className="language-none">{children}</code>
 *   }
 * };
 *
 * render(
 *   <Markdown
 *     markdown={markdown}
 *     renderers={renderers}
 *     highlightElement={Prism.highlightElement}
 *   />,
 *   document.getElementById("root")
 * );
 * ```
 *
 * @example
 * SSR Code Highlighting (PrismJS)
 * ```tsx
 * import { render } from "react-dom";
 * import {
 *   CodeGetCodeLanguage,
 *   DangerouslyHighlight,
 *   Markdown,
 *   Renderers
 * } from "react-marked-renderer";
 * import Prism from "prismjs";
 *
 * const renderers: Partial<Renderers> = {
 *   codespan: function CodeSpan({ children }) {
 *     // just so it gets some prism styling
 *     return <code className="language-none">{children}</code>
 *   }
 * };
 *
 * const getLanguage: GetCodeLanguage = (lang, _rawCode) => {
 *   // allow aliases
 *   lang = lang === "sh" ? "shell" : lang;
 *
 *   // if the Prism doesn't support the language, default to nothing instead
 *   // of crashing
 *   if (!Prism.languages[lang]) {
 *     return "";
 *   }
 *
 *   return lang;
 * };
 *
 * const highlightCode: DangerouslyHighlightCode = (code, lang) =>
 *   Prism.highlight(code, Prism.languages[lang], lang);
 *
 * render(
 *   <Markdown
 *     markdown={markdown}
 *     renderers={renderers}
 *     getLanguage={getLanguage}
 *     highlightCode={highlightCode}
 *   />,
 *   document.getElementById("root")
 * );
 * ```
 */
export function Markdown({
  options,
  // have to create a new slugger each render since the seen count would keep
  // incrementing with react-refresh
  slugger = new marked.Slugger(),
  markdown,
  renderers,
  getLanguage,
  highlightCode,
  highlightElement,
}: MarkdownProps): ReactElement {
  const resolvedOptions: marked.MarkedOptions = {
    ...DEFAULT_MARKDOWN_OPTIONS,
    ...options,
  };

  const tokens = marked.lexer(markdown, resolvedOptions);
  return (
    <MarkdownConfigProvier
      options={resolvedOptions}
      slugger={slugger}
      renderers={{
        ...DEFAULT_RENDERERS,
        ...renderers,
      }}
      getLanguage={getLanguage}
      highlightCode={highlightCode}
      highlightElement={highlightElement}
    >
      <TokensRenderer tokens={tokens} />
    </MarkdownConfigProvier>
  );
}
