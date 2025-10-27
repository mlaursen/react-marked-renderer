import type { Token } from "marked";

export interface GetTokensTextOptions {
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
 * @param options - The {@link GetTokensTextOptions}
 * @returns the text content for the list of tokens
 */
export function getTokensText(
  tokens: readonly Token[],
  { depth = 0, maxDepth = -1 }: GetTokensTextOptions = {}
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
