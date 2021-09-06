import type { Tokens } from "marked";
import type { ComponentType, ReactElement, ReactNode } from "react";

import { useSluggedId } from "../useSluggedId";

export interface TextRendererProps extends Tokens.Text {
  children: ReactNode;
}

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

export interface EmRendererProps extends Tokens.Em {
  children: ReactNode;
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

export interface DelRendererProps extends Tokens.Del {
  children: ReactNode;
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

export interface StrongRendererProps extends Tokens.Strong {
  children: ReactNode;
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

export interface HeadingRendererProps extends Tokens.Heading {
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
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

export interface ParagraphRendererProps extends Tokens.Paragraph {
  children: ReactNode;
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

export interface BlockquoteRendererProps extends Tokens.Blockquote {
  children: ReactNode;
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

export interface LinkRendererProps extends Tokens.Link {
  children: ReactNode;
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

/**
 * These types of renderers normally render simple text, but can contain other
 * elements.
 */
export interface TextRenderers {
  /** @see {@link EmRenderer} for default implementation */
  em: ComponentType<EmRendererProps>;
  /** @see {@link DelRenderer} for default implementation */
  del: ComponentType<DelRendererProps>;
  /** @see {@link LinkRenderer} for default implementation */
  link: ComponentType<LinkRendererProps>;
  /** @see {@link TextRenderer} for default implementation */
  text: ComponentType<TextRendererProps>;
  /** @see {@link StrongRenderer} for default implementation */
  strong: ComponentType<StrongRendererProps>;
  /** @see {@link HeadingRenderer} for default implementation */
  heading: ComponentType<HeadingRendererProps>;
  /** @see {@link ParagraphRenderer} for default implementation */
  paragraph: ComponentType<ParagraphRendererProps>;
  /** @see {@link BlockquoteRenderer} for default implementation */
  blockquote: ComponentType<BlockquoteRendererProps>;
}

export const TEXT_RENDERERS: TextRenderers = {
  em: EmRenderer,
  del: DelRenderer,
  link: LinkRenderer,
  text: TextRenderer,
  strong: StrongRenderer,
  heading: HeadingRenderer,
  paragraph: ParagraphRenderer,
  blockquote: BlockquoteRenderer,
};
