import { DEFAULT_MARKDOWN_RENDERERS } from "./constants.js";
import { type MarkdownRenderers } from "./types.js";

export function mergeRenderers(
  renderers?: Partial<Readonly<MarkdownRenderers>>
): Readonly<MarkdownRenderers> {
  if (!renderers) {
    return DEFAULT_MARKDOWN_RENDERERS;
  }

  const merged: MarkdownRenderers = { ...DEFAULT_MARKDOWN_RENDERERS };
  Object.entries(renderers).forEach(([name, renderer]) => {
    //  @ts-expect-error It can be mismatched types, but _shouldn't_
    merged[name] = renderer;
  });

  return merged;
}
