import type { Tokens } from "marked";
import type { ComponentType, ReactNode } from "react";

interface ChildrenProvided {
  children: ReactNode;
}

export type SpaceRendererProps = Tokens.Space;
export type BrRendererProps = Tokens.Br;
export type HrRendererProps = Tokens.Hr;

/**
 * These types of renderers should never have `children` or are just whitespace.
 */
export interface PresentationRenderers {
  /** @see {@link BrRenderer} for default implementation */
  br: ComponentType<BrRendererProps>;
  /** @see {@link HrRenderer} for default implementation */
  hr: ComponentType<HrRendererProps>;
  /** @see {@link SpaceRenderer} for default implementation */
  space: ComponentType<SpaceRendererProps>;
}

export type CodeBlockRendererProps = Tokens.Code &
  ChildrenProvided & { lang: string };
export type CodeSpanRendererProps = Tokens.Codespan & ChildrenProvided;

/**
 * These types of renderers are used to render `<pre>` and `<code>` elements.
 */
export interface CodeRenderers {
  /** @see {@link CodeBlockRenderer} for default implementation */
  codeblock: ComponentType<CodeBlockRendererProps>;
  /** @see {@link CodeSpanRenderer} for default implementation */
  codespan: ComponentType<CodeSpanRendererProps>;
}

export type EmRendererProps = Tokens.Em & ChildrenProvided;
export type DelRendererProps = Tokens.Del & ChildrenProvided;
export type TextRendererProps = Tokens.Text & ChildrenProvided;
export type StrongRendererProps = Tokens.Strong & ChildrenProvided;
export type HeadingRendererProps = Tokens.Heading & {
  depth: 1 | 2 | 3 | 4 | 5 | 6;
} & ChildrenProvided;
export type ParagraphRendererProps = Tokens.Paragraph & ChildrenProvided;
export type BlockquoteRendererProps = Tokens.Blockquote & ChildrenProvided;
export type LinkRendererProps = Tokens.Link & ChildrenProvided;

/**
 * These types of renderers normally render simple text, but can contain other
 * elements.
 */
export interface TextLikeRenderers {
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

export type ImageRendererProps = Tokens.Image;

/**
 * These types of renderers are used for rendering media-like elements.
 */
export interface MediaLikeRenderers {
  /** @see {@link ImageRenderer} for default implementation */
  img: ComponentType<ImageRendererProps>;
}

export type ListRendererProps = Tokens.List & ChildrenProvided;
export type ListItemRendererProps = Omit<Tokens.ListItem, "checked" | "task"> &
  ChildrenProvided;
export type TaskRendererProps = ListItemRendererProps & {
  defaultChecked: boolean;
};

/**
 * These types of renderers are used for rendering lists.
 */
export interface ListRenderers {
  /** @see {@link ListRenderer} for default implementation */
  list: ComponentType<ListRendererProps>;
  /** @see {@link ListItemRenderer} for default implementation */
  listitem: ComponentType<ListItemRendererProps>;
  /** @see {@link TaskRenderer} for default implementation */
  task: ComponentType<TaskRendererProps>;
}

export type TableRendererProps = Tokens.Table & ChildrenProvided;
export type TheadRendererProps = Tokens.Table & ChildrenProvided;
export type TbodyRendererProps = Tokens.Table & ChildrenProvided;
export type TrRendererProps = Tokens.Table & ChildrenProvided;
export type ThRendererProps = ChildrenProvided & {
  align: "left" | "center" | "right" | undefined;
  cell: Tokens.TableCell;
  table: Tokens.Table;
};
export type TdRendererProps = ThRendererProps;

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

export type TagRendererProps = Tokens.Tag & ChildrenProvided;
export type HtmlRendererProps = Tokens.HTML & ChildrenProvided;

export interface HtmlLikeRenderers {
  /** @see {@link TagRenderer} for default implementation */
  tag: ComponentType<TagRendererProps>;
  /** @see {@link HtmlRenderer} for default implementation */
  html: ComponentType<HtmlRendererProps>;
}

/**
 * All of the available component renders.
 */
export interface Renderers
  extends PresentationRenderers,
    CodeRenderers,
    TextLikeRenderers,
    MediaLikeRenderers,
    ListRenderers,
    TableRenderers,
    HtmlLikeRenderers {}

/**
 * A function that should highlight all the code within an `HTMLElement`. This
 * should normally just be something like `Prism.highlightElement` or
 * `HighlightJS.highlightElement`.
 *
 * @param element - The `<code>` element that should be highlighted
 */
export type HighlightElement = (element: HTMLElement) => Promise<void> | void;

/**
 * This function is mostly used if you'd like to be able to have the code
 * highlighted via `dangerouslySetInnerHTML` so that the code can be highlighted
 * in node environments.
 *
 * @example
 * PrismJS Example
 * ```tsx
 * <Markdown highlightCode={Prism.highlightCode} markown={markdown} />
 * ```
 *
 * @param code - The raw code string to turn into an HTML string
 * @param language - The current code language or an empty string
 * @returns the html to dangerously set within a `<code>` tag
 */
export type DangerouslyHighlightCode = (
  code: string,
  language: string
) => string;

/**
 * A function that can be used to get the language for a block of code or
 * allow different aliases.
 *
 * @example
 * Simple Example
 * ```ts
 * const getLanguage: GetCodeLanguage = (raw, suggestedLanguage) => {
 *   switch (suggestedLanguage) {
 *     case "":
 *       // default to markup
 *       return "markup";
 *     case "sh":
 *       // allow sh to be an alias for shell
 *       return "shell";
 *     default:
 *       return suggestedLanguage;
 *   }
 * }
 * ```
 *
 * @defaultValue = `(lang) => lang`
 * @param lang - The language suggested by `marked`
 * @param rawCode - The raw code source
 * @returns The language to use
 */
export type GetCodeLanguage = (lang: string, rawCode: string) => string;

export interface HighlightCodeOptions {
  /** {@inheritDoc GetCodeLanguage} */
  getLanguage?: GetCodeLanguage;

  /** {@inheritDoc DangerouslyHighlightCode} */
  highlightCode?: DangerouslyHighlightCode;
  /** {@inheritDoc HighlightElement} */
  highlightElement?: HighlightElement;
}

/**
 * A re-export of the {@link MarkedOptions} that works with this package's API.
 */
export type ValidMarkedOptions = Omit<
  marked.MarkedOptions,
  "highlight" | "sanitize" | "sanitizer"
>;

export interface MarkdownConfig extends HighlightCodeOptions {
  /** {@inheritDoc ValidMarkedOptions} */
  options: ValidMarkedOptions;

  /** {@inheritDoc marked.Slugger} */
  slugger: marked.Slugger;

  /** {@inheritDoc Renderers} */
  renderers: Renderers;
}

/** @internal */
export interface MarkdownConfigContext extends MarkdownConfig {
  getLanguage: GetCodeLanguage;
}
