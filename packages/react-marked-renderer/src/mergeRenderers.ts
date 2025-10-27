import { DEFAULT_MARKDOWN_RENDERERS } from "./constants.js";
import {
  type MarkdownRenderers,
  type OverridableMarkdownRenderers,
} from "./types.js";

/** @internal */
export function mergeRenderers(
  renderers?: OverridableMarkdownRenderers
): Readonly<MarkdownRenderers> {
  if (!renderers) {
    return DEFAULT_MARKDOWN_RENDERERS;
  }

  const merged: MarkdownRenderers = {
    ...DEFAULT_MARKDOWN_RENDERERS,
  };
  Object.entries(renderers).forEach(([name, renderer]) => {
    //  @ts-expect-error It can be mismatched types, but _shouldn't_
    merged[name] = renderer;
  });

  return merged;
}
