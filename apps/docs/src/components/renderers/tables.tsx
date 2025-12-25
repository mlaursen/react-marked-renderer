import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type MarkdownRenderers } from "react-marked-renderer";

export const TABLE_RENDERERS = {
  table: function RenderTable({ children }) {
    return (
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
    );
  },
  tablecell: function RenderTableCell({ header, align, children }) {
    return (
      <TableCell header={header} align={align || undefined}>
        {children}
      </TableCell>
    );
  },
  tablerow: function RenderTableRow({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  tbody: function Tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  thead: function Thead({ children }) {
    return <TableHeader>{children}</TableHeader>;
  },
} satisfies Partial<MarkdownRenderers>;
