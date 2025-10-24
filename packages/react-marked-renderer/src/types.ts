import {
  type Lexer,
  type MarkedOptions,
  type Token,
  type Tokens,
} from "marked";
import { type ComponentType, type ReactNode } from "react";

export type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6;

export interface RenderTokensProps {
  tokens: readonly Token[] | undefined;
  renderers: Readonly<MarkdownRenderers>;
}

export type PropsWithRenderers<T> = T & {
  renderers: Readonly<MarkdownRenderersWithTokens>;
};
export type PropsWithDefinedChildren<T> = PropsWithRenderers<
  T & { children: ReactNode }
>;

export type RenderHrProps = PropsWithRenderers<Tokens.Hr>;
export type RenderBrProps = PropsWithRenderers<Tokens.Br>;
export type RenderSpaceProps = PropsWithRenderers<Tokens.Space>;
export type RenderEscapeProps = PropsWithRenderers<Tokens.Escape>;
export type RenderHtmlProps = PropsWithRenderers<Tokens.HTML>;
export type RenderTagProps = PropsWithRenderers<Tokens.Tag>;
export type RenderImageProps = PropsWithRenderers<Tokens.Image>;
export type RenderGenericProps = PropsWithRenderers<Tokens.Generic>;
export type RenderDefProps = PropsWithRenderers<Tokens.Def>;

export type RenderDelProps = PropsWithDefinedChildren<Tokens.Del>;
export type RenderEmProps = PropsWithDefinedChildren<Tokens.Em>;
export type RenderHeadingProps = PropsWithDefinedChildren<
  Tokens.Heading & { depth: HeadingDepth }
>;
export type RenderLinkProps = PropsWithDefinedChildren<Tokens.Link>;
export type RenderParagraphProps = PropsWithDefinedChildren<Tokens.Paragraph>;
export type RenderBlockquoteProps = PropsWithDefinedChildren<Tokens.Blockquote>;
export type RenderTextProps = PropsWithDefinedChildren<Tokens.Text>;
export type RenderStrongProps = PropsWithDefinedChildren<Tokens.Strong>;

export type RenderCheckboxProps = PropsWithRenderers<
  Tokens.Checkbox & { id?: string }
>;
export type RenderListProps = PropsWithDefinedChildren<Tokens.List>;
export type RenderListItemProps = PropsWithDefinedChildren<Tokens.ListItem>;
export type RenderTaskProps = PropsWithDefinedChildren<
  Tokens.ListItem & { task: true; checked: boolean }
>;

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
  task: ComponentType<RenderTaskProps>;
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

export interface MarkdownRenderersWithTokens extends MarkdownRenderers {
  tokens: ComponentType<RenderTokensProps>;
}

export interface MarkdownProps {
  lexer?: typeof Lexer.lex;
  options?: MarkedOptions;
  markdown: string;
  renderers?: Partial<Readonly<MarkdownRenderers>>;
}
