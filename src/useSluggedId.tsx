import type { Slugger, Token } from "marked";
import marked from "marked";
import { createContext, ReactElement, ReactNode, useContext } from "react";

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
  tokens: readonly Token[],
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

const context = createContext<Slugger>(new marked.Slugger());
context.displayName = "MarkdownSlugger";
const { Provider } = context;

/**
 * This is mostly an internal hook to get the current slugger, but it can be
 * used if the {@link useSluggedId} does not work for your use-case and you need
 * access to the full `Slugger`
 */
export function useMarkdownSlugger(): Slugger {
  return useContext(context);
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

  const slugger = useMarkdownSlugger();
  const seen = slugger.seen[text];
  const id = slugger.slug(text);
  return seen > 1 ? `${id}-${seen}` : id;
}

/** @internal */
export interface MarkdownSluggerProviderProps {
  children: ReactNode;
  slugger: Slugger;
}

/** @internal */
export function MarkdownSluggerProvider({
  children,
  slugger,
}: MarkdownSluggerProviderProps): ReactElement {
  return <Provider value={slugger}>{children}</Provider>;
}
