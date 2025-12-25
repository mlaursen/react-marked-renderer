import { type OverridableMarkdownRenderers } from "react-marked-renderer";

export const MEDIA_RENDERERS = {
  // img: function RenderImage({ href, text = "", title }) {
  //   return <img src={href} alt={text} title={title} />;
  // },
} satisfies OverridableMarkdownRenderers;
