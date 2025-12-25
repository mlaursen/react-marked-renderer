import { type OverridableMarkdownRenderers } from "react-marked-renderer";

export const CODE_RENDERERS = {
  code: function RenderCode() {
    return null;
  },
} satisfies OverridableMarkdownRenderers;
