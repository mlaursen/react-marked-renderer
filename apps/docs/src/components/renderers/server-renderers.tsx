import { type OverridableMarkdownRenderers } from "react-marked-renderer";
import "server-only";

import { ServerRenderShikiCode } from "../ServerRenderShikiCode";
import { CUSTOM_RENDERERS } from "./renderers";

export const SERVER_RENDERERS = {
  ...CUSTOM_RENDERERS,

  code: ServerRenderShikiCode,
} satisfies OverridableMarkdownRenderers;
