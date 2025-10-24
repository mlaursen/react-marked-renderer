import type { Tokens } from "marked";
import { type ReactElement } from "react";

import type { PropsWithRenderers } from "../types.js";

export type RenderEntireListProps = PropsWithRenderers<{ token: Tokens.List }>;

export function RenderEntireList({
  token,
  renderers,
}: Readonly<RenderEntireListProps>): ReactElement {
  const {
    list: RenderList,
    list_item: RenderListItem,
    tokens: RenderTokens,
  } = renderers;

  return (
    <RenderList {...token} renderers={renderers}>
      {token.items.map((item, i) => {
        return (
          <RenderListItem key={i} {...item} renderers={renderers}>
            <RenderTokens tokens={item.tokens} renderers={renderers} />
          </RenderListItem>
        );
      })}
    </RenderList>
  );
}
