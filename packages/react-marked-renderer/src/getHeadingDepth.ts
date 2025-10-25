import { type HeadingDepth } from "./types.js";

export function getHeadingDepth(depth: number): HeadingDepth {
  return Math.min(6, Math.max(1, depth)) as HeadingDepth;
}
