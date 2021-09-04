import type { Renderers } from "../types";
import { CodeBlockRenderer, CodeSpanRenderer } from "./code";
import { HtmlRenderer, TagRenderer } from "./html";
import { ListItemRenderer, ListRenderer, TaskRenderer } from "./list";
import { ImageRenderer } from "./media";
import { BrRenderer, HrRenderer, SpaceRenderer } from "./presentational";
import {
  TableRenderer,
  TbodyRenderer,
  TdRenderer,
  TheadRenderer,
  ThRenderer,
  TrRenderer,
} from "./table";
import {
  BlockquoteRenderer,
  DelRenderer,
  EmRenderer,
  HeadingRenderer,
  LinkRenderer,
  ParagraphRenderer,
  StrongRenderer,
  TextRenderer,
} from "./text";

/**
 * All of the default renderer implementations.
 */
export const DEFAULT_RENDERERS: Renderers = {
  // presentational
  br: BrRenderer,
  hr: HrRenderer,
  space: SpaceRenderer,

  // text-like
  em: EmRenderer,
  del: DelRenderer,
  link: LinkRenderer,
  text: TextRenderer,
  strong: StrongRenderer,
  heading: HeadingRenderer,
  paragraph: ParagraphRenderer,
  blockquote: BlockquoteRenderer,

  // code
  codeblock: CodeBlockRenderer,
  codespan: CodeSpanRenderer,

  // media-like
  img: ImageRenderer,

  // lists
  list: ListRenderer,
  listitem: ListItemRenderer,
  task: TaskRenderer,

  // tables
  table: TableRenderer,
  thead: TheadRenderer,
  tbody: TbodyRenderer,
  tr: TrRenderer,
  th: ThRenderer,
  td: TdRenderer,

  // others
  tag: TagRenderer,
  html: HtmlRenderer,
};
