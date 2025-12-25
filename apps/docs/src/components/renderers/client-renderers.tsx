import "client-only";
import { type OverridableMarkdownRenderers } from "react-marked-renderer";

import { ClientRenderShikiCode } from "../ClientRenderShikiCode";
import { CUSTOM_RENDERERS } from "./renderers";

export const CLIENT_RENDERERS = {
  ...CUSTOM_RENDERERS,

  code: ClientRenderShikiCode,
} satisfies OverridableMarkdownRenderers;
