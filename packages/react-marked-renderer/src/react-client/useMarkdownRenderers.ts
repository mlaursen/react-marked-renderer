import { useContext } from "react";

import { type MarkdownRenderers } from "../types.js";
import { context } from "./renderers.js";

export function useMarkdownRenderers(): Readonly<MarkdownRenderers> {
  return useContext(context);
}
