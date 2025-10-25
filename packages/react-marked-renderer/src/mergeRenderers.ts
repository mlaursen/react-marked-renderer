import { DEFAULT_MARKDOWN_RENDERERS_WITH_TOKENS } from "./constants.js";
import {
  type MarkdownRenderers,
  type MarkdownRenderersWithTokens,
} from "./types.js";

export function mergeRenderers(
  renderers?: Partial<Readonly<MarkdownRenderers>>
): Readonly<MarkdownRenderersWithTokens> {
  if (!renderers) {
    return DEFAULT_MARKDOWN_RENDERERS_WITH_TOKENS;
  }

  const merged: MarkdownRenderersWithTokens = {
    ...DEFAULT_MARKDOWN_RENDERERS_WITH_TOKENS,
  };
  Object.entries(renderers).forEach(([name, renderer]) => {
    //  @ts-expect-error It can be mismatched types, but _shouldn't_
    merged[name] = renderer;
  });

  return merged;
}
