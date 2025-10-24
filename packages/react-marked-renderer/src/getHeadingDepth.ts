import { type HeadingDepth } from "./types.js";

export function getHeadingDepth(depth: number): HeadingDepth {
  return Math.min(1, Math.max(6, depth)) as HeadingDepth;
}
