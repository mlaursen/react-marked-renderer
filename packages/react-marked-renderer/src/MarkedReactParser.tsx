import type {
  MarkedToken,
  Parser,
  Renderer,
  TextRenderer,
  Token,
  Tokens,
} from "marked";
import { Fragment, type ReactNode } from "react";

import { textRenderer } from "./textRenderer.js";
import type {
  ReactMarkedOptions,
  ReactMarkedParser,
  ReactMarkedRenderer,
} from "./types.js";

const CUSTOM_BLOCK_TOKEN_TYPES = new Set([
  "blockquote",
  "code",
  "heading",
  "hr",
  "html",
  "list",
  "paragraph",
  "space",
  "table",
  "text",
]);

const CUSTOM_INLINE_TOKEN_TYPES = new Set([
  "br",
  "codespan",
  "del",
  "em",
  "escape",
  "html",
  "image",
  "link",
  "strong",
  "text",
]);

export class MarkedReactParser implements ReactMarkedParser {
  renderer: ReactMarkedRenderer;
  textRenderer: TextRenderer<ReactNode>;

  constructor(public readonly options: ReactMarkedOptions = {}) {
    if (!options.renderer) {
      throw new Error("MarkedReactParser is missing a renderer");
    }

    this.renderer = options.renderer;
    this.renderer.parser ??= this;
    this.textRenderer = textRenderer;
  }

  static parse(tokens: Token[], options?: ReactMarkedOptions): ReactNode {
    return new MarkedReactParser(options).parse(tokens);
  }

  static parseInline(tokens: Token[], options?: ReactMarkedOptions): ReactNode {
    return new MarkedReactParser(options).parseInline(tokens);
  }

  #append(children: ReactNode[], child?: ReactNode): void {
    const childType = typeof child;
    if (childType === "boolean" || (!child && childType !== "number")) {
      return;
    }

    if (childType === "object" || childType === "function") {
      children.push(<Fragment key={children.length}>{child}</Fragment>);
    } else {
      children.push(child);
    }
  }

  #checkCustomRenderer(
    token: Tokens.Generic,
    children: ReactNode[],
    inline: boolean
  ): boolean {
    const customRenderer = this.options?.extensions?.renderers?.[token.type];
    if (!customRenderer) {
      return false;
    }

    const continueTokens = inline
      ? CUSTOM_INLINE_TOKEN_TYPES
      : CUSTOM_BLOCK_TOKEN_TYPES;

    const response = customRenderer.call({ parser: this }, token);
    if (response !== false || !continueTokens.has(token.type)) {
      this.#append(children, response);
      return true;
    }

    return false;
  }

  parse(tokens: Token[], top?: boolean): ReactNode {
    const children: ReactNode[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const genericToken = tokens[i];
      if (!genericToken) {
        continue;
      }

      if (this.#checkCustomRenderer(genericToken, children, false)) {
        continue;
      }

      // remove the generic token type since it messes up types. it is caught
      // later
      const token = genericToken as MarkedToken;
      switch (token.type) {
        case "blockquote":
          this.#append(children, this.renderer.blockquote(token));
          break;
        case "br":
          this.#append(children, this.renderer.br(token));
          break;
        case "code":
          this.#append(children, this.renderer.code(token));
          break;
        case "codespan":
          this.#append(children, this.renderer.codespan(token));
          break;
        case "def":
          this.#append(children, this.renderer.def(token));
          break;
        case "del":
          this.#append(children, this.renderer.del(token));
          break;
        case "em":
          this.#append(children, this.renderer.em(token));
          break;
        case "escape":
          this.#append(children, this.renderer.text(token));
          break;
        case "heading":
          this.#append(children, this.renderer.heading(token));
          break;
        case "html":
          this.#append(children, this.renderer.html(token));
          break;
        case "hr":
          this.#append(children, this.renderer.hr(token));
          break;
        case "image":
          this.#append(children, this.renderer.image(token));
          break;
        case "link":
          this.#append(children, this.renderer.link(token));
          break;
        case "list":
          this.#append(children, this.renderer.list(token));
          break;
        case "list_item":
          this.#append(children, this.renderer.listitem(token));
          break;
        case "paragraph":
          this.#append(children, this.renderer.paragraph(token));
          break;
        case "strong":
          this.#append(children, this.renderer.strong(token));
          break;
        case "space":
          this.#append(children, this.renderer.space(token));
          break;
        case "table":
          this.#append(children, this.renderer.table(token));
          break;
        case "text": {
          const textTokens: Tokens.Text[] = [token];
          while (
            i + 1 < textTokens.length &&
            textTokens[i + 1]?.type === "text"
          ) {
            const nextToken = textTokens[++i] as Tokens.Text;
            textTokens.push(nextToken);
          }

          if (top) {
            this.#append(
              children,
              this.renderer.paragraph({
                type: "paragraph",
                raw: token.raw,
                text: token.text,
                tokens: textTokens,
              })
            );
          } else {
            textTokens.forEach((textToken) => {
              this.#append(children, this.renderer.text(textToken));
            });
          }
          break;
        }
        default:
          throw new Error(`Unknown block level token: "${genericToken.type}"`);
      }
    }

    return children;
  }

  parseInline(
    tokens: Token[],
    renderer: Renderer<ReactNode, ReactNode> | TextRenderer<ReactNode> = this
      .renderer
  ): ReactNode {
    const children: ReactNode[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const genericToken = tokens[i];
      if (!genericToken) {
        continue;
      }

      if (this.#checkCustomRenderer(genericToken, children, true)) {
        continue;
      }

      // remove the generic token type since it messes up types. it is caught
      // later
      const token = genericToken as MarkedToken;
      switch (token.type) {
        case "br":
          this.#append(children, renderer.br(token));
          break;
        case "codespan":
          this.#append(children, renderer.codespan(token));
          break;
        case "del":
          this.#append(children, renderer.del(token));
          break;
        case "em":
          this.#append(children, renderer.em(token));
          break;
        case "escape":
          this.#append(children, renderer.text(token));
          break;
        case "html":
          this.#append(children, renderer.html(token));
          break;
        case "image":
          this.#append(children, renderer.image(token));
          break;
        case "link":
          this.#append(children, renderer.link(token));
          break;
        case "strong":
          this.#append(children, renderer.strong(token));
          break;
        case "text":
          this.#append(children, renderer.text(token));
          break;
        default:
          throw new Error(`Unknown inline level token: "${genericToken.type}"`);
      }
    }
    return children;
  }
}
