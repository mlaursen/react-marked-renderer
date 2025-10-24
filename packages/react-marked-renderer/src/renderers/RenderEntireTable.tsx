import type { Tokens } from "marked";
import { type ReactElement } from "react";

import type { PropsWithRenderers } from "../types.js";

export type RenderEntireTableProps = PropsWithRenderers<{
  token: Tokens.Table;
}>;

export function RenderEntireTable({
  token,
  renderers,
}: Readonly<RenderEntireTableProps>): ReactElement {
  const { rows, header } = token;
  const {
    table: RenderTable,
    thead: RenderThead,
    tbody: RenderTbody,
    tr: RenderTr,
    td: RenderTd,
    th: RenderTh,
    tokens: RenderTokens,
  } = renderers;

  return (
    <RenderTable {...token} renderers={renderers}>
      {header.length > 0 && (
        <RenderThead {...token} renderers={renderers} isHeader>
          <RenderTr {...token} renderers={renderers} cells={header}>
            {header.map((cell, i) => (
              <RenderTh key={i} {...cell} renderers={renderers}>
                <RenderTokens tokens={cell.tokens} renderers={renderers} />
              </RenderTh>
            ))}
          </RenderTr>
        </RenderThead>
      )}
      {rows.length > 0 && (
        <RenderTbody {...token} renderers={renderers} isHeader={false}>
          {rows.map((cells, rowIndex) => (
            <RenderTr
              key={rowIndex}
              {...token}
              renderers={renderers}
              cells={cells}
            >
              {cells.map((cell, cellIndex) => (
                <RenderTd key={cellIndex} {...cell} renderers={renderers}>
                  <RenderTokens tokens={cell.tokens} renderers={renderers} />
                </RenderTd>
              ))}
            </RenderTr>
          ))}
        </RenderTbody>
      )}
    </RenderTable>
  );
}
