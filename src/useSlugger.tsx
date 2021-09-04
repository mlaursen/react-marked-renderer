import { Slugger, Token } from "marked";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const context = createContext(new Slugger());
const { Provider } = context;
context.displayName = "MarkdownSlugger";

/**
 * This _should_ mostly be internal since it is used by the {@link useSluggedId}
 * hook.
 *
 * @returns the current {@link Slugger} for the {@link Markdown} component.
 */
export function useSlugger(): Slugger {
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

/**
 * This is a reasonable default for generating unique ids for elements in the
 * {@link Markdown} component.
 *
 * @see {@link Slugger}
 * @param textOrTokens - The text or list of {@link Token} to convert to a
 * unique id
 * @returns a unique id that can be applied to a component
 */
export function useSluggedId(textOrTokens: string | readonly Token[]): string {
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
  slugger?: Slugger;
  children: ReactNode;
}

/** @internal */
export function MarkdownSluggerProvider({
  children,
  slugger: propSlugger,
}: MarkdownSluggerProviderProps): ReactElement {
  const slugger = useMemo(() => propSlugger ?? new Slugger(), [propSlugger]);
  return <Provider value={slugger}>{children}</Provider>;
}