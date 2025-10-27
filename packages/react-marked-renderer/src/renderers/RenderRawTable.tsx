import { type ReactElement } from "react";

import type { RenderRawTableProps } from "../types.js";

export function RenderRawTable({
  token,
  parser,
  renderers,
}: Readonly<RenderRawTableProps>): ReactElement {
  const {
    table: RenderTable,
    tablerow: RenderTableRow,
    tablecell: RenderTableCell,
    thead: RenderTableHeader,
    tbody: RenderTableBody,
  } = renderers;
  const { rows, header } = token;
  const shared = {
    parser,
    renderers,
  };

  const headerText = header.map((header, i) => (
    <RenderTableCell key={i} {...header} {...shared}>
      {parser.parseInline(header.tokens)}
    </RenderTableCell>
  ));

  return (
    <RenderTable {...token} {...shared}>
      {header.length > 0 && (
        <RenderTableHeader table={token} {...shared} header>
          <RenderTableRow text={headerText} {...shared}>
            {headerText}
          </RenderTableRow>
        </RenderTableHeader>
      )}
      {rows.length > 0 && (
        <RenderTableBody table={token} {...shared} header={false}>
          {rows.map((cells, rowIndex) => {
            const rowText = cells.map((cell, cellIndex) => (
              <RenderTableCell key={cellIndex} {...cell} {...shared}>
                {cell.tokens ? parser.parseInline(cell.tokens) : cell.text}
              </RenderTableCell>
            ));

            return (
              <RenderTableRow key={rowIndex} text={rowText} {...shared}>
                {rowText}
              </RenderTableRow>
            );
          })}
        </RenderTableBody>
      )}
    </RenderTable>
  );
}
