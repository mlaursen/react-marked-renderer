import type {
  MarkedExtension,
  MarkedOptions,
  Parser,
  Renderer,
  Tokens,
} from "marked";
import type { ComponentType, ReactNode } from "react";

export type ReactMarkedRenderer = Renderer<ReactNode, ReactNode>;
export type ReactMarkedParser = Parser<ReactNode, ReactNode>;
export type ReactMarkedOptions = Omit<
  MarkedOptions<ReactNode, ReactNode>,
  "async"
>;
export type ReactMarkedExtension = MarkedExtension<ReactNode, ReactNode>;
export type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6;

export interface DefinedMarkdownRenderers {
  renderers: Readonly<MarkdownRenderers>;
}
export type SharedRenderProps<T> = T &
  DefinedMarkdownRenderers & {
    parser: ReactMarkedParser;
  };
export type SharedRenderPropsWithChildren<T> = SharedRenderProps<
  T & { children: ReactNode }
>;

export type RenderHrProps = SharedRenderProps<Tokens.Hr>;
export type RenderBrProps = SharedRenderProps<Tokens.Br>;
export type RenderSpaceProps = SharedRenderProps<Tokens.Space>;
export type RenderEscapeProps = SharedRenderProps<Tokens.Escape>;
export type RenderHtmlProps = SharedRenderProps<Tokens.HTML>;
export type RenderTagProps = SharedRenderProps<Tokens.Tag>;
export type RenderImageProps = SharedRenderPropsWithChildren<Tokens.Image>;
export type RenderGenericProps = SharedRenderProps<Tokens.Generic>;
export type RenderDefProps = SharedRenderProps<Tokens.Def>;

export type RenderDelProps = SharedRenderPropsWithChildren<Tokens.Del>;
export type RenderEmProps = SharedRenderPropsWithChildren<Tokens.Em>;
export type RenderHeadingProps = SharedRenderPropsWithChildren<
  Omit<Tokens.Heading, "depth"> & { depth: HeadingDepth }
>;
export type RenderLinkProps = SharedRenderPropsWithChildren<Tokens.Link>;
export type RenderParagraphProps =
  SharedRenderPropsWithChildren<Tokens.Paragraph>;
export type RenderBlockquoteProps =
  SharedRenderPropsWithChildren<Tokens.Blockquote>;
export type RenderTextProps = SharedRenderPropsWithChildren<Tokens.Text>;
export type RenderStrongProps = SharedRenderPropsWithChildren<Tokens.Strong>;

export type RenderCheckboxProps = SharedRenderProps<
  Tokens.Checkbox & { id?: string }
>;
export type RenderListProps = SharedRenderPropsWithChildren<Tokens.List>;
export type RenderListItemProps =
  SharedRenderPropsWithChildren<Tokens.ListItem>;
export type RenderTaskProps = SharedRenderPropsWithChildren<
  Tokens.ListItem & { task: true; checked: boolean }
>;

export type RenderCodeProps = SharedRenderPropsWithChildren<Tokens.Code>;
export type RenderCodeSpanProps =
  SharedRenderPropsWithChildren<Tokens.Codespan>;

export type RenderRawTableProps = SharedRenderProps<{ token: Tokens.Table }>;
export type RenderTableProps = SharedRenderPropsWithChildren<Tokens.Table>;
export type RenderTableCellProps =
  SharedRenderPropsWithChildren<Tokens.TableCell>;
export type RenderTableRowProps = SharedRenderPropsWithChildren<
  Tokens.TableRow<ReactNode>
>;
export type RenderTableSectionProps = SharedRenderPropsWithChildren<{
  table: Tokens.Table;
  header: boolean;
}>;

export type RenderReactElementProps =
  SharedRenderPropsWithChildren<Tokens.ReactElementToken>;

export interface MarkdownRenderers {
  br: ComponentType<RenderBrProps>;
  hr: ComponentType<RenderHrProps>;
  def: ComponentType<RenderDefProps>;
  space: ComponentType<RenderSpaceProps>;
  escape: ComponentType<RenderEscapeProps>;

  text: ComponentType<RenderTextProps>;
  em: ComponentType<RenderEmProps>;
  del: ComponentType<RenderDelProps>;
  strong: ComponentType<RenderStrongProps>;
  heading: ComponentType<RenderHeadingProps>;
  paragraph: ComponentType<RenderParagraphProps>;
  blockquote: ComponentType<RenderBlockquoteProps>;

  link: ComponentType<RenderLinkProps>;

  code: ComponentType<RenderCodeProps>;
  codespan: ComponentType<RenderCodeSpanProps>;

  image: ComponentType<RenderImageProps>;

  checkbox: ComponentType<RenderCheckboxProps>;
  list: ComponentType<RenderListProps>;
  listitem: ComponentType<RenderListItemProps>;
  task: ComponentType<RenderTaskProps>;

  raw_table: ComponentType<RenderRawTableProps>;
  table: ComponentType<RenderTableProps>;
  tablecell: ComponentType<RenderTableCellProps>;
  tablerow: ComponentType<RenderTableRowProps>;
  thead: ComponentType<RenderTableSectionProps>;
  tbody: ComponentType<RenderTableSectionProps>;

  react: ComponentType<RenderReactElementProps>;
  html: ComponentType<RenderHtmlProps>;
  tag: ComponentType<RenderTagProps>;
}

export type OverridableMarkdownRenderers = Partial<Readonly<MarkdownRenderers>>;

export interface ReactElementExtensionOptions {
  parseHtml?: boolean;
  parseHtmlProps?: (rawProps: string) => Tokens.ReactElementToken["props"];
}

export interface ReactMarkedRendererOptions
  extends ReactElementExtensionOptions {
  renderers?: OverridableMarkdownRenderers;
}
