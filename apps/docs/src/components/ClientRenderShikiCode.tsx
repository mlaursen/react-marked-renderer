import "client-only";
import { type ReactElement, use } from "react";
import { type RenderCodeProps } from "react-marked-renderer";

import { highlighterPromise } from "@/constants/shikiClientHighlighter";
import { SHIKI_CONFIG } from "@/constants/shikiConfig";

import { CodeBlockContainer } from "./CodeBlockContainer";
import { CopyToClipboard } from "./CopyToClipboard";

export function ClientRenderShikiCode({
  lang = "",
  text,
}: Readonly<RenderCodeProps>): ReactElement {
  const highlighter = use(highlighterPromise);
  return (
    <CodeBlockContainer
      html={highlighter.codeToHtml(text, {
        ...SHIKI_CONFIG,
        lang,
      })}
      fixedChildren={<CopyToClipboard copyText={text} />}
    />
  );
}
