import { type ReactElement } from "react";
import { type RenderCodeProps } from "react-marked-renderer";
import "server-only";
import { codeToHtml } from "shiki";

import { SHIKI_CONFIG } from "@/constants/shikiConfig";

import { CodeBlockContainer } from "./CodeBlockContainer";
import { CopyToClipboard } from "./CopyToClipboard";

export async function ServerRenderShikiCode({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): Promise<ReactElement> {
  return (
    <CodeBlockContainer
      html={await codeToHtml(text, {
        ...SHIKI_CONFIG,
        lang,
      })}
      fixedChildren={<CopyToClipboard copyText={text} />}
    />
  );
}
