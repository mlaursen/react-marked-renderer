import type { marked } from "marked";
import {
  ComponentType,
  createContext,
  DOMAttributes,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

/**
 * A function that should highlight all the code within an `HTMLElement`. This
 * should normally just be something like `Prism.highlightElement` or
 * `HighlightJS.highlightElement`.
 *
 * @param element - The `<code>` element that should be highlighted
 */
export type HighlightElement = (element: HTMLElement) => Promise<void> | void;

/**
 * This function is mostly used if you'd like to be able to have the code
 * highlighted via `dangerouslySetInnerHTML` so that the code can be highlighted
 * in node environments.
 *
 * @example
 * PrismJS Example
 * ```tsx
 * <Markdown highlightCode={Prism.highlightCode} markdown={markdown} />
 * ```
 *
 * @param code - The raw code string to turn into an HTML string
 * @param language - The current code language or an empty string
 * @returns the html to dangerously set within a `<code>` tag
 */
export type DangerouslyHighlightCode = (
  code: string,
  language: string
) => string;

/**
 * A function that can be used to get the language for a block of code or
 * allow different aliases.
 *
 * @example
 * Simple Example
 * ```ts
 * const getLanguage: GetCodeLanguage = (raw, suggestedLanguage) => {
 *   switch (suggestedLanguage) {
 *     case "":
 *       // default to markup
 *       return "markup";
 *     case "sh":
 *       // allow sh to be an alias for shell
 *       return "shell";
 *     default:
 *       return suggestedLanguage;
 *   }
 * }
 * ```
 *
 * @defaultValue = `(lang) => lang`
 * @param lang - The language suggested by `marked`
 * @param rawCode - The raw code source
 * @returns The language to use
 */
export type GetCodeLanguage = (lang: string, rawCode: string) => string;

export interface HighlightCodeOptions {
  /** {@inheritDoc GetCodeLanguage} */
  getLanguage?: GetCodeLanguage;

  /** {@inheritDoc DangerouslyHighlightCode} */
  highlightCode?: DangerouslyHighlightCode;
  /** {@inheritDoc HighlightElement} */
  highlightElement?: HighlightElement;
}

/**
 * This type ensures that both the `highlightCode` an `highlightElement`
 * functions cannot be provided at the same time.
 */
export type ValidHighlightCodeOptions =
  | {
      highlightCode?: DangerouslyHighlightCode;
      highlightElement?: never;
    }
  | {
      highlightCode?: never;
      highlightElement?: HighlightElement;
    }
  | {
      highlightCode?: never;
      highlightElement?: never;
    };

export type MarkdownOptions = Omit<
  marked.MarkedOptions,
  "highlight" | "sanitize" | "sanitizer"
>;

export interface MarkdownCodeOptions
  extends MarkdownOptions,
    HighlightCodeOptions {}

/** @internal */
export interface MarkdownCodeContext extends MarkdownCodeOptions {
  getLanguage: GetCodeLanguage;
}

export const DEFAULT_MARKDOWN_OPTIONS: MarkdownOptions = {
  baseUrl: "",
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: "",
  langPrefix: "language-",
  mangle: false,
  pedantic: false,
  silent: false,
  smartLists: false,
  smartypants: false,
  xhtml: false,
};

/** @internal */
export const DEFAULT_GET_LANGUAGE: GetCodeLanguage = (lang) => lang;

/** @internal */
const context = createContext<MarkdownCodeContext>({
  ...DEFAULT_MARKDOWN_OPTIONS,
  getLanguage: DEFAULT_GET_LANGUAGE,
});
context.displayName = "MarkdownCode";
const { Provider } = context;

/**
 *
 * @returns the current markdown configuration
 */
export function useMarkdownConfig(): Readonly<MarkdownCodeContext> {
  return useContext(context);
}

/** @internal */
export interface MarkdownCodeProviderProps extends HighlightCodeOptions {
  children: ReactNode;
  options: MarkdownOptions;
}

/** @internal */
export function MarkdownCodeProvider({
  children,
  options,
  getLanguage = DEFAULT_GET_LANGUAGE,
  highlightCode,
  highlightElement,
}: MarkdownCodeProviderProps): ReactElement {
  const value = useMemo<MarkdownCodeContext>(
    () => ({
      ...options,
      getLanguage,
      highlightCode,
      highlightElement,
    }),
    [getLanguage, highlightCode, highlightElement, options]
  );

  return <Provider value={value}>{children}</Provider>;
}

export interface CodeSpanRendererProps extends marked.Tokens.Codespan {
  children: ReactNode;
}

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

export interface CodeBlockRendererProps extends marked.Tokens.Code {
  lang: string;
  children: ReactNode;
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
  const { langPrefix, highlightCode, highlightElement } = useMarkdownConfig();

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

export interface CodeRenderers {
  /** @see {@link CodeSpanRenderer} for default implementation */
  codespan: ComponentType<CodeSpanRendererProps>;
  /** @see {@link CodeBlockRenderer} for default implementation */
  codeblock: ComponentType<CodeBlockRendererProps>;
}

export const CODE_RENDERERS: CodeRenderers = {
  codespan: CodeSpanRenderer,
  codeblock: CodeBlockRenderer,
};
