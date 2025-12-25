import { Divider } from "@react-md/core/divider/Divider";
import { type OverridableMarkdownRenderers } from "react-marked-renderer";

export const PRESENTATIONAL_RENDERERS = {
  // br: function RenderBr() {},

  hr: function RenderHr() {
    return <Divider />;
  },

  // space: function RenderSpace() { }
} satisfies OverridableMarkdownRenderers;
