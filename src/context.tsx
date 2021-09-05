import marked from "marked";
import { createContext, ReactElement, ReactNode, useContext } from "react";

import { DEFAULT_RENDERERS } from "./renderers";
import type {
  GetCodeLanguage,
  MarkdownConfig,
  MarkdownConfigContext,
  Renderers,
  ValidMarkedOptions,
} from "./types";

export const DEFAULT_MARKDOWN_OPTIONS: ValidMarkedOptions = {
  ...marked.getDefaults(),
  mangle: false,
};

/** @internal */
const DEFAULT_GET_LANGUAGE: GetCodeLanguage = (lang) => lang;

/** @internal */
const context = createContext<MarkdownConfigContext>({
  slugger: new marked.Slugger(),
  options: DEFAULT_MARKDOWN_OPTIONS,
  getLanguage: DEFAULT_GET_LANGUAGE,
  renderers: DEFAULT_RENDERERS,
});
context.displayName = "MarkdownConfig";

const { Provider } = context;

/** @internal */
export interface MarkdownConfigProviderProps extends MarkdownConfig {
  children: ReactNode;
}

/** @internal */
export function MarkdownConfigProvier({
  options,
  slugger,
  getLanguage = DEFAULT_GET_LANGUAGE,
  highlightCode,
  highlightElement,
  children,
  renderers,
}: MarkdownConfigProviderProps): ReactElement {
  // TODO: _Might_ have to look into optimizing setting the provider if there
  // are too many re-renderers due to the context never being shallow-equal
  return (
    <Provider
      value={{
        options,
        slugger,
        renderers,
        getLanguage,
        highlightCode,
        highlightElement,
      }}
    >
      {children}
    </Provider>
  );
}

/**
 * Gets the current markown config that was provided to the {@link Markdown}
 * component.
 */
export function useMarkdownConfig(): MarkdownConfigContext {
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

  const { slugger } = useMarkdownConfig();
  const seen = slugger.seen[text];
  const id = slugger.slug(text);
  return seen > 1 ? `${id}-${seen}` : id;
}

/**
 * This hooks is mostly an internal hook for creating some reasonable renderer
 * defaults for the {@link Renderers.list} and {@link Renderers.table}. It is
 * used to get the current implementation for all the renderers that were
 * provided to the {@link Markdown} component.
 *
 * @returns the current renderers
 */
export function useRenderers(): Renderers {
  return useMarkdownConfig().renderers;
}
