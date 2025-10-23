import { type ReactElement } from "react";
import { Markdown } from "react-marked-renderer";

import { DEFAULT_MARKDOWN } from "./constants";
import { CUSTOM_RENDERERS } from "./renderers";
import { SERVER_RENDERERS } from "./serverRenderers";

export default async function HomePage(): Promise<ReactElement> {
  return (
    <>
      <Markdown markdown={DEFAULT_MARKDOWN} renderers={SERVER_RENDERERS} />
    </>
  );
}
