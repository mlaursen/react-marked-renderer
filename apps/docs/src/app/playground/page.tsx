"use client";

import { type ReactElement } from "react";
import { Markdown } from "react-marked-renderer";

import { useMarkdown } from "@/components/Playground/MarkdownProvider";
import { CLIENT_RENDERERS } from "@/components/renderers/client-renderers";

export default function DefaultPlaygroundPage(): ReactElement {
  const { markdown } = useMarkdown();
  return <Markdown markdown={markdown} renderers={CLIENT_RENDERERS} />;
}
