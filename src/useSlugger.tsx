import marked from "marked";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const context = createContext(new marked.Slugger());
const { Provider } = context;
context.displayName = "MarkdownSlugger";

/**
 * This _should_ mostly be internal since it is used by the {@link useSluggedId}
 * hook.
 *
 * @returns the current {@link Slugger} for the {@link Markdown} component.
 */
export function useSlugger(): marked.Slugger {
  return useContext(context);
}

export interface TokensTextOptions {
  /**
   * The current depth which is used with the `maxDepth` parameter.
   *
   * @defaultValue `0`
   */
  depth?: number;

  /**
   * An optional max depth to recursively traverse in the list of {@link Token}.
   * Defaults to traversing everything.
   *
   * @defaultValue `-1`
   */
  maxDepth?: number;
}

/**
 * A util to get the text content from the tokens without using the `token.raw`.
 *
 * @param tokens - The list of {@link Token} to parse for text.
 * @param options - The {@link TokensTextOptions}
 * @returns the text content for the list of tokens
 */
export function getTokensText(
  tokens: readonly marked.Token[],
  { depth = 0, maxDepth = -1 }: TokensTextOptions = {}
): string {
  return tokens.reduce((s, token) => {
    let text = "";
    if (
      "tokens" in token &&
      token.tokens &&
      (maxDepth === -1 || depth < maxDepth)
    ) {
      text = getTokensText(token.tokens, {
        maxDepth,
        depth: depth + 1,
      });
    } else if ("text" in token) {
      text = token.text.trim();
    }

    if (text) {
      return `${s ? `${s} ` : ""}${text}`;
    }

    return s;
  }, "");
}

/**
 * This is a reasonable default for generating unique ids for elements in the
 * {@link Markdown} component.
 *
 * @example
 * Simple Example
 * ```tsx
 * const text = "This is some heading text";
 * const id = useSluggedId(text);
 * // "this-is-some-heading-text"
 * ```
 *
 * @example
 * Using Tokens
 * ```tsx
 * const tokens: readonly Token[] = [
 *   { type: "text", text: "Some content", raw: "Some content" },
 *   {
 *     type: "link",
 *     text: "Link Text",
 *     raw: "[Link Text](https://example.com)",
 *     href: "https://example.com",
 *     title: "",
 *     tokens: [
 *       {
 *         type: "text",
 *         raw: "Link Text",
 *         text: "Link Text",
 *       },
 *     ],
 *   },
 * ];
 * const id = useSluggedId(tokens);
 * // "some-content-link-text"
 * ```
 *
 * @see {@link Slugger}
 * @param textOrTokens - The text or list of {@link Token} to convert to a
 * unique id
 * @returns a unique id that can be applied to a component
 */
export function useSluggedId(
  textOrTokens: string | readonly marked.Token[]
): string {
  const text =
    typeof textOrTokens === "string"
      ? textOrTokens
      : getTokensText(textOrTokens);

  const slugger = useSlugger();
  const seen = slugger.seen[text];
  const id = slugger.slug(text);
  return seen > 1 ? `${id}-${seen}` : id;
}

/** @internal */
interface MarkdownSluggerProviderProps {
  slugger?: marked.Slugger;
  children: ReactNode;
}

/** @internal */
export function MarkdownSluggerProvider({
  children,
  slugger: propSlugger,
}: MarkdownSluggerProviderProps): ReactElement {
  const slugger = useMemo(
    () => propSlugger ?? new marked.Slugger(),
    [propSlugger]
  );
  return <Provider value={slugger}>{children}</Provider>;
}
