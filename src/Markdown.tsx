import marked from "marked";
import type { ReactElement } from "react";

import {
  DEFAULT_MARKDOWN_OPTIONS,
  DEFAULT_MARKDOWN_RENDERERS,
  HighlightCodeOptions,
  MarkdownCodeProvider,
  MarkdownRenderers,
  MarkdownRenderersProvider,
  MarkdownOptions,
  TokensRenderer,
  ValidHighlightCodeOptions,
} from "./renderers";
import { MarkdownSluggerProvider } from "./useSluggedId";

export interface BaseMarkdownProps extends HighlightCodeOptions {
  /**
   * The markdown to be parsed by [marked](https://github.com/markedjs/marked)
   * and rendered in react components.
   */
  markdown: string;

  /**
   * Any options to use while parsing the markdown string.
   *
   * @see {@link DEFAULT_MARKDOWN_OPTIONS}
   * @defaultValue `DEFAULT_MARKDOWN_OPTIONS`
   */
  options?: Readonly<MarkdownOptions>;

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
   *
   * @defaultValue = `new marked.Slugger()`
   */
  slugger?: marked.Slugger;

  /** {@inheritDoc MarkdownRenderers} */
  renderers?: Readonly<MarkdownRenderers>;
}

/**
 * All the props for the {@link Markdown} component that ensures that both of
 * the {@link HighlightCodeOptions} are not provided at the same time.
 */
export type MarkdownProps = BaseMarkdownProps & ValidHighlightCodeOptions;

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
 *   DEFAULT_MARKDOWN_RENDERERS,
 *   ListRenderer,
 *   Markdown,
 *   Renderers,
 *   getTokensText,
 * } from "react-marked-renderer";
 * import { BrowserRouter as Router, Link } from "react-router-dom";
 *
 * const renderers: Renderers = {
 *   ...DEFAULT_MARKDOWN_RENDERERS,
 *   link: function CustomLink({ href, title, children }) {
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
 * PrismJS Code Highlighting (Browser)
 * ```tsx
 * import { render } from "react-dom";
 * import {
 *   DEFAULT_MARKDOWN_RENDERERS,
 *   Markdown,
 *   Renderers,
 * } from "react-marked-renderer";
 * import Prism from "prismjs";
 * // import prism theme/components or use `babel-plugin-prismjs`
 *
 * const renderers: Renderers = {
 *   ...DEFAULT_MARKDOWN_RENDERERS,
 *   codespan: function CodeSpan({ children }) {
 *     // just so it gets some prism styling
 *     return <code className="language-none">{children}</code>;
 *   },
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
 * PrismJS Code Highlighting (Node an Browser)
 * ```tsx
 * import { render } from "react-dom";
 * import {
 *   DEFAULT_MARKDOWN_RENDERERS,
 *   DangerouslyHighlight,
 *   GetCodeLanguage,
 *   Markdown,
 *   Renderers,
 * } from "react-marked-renderer";
 * import Prism from "prismjs";
 *
 * const renderers: Renderers = {
 *   ...DEFAULT_MARKDOWN_RENDERERS,
 *   codespan: function CodeSpan({ children }) {
 *     // just so it gets some prism styling
 *     return <code className="language-none">{children}</code>;
 *   },
 * };
 *
 * const getLanguage: GetCodeLanguage = (lang, _rawCode) => {
 *   // allow aliases
 *   lang = lang === "sh" ? "shell" : lang;
 *
 *   // if the Prism doesn't support the language, default to nothing instead
 *   // of crashing
 *   if (!Prism.languages[lang]) {
 *     return "none";
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
  options = DEFAULT_MARKDOWN_OPTIONS,
  // have to create a new slugger each render since the seen count would keep
  // incrementing with react-refresh
  slugger = new marked.Slugger(),
  markdown,
  renderers = DEFAULT_MARKDOWN_RENDERERS,
  getLanguage,
  highlightCode,
  highlightElement,
}: MarkdownProps): ReactElement {
  const tokens = marked.lexer(markdown, options);
  return (
    <MarkdownCodeProvider
      options={options}
      getLanguage={getLanguage}
      highlightCode={highlightCode}
      highlightElement={highlightElement}
    >
      <MarkdownSluggerProvider slugger={slugger}>
        <MarkdownRenderersProvider renderers={renderers}>
          <TokensRenderer tokens={tokens} />
        </MarkdownRenderersProvider>
      </MarkdownSluggerProvider>
    </MarkdownCodeProvider>
  );
}
