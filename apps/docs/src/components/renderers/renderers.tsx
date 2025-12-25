import { type OverridableMarkdownRenderers } from "react-marked-renderer";

import { HTML_RENDERERS } from "./html";
import { LIST_RENDERERS } from "./lists";
import { MEDIA_RENDERERS } from "./media";
import { PRESENTATIONAL_RENDERERS } from "./presentational";
import { REACT_RENDERERS } from "./react";
import { TABLE_RENDERERS } from "./tables";
import { TEXT_RENDERERS } from "./text";

export const CUSTOM_RENDERERS = {
  ...HTML_RENDERERS,
  ...LIST_RENDERERS,
  ...MEDIA_RENDERERS,
  ...PRESENTATIONAL_RENDERERS,
  ...REACT_RENDERERS,
  ...TABLE_RENDERERS,
  ...TEXT_RENDERERS,
} satisfies OverridableMarkdownRenderers;
