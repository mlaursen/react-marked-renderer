import { type MarkdownRenderers } from "../types.js";
import { useContext } from "./renderers.js";

export function useMarkdownRenderers(): Readonly<MarkdownRenderers> {
  return useContext();
}
