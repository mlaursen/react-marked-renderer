import { type HeadingDepth } from "./types.js";

/**
 * Small utility to force a heading depth to be `1 | 2 | 3 | 4 | 5 | 6` instead
 * of `number`.
 */
export function getHeadingDepth(depth: number): HeadingDepth {
  return Math.min(6, Math.max(1, depth)) as HeadingDepth;
}
