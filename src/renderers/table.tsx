import type { ReactElement } from "react";

import type {
  TableRendererProps,
  TbodyRendererProps,
  TdRendererProps,
  TheadRendererProps,
  ThRendererProps,
  TrRendererProps,
} from "../types";

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
