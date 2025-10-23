import { Divider } from "@react-md/core/divider/Divider";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { Link } from "@react-md/core/link/Link";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { Typography } from "@react-md/core/typography/Typography";
import { type MarkdownRenderers } from "react-marked-renderer";

export const CUSTOM_RENDERERS = {
  hr: function RenderHr() {
    return <Divider />;
  },

  link: function RenderLink({ href, title, children }) {
    return (
      <Link href={href} title={title || undefined}>
        {children}
      </Link>
    );
  },
  heading: function RenderHeading({ depth, children }) {
    const type = `headline-${depth}` as "headline-1";
    return <Typography type={type}>{children}</Typography>;
  },
  paragraph: function RenderParagraph({ children }) {
    return <Typography>{children}</Typography>;
  },

  list_item: function RenderListItem({ children }) {
    return <Typography as="li">{children}</Typography>;
  },
  checkbox: function RenderCheckbox({ id, checked }) {
    return <Checkbox id={id} defaultChecked={checked} />;
  },

  // table parts
  table: function RenderTable({ children }) {
    return (
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
    );
  },
  tbody: function Tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  thead: function Thead({ children }) {
    return <TableHeader>{children}</TableHeader>;
  },
  tr: function Tr({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  td: function Td({ children }) {
    return <TableCell>{children}</TableCell>;
  },
  th: function Th({ children }) {
    return <TableCell>{children}</TableCell>;
  },
} satisfies Partial<MarkdownRenderers>;
