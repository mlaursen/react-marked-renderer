import type { Parser, Tokens } from "marked";
import { type ReactNode } from "react";

import { getHeadingDepth } from "./getHeadingDepth.js";
import type {
  DefinedMarkdownRenderers,
  ReactMarkedOptions,
  ReactMarkedRenderer,
} from "./types.js";

/**
 * @internal
 */
export function createRenderer({
  renderers,
}: DefinedMarkdownRenderers): ReactMarkedRenderer {
  const {
    br: RenderBr,
    hr: RenderHr,
    blockquote: RenderBlockquote,
    code: RenderCode,
    codespan: RenderCodeSpan,
    del: RenderDel,
    def: RenderDef,
    em: RenderEm,
    escape: RenderEscape,
    heading: RenderHeading,
    html: RenderHtml,
    image: RenderImage,
    link: RenderLink,
    paragraph: RenderParagraph,
    space: RenderSpace,
    strong: RenderStrong,
    tag: RenderTag,
    text: RenderText,

    checkbox: RenderCheckbox,
    list: RenderList,
    listitem: RenderListItem,

    raw_table: RenderRawTable,
    tablerow: RenderTableRow,
    tablecell: RenderTableCell,
  } = renderers;

  return {
    // these get bound automatically by marked, but are required for the type definition
    options: null as unknown as ReactMarkedOptions,
    parser: null as unknown as Parser<ReactNode, ReactNode>,

    blockquote(token: Tokens.Blockquote): ReactNode {
      return (
        <RenderBlockquote {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parse(token.tokens)}
        </RenderBlockquote>
      );
    },
    br(token: Tokens.Br): ReactNode {
      return <RenderBr {...token} parser={this.parser} renderers={renderers} />;
    },
    code(token: Tokens.Code): ReactNode {
      return (
        <RenderCode {...token} parser={this.parser} renderers={renderers}>
          {token.text}
        </RenderCode>
      );
    },
    codespan(token: Tokens.Codespan): ReactNode {
      return (
        <RenderCodeSpan {...token} parser={this.parser} renderers={renderers}>
          {token.raw.substring(1, token.raw.length - 1)}
        </RenderCodeSpan>
      );
    },
    def(token: Tokens.Def): ReactNode {
      return (
        <RenderDef {...token} parser={this.parser} renderers={renderers} />
      );
    },
    del(token: Tokens.Del): ReactNode {
      return (
        <RenderDel {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderDel>
      );
    },
    em(token: Tokens.Em): ReactNode {
      return (
        <RenderEm {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderEm>
      );
    },
    heading(token: Tokens.Heading): ReactNode {
      return (
        <RenderHeading
          {...token}
          depth={getHeadingDepth(token.depth)}
          parser={this.parser}
          renderers={renderers}
        >
          {this.parser.parseInline(token.tokens)}
        </RenderHeading>
      );
    },
    hr(token: Tokens.Hr): ReactNode {
      return <RenderHr {...token} parser={this.parser} renderers={renderers} />;
    },
    html(token: Tokens.HTML | Tokens.Tag): ReactNode {
      if ("pre" in token) {
        return (
          <RenderHtml {...token} parser={this.parser} renderers={renderers} />
        );
      }

      return (
        <RenderTag {...token} parser={this.parser} renderers={renderers} />
      );
    },
    image(token: Tokens.Image): ReactNode {
      return (
        <RenderImage {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderImage>
      );
    },
    link(token: Tokens.Link): ReactNode {
      return (
        <RenderLink {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderLink>
      );
    },

    checkbox(token: Tokens.Checkbox): ReactNode {
      return (
        <RenderCheckbox {...token} parser={this.parser} renderers={renderers} />
      );
    },
    list(token: Tokens.List): ReactNode {
      return (
        <RenderList {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parse(token.items)}
        </RenderList>
      );
    },
    listitem(token: Tokens.ListItem): ReactNode {
      // NOTE: this does not really support loose lists with checkboxes
      // and will probably require a custom renderer
      //
      // - [  ] Item
      //
      //   Second Paragraph of item
      //
      // - Next Optional Item
      //

      // do not include the task here and instead rely on the custom list item
      // renderer
      // {token.task && this.checkbox({ checked: !!token.checked })}
      return (
        <RenderListItem {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parse(token.tokens, !!token.loose)}
        </RenderListItem>
      );
    },

    paragraph(token: Tokens.Paragraph): ReactNode {
      return (
        <RenderParagraph {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderParagraph>
      );
    },
    space(token: Tokens.Space): ReactNode {
      return (
        <RenderSpace {...token} parser={this.parser} renderers={renderers} />
      );
    },
    strong(token: Tokens.Strong): ReactNode {
      return (
        <RenderStrong {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderStrong>
      );
    },
    table(token: Tokens.Table): ReactNode {
      return (
        <RenderRawTable
          token={token}
          parser={this.parser}
          renderers={renderers}
        />
      );
    },
    tablecell(token: Tokens.TableCell): ReactNode {
      return (
        <RenderTableCell {...token} parser={this.parser} renderers={renderers}>
          {this.parser.parseInline(token.tokens)}
        </RenderTableCell>
      );
    },
    tablerow(token: Tokens.TableRow<ReactNode>): ReactNode {
      return (
        <RenderTableRow {...token} parser={this.parser} renderers={renderers}>
          {token.text}
        </RenderTableRow>
      );
    },
    text(token: Tokens.Text | Tokens.Escape): ReactNode {
      if (token.type === "escape") {
        return (
          <RenderEscape {...token} parser={this.parser} renderers={renderers} />
        );
      }

      return (
        <RenderText {...token} parser={this.parser} renderers={renderers}>
          {token.tokens ? this.parser.parseInline(token.tokens) : token.text}
        </RenderText>
      );
    },
  };
}
