import { type Lexer, type MarkedOptions, type Tokens } from "marked";
import { type ComponentType, type ReactNode } from "react";

export type PropsWithDefinedChildren<T> = T & { children: ReactNode };

export type RenderHrProps = Tokens.Hr;
export type RenderBrProps = Tokens.Br;
export type RenderSpaceProps = Tokens.Space;
export type RenderEscapeProps = Tokens.Escape;
export type RenderHtmlProps = Tokens.HTML;
export type RenderTagProps = Tokens.Tag;
export type RenderImageProps = Tokens.Image;
export type RenderGenericProps = Tokens.Generic;
export type RenderDefProps = Tokens.Def;

export type RenderDelProps = PropsWithDefinedChildren<Tokens.Del>;
export type RenderEmProps = PropsWithDefinedChildren<Tokens.Em>;
export type RenderHeadingProps = PropsWithDefinedChildren<Tokens.Heading>;
export type RenderLinkProps = PropsWithDefinedChildren<Tokens.Link>;
export type RenderParagraphProps = PropsWithDefinedChildren<Tokens.Paragraph>;
export type RenderBlockquoteProps = PropsWithDefinedChildren<Tokens.Blockquote>;
export type RenderTextProps = PropsWithDefinedChildren<Tokens.Text>;
export type RenderStrongProps = PropsWithDefinedChildren<Tokens.Strong>;

export type RenderCheckboxProps = Tokens.Checkbox & {
  id?: string;
};
export type RenderListProps = PropsWithDefinedChildren<Tokens.List>;
export type RenderListItemProps = PropsWithDefinedChildren<Tokens.ListItem>;

export type RenderCodeProps = PropsWithDefinedChildren<Tokens.Code>;
export type RenderCodeSpanProps = PropsWithDefinedChildren<Tokens.Codespan>;

export type RenderTableProps = PropsWithDefinedChildren<Tokens.Table>;
export type RenderTableCellProps = PropsWithDefinedChildren<Tokens.TableCell>;
export type RenderTableRowProps = PropsWithDefinedChildren<
  Tokens.Table & { cells: readonly Tokens.TableCell[] }
>;
export type RenderTableSectionProps = PropsWithDefinedChildren<
  Tokens.Table & { isHeader: boolean }
>;

export interface MarkdownRenderers {
  hr: ComponentType<RenderHrProps>;
  br: ComponentType<RenderBrProps>;
  space: ComponentType<RenderSpaceProps>;
  strong: ComponentType<RenderStrongProps>;
  escape: ComponentType<RenderEscapeProps>;
  html: ComponentType<RenderHtmlProps>;
  tag: ComponentType<RenderTagProps>;
  image: ComponentType<RenderImageProps>;
  del: ComponentType<RenderDelProps>;
  em: ComponentType<RenderEmProps>;
  heading: ComponentType<RenderHeadingProps>;
  link: ComponentType<RenderLinkProps>;
  paragraph: ComponentType<RenderParagraphProps>;
  blockquote: ComponentType<RenderBlockquoteProps>;
  text: ComponentType<RenderTextProps>;
  checkbox: ComponentType<RenderCheckboxProps>;
  list: ComponentType<RenderListProps>;
  list_item: ComponentType<RenderListItemProps>;
  code: ComponentType<RenderCodeProps>;
  codespan: ComponentType<RenderCodeSpanProps>;
  generic: ComponentType<RenderGenericProps>;
  def: ComponentType<RenderDefProps>;
  table: ComponentType<RenderTableProps>;
  thead: ComponentType<RenderTableSectionProps>;
  tbody: ComponentType<RenderTableSectionProps>;
  td: ComponentType<RenderTableCellProps>;
  th: ComponentType<RenderTableCellProps>;
  tr: ComponentType<RenderTableRowProps>;
}

export interface MarkdownProps {
  lexer?: typeof Lexer.lex;
  options?: MarkedOptions;
  markdown: string;
  renderers?: Partial<MarkdownRenderers>;
}
