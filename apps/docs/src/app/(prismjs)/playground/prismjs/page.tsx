"use client";

import { Markdown } from "@react-marked-renderer/prismjs";
import { type ReactElement } from "react";

import { CUSTOM_RENDERERS } from "@/app/renderers";
import { useMarkdown } from "@/components/Playground/MarkdownProvider";

export default function PrismJsPage(): ReactElement {
  const { markdown } = useMarkdown();

  return <Markdown markdown={markdown} renderers={CUSTOM_RENDERERS} />;
}
