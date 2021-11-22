import type { marked } from "marked";
import type { ComponentType, ReactElement, ReactNode } from "react";

export interface TableRendererProps extends marked.Tokens.Table {
  children: ReactNode;
}

/**
 * The default implementation for rendering the {@link Tokens.Table} by
 * rendering:
 *
 * ```tsx
 * <table>{children}</table>
 * ```
 */
export function TableRenderer({ children }: TableRendererProps): ReactElement {
  return <table>{children}</table>;
}

export interface TheadRendererProps extends marked.Tokens.Table {
  children: ReactNode;
}

/**
 * The default implementation for rendering a `<thead>` element which defaults
 * to:
 *
 * ```tsx
 * <thead>{children}</thead>
 * ```
 */
export function TheadRenderer({ children }: TheadRendererProps): ReactElement {
  return <thead>{children}</thead>;
}

export interface TbodyRendererProps extends marked.Tokens.Table {
  children: ReactNode;
}

/**
 * The default implementation for rendering a `<tbody>` element which defaults
 * to:
 *
 * ```tsx
 * <tbody>{children}</tbody>
 * ```
 */
export function TbodyRenderer({ children }: TbodyRendererProps): ReactElement {
  return <tbody>{children}</tbody>;
}

export interface TrRendererProps extends marked.Tokens.Table {
  children: ReactNode;
}

/**
 * The default implementation for rendering a `<tr>` element which defaults to:
 *
 * ```tsx
 * <tr>{children}</tr>
 * ```
 */
export function TrRenderer({ children }: TrRendererProps): ReactElement {
  return <tr>{children}</tr>;
}

export interface ThRendererProps {
  align: "left" | "center" | "right" | undefined;
  cell: marked.Tokens.TableCell;
  table: marked.Tokens.Table;
  children: ReactNode;
}

/**
 * The default implementation for rendering a {@link Tokens.TableCell} that was
 * in the {@link Tokens.Table.header} list by:
 *
 * ```tsx
 * <th align={align}>{children}</th>
 * ```
 */
export function ThRenderer({ align, children }: ThRendererProps): ReactElement {
  return <th align={align}>{children}</th>;
}

export type TdRendererProps = ThRendererProps;

/**
 * The default implementation for rendering a {@link Tokens.TableCell} that was
 * in the {@link Tokens.Table.rows} list by:
 *
 * ```tsx
 * <td align={align}>{children}</td>
 * ```
 */
export function TdRenderer({ align, children }: TdRendererProps): ReactElement {
  return <td align={align}>{children}</td>;
}

/**
 * These renderers are used to render all the parts of a table that are
 * available via markdown.
 */
export interface TableRenderers {
  /** @see {@link TableRenderer} for default implementation */
  table: ComponentType<TableRendererProps>;
  /** @see {@link TheadRenderer} for default implementation */
  thead: ComponentType<TheadRendererProps>;
  /** @see {@link TbodyRenderer} for default implementation */
  tbody: ComponentType<TbodyRendererProps>;
  /** @see {@link TrRenderer} for default implementation */
  tr: ComponentType<TrRendererProps>;
  /** @see {@link ThRenderer} for default implementation */
  th: ComponentType<ThRendererProps>;
  /** @see {@link TdRenderer} for default implementation */
  td: ComponentType<TdRendererProps>;
}

export const TABLE_RENDERERS: TableRenderers = {
  table: TableRenderer,
  thead: TheadRenderer,
  tbody: TbodyRenderer,
  tr: TrRenderer,
  th: ThRenderer,
  td: TdRenderer,
};
