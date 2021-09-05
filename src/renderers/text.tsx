import type { ReactElement } from "react";

import { useSluggedId } from "../context";
import type {
  BlockquoteRendererProps,
  DelRendererProps,
  EmRendererProps,
  HeadingRendererProps,
  LinkRendererProps,
  ParagraphRendererProps,
  StrongRendererProps,
  TextRendererProps,
} from "../types";

/**
 * The default implementation for rendering the {@link Tokens.Text} by
 * rendering:
 *
 * ```tsx
 * <>{children || raw}</>
 * ```
 *
 * @remarks This defaults to using `raw` instead of the sanitized `text` because
 * React already handles the sanitization. If the `text` is used, the generated
 * text would display html entities instead of the correct string.
 */
export function TextRenderer({
  raw,
  children,
}: TextRendererProps): ReactElement {
  return <>{children || raw}</>;
}

/**
 * The default implementation for rendering the {@link Tokens.Em} by rendering:
 *
 * ```tsx
 * <em>{children}</em>
 * ```
 */
export function EmRenderer({ children }: EmRendererProps): ReactElement {
  return <em>{children}</em>;
}

/**
 * The default implementation for rendering the {@link Tokens.Del} by rendering:
 *
 * ```tsx
 * <del>{children}</del>
 * ```
 */
export function DelRenderer({ children }: DelRendererProps): ReactElement {
  return <del>{children}</del>;
}

/**
 * The default implementation for rendering the {@link Tokens.Strong} by
 * rendering:
 *
 * ```tsx
 * <strong>{children}</strong>
 * ```
 */
export function StrongRenderer({
  children,
}: StrongRendererProps): ReactElement {
  return <strong>{children}</strong>;
}

/**
 * The default implementation for rendering the {@link Tokens.Heading} that will
 * render one of the following based on the `depth`:
 *
 * - `<h1 id={sluggedId}>{children}</h1>`
 * - `<h2 id={sluggedId}>{children}</h2>`
 * - `<h3 id={sluggedId}>{children}</h3>`
 * - `<h4 id={sluggedId}>{children}</h4>`
 * - `<h5 id={sluggedId}>{children}</h5>`
 * - `<h6 id={sluggedId}>{children}</h6>`
 *
 * @see {@link useSluggedId}
 */
export function HeadingRenderer({
  depth,
  tokens,
  children,
}: HeadingRendererProps): ReactElement {
  const id = useSluggedId(tokens);
  const Component = `h${depth}` as const;
  return <Component id={id}>{children}</Component>;
}

/**
 * The default implementation for rendering the {@link Tokens.Paragraph} by
 * rendering:
 *
 * ```tsx
 * <p>{children}</p>
 * ```
 */
export function ParagraphRenderer({
  children,
}: ParagraphRendererProps): ReactElement {
  return <p>{children}</p>;
}

/**
 * The default implementation for rendering the {@link Tokens.Blockquote} by
 * rendering:
 *
 * ```tsx
 * <blockquote>{children}</blockquote>
 * ```
 */
export function BlockquoteRenderer({
  children,
}: BlockquoteRendererProps): ReactElement {
  return <blockquote>{children}</blockquote>;
}

/**
 * The default implementation for rendering the {@link Tokens.Link} by
 * rendering:
 *
 * ```tsx
 * <a href={href}>{children}</href>
 * ```
 */
export function LinkRenderer({
  href,
  title,
  children,
}: LinkRendererProps): ReactElement {
  return (
    <a href={href} title={title}>
      {children}
    </a>
  );
}
