import type {
  MarkedToken,
  Token,
  TokenizerAndRendererExtension,
  Tokens,
} from "marked";
import type { ReactNode } from "react";

import { defaultParseHtmlProps } from "./parseHtmlProps.js";
import type {
  DefinedMarkdownRenderers,
  ReactElementExtensionOptions,
} from "./types.js";

/**
```ts
const OPENING_BLOCK_REGEX = new RegExp(String.raw`
  ^\s*<                  # start with an opening bracket and any whitespace beforehand.
                         # the whitespace is added to trim the spaces between html blocks

  (\w+)                  # capture the tag name              (group 1)
  ([^>]*?)               # capture attributes                (group 2). so this is all characters until `>`
  (\s*\/?)               # capture optional self closing tag (group 3)
  >                      # end of opening tag or self closing
`.replace(/\s+#.*$/gm, '').replace(/\s+/g, ''), "i");
```
 *
 * Groups: 1=tagName, 2=attributes, 3=selfClosing
 */
const OPENING_BLOCK_REGEX = /^\s*<(\w+)([^>]*?)(\s*\/?)>/i;

/**
```ts
const INLINE_HTML_REGEX = new RegExp(String.raw`
  ^<                     # start with an opening bracket
  (\w+)                  # capture the tag name              (group 1)
  ([^\n>]*?)             # capture attributes                (group 2). so this is all characters until `>`
  (\s*\/?)               # capture optional self closing tag (group 3)
  >                      # end of opening tag or self closing
  (?:                    # non-capturing group for children until the closing tag
    ((?:[^]*?)?)         # capture the children              (group 4)
    <\/\1>               # closing tag matching `group 1`
  )?                     # mark this group as optional for self closing tags
`.replace(/\s+#.*$/gm, '').replace(/\s+/g, ''), "i");
```
 * Groups: 1=tagName, 2=attributes, 3=selfClosing, 4=children
 */
const INLINE_HTML_REGEX = /^<(\w+)([^>\n]*?)(\s*\/?)>(?:([^]*?)<\/\1>)?/i;

const TEXT_LIKE_NODES = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "summary",
]);

type Extension = TokenizerAndRendererExtension<ReactNode, ReactNode>;

/**
 * @internal
 */
export function createReactElementExtensions({
  renderers,
  parseHtmlProps = defaultParseHtmlProps,
}: ReactElementExtensionOptions & DefinedMarkdownRenderers): [
  blockReactElement: Extension,
  inlineReactElement: Extension,
] {
  const { react: RenderReact } = renderers;

  return [
    {
      name: "blockReactElement",
      level: "block",
      tokenizer(src): Tokens.ReactElementToken | undefined {
        // start by attempting finding the opening match
        const openingBlockMatch = src.match(OPENING_BLOCK_REGEX);
        if (!openingBlockMatch) {
          return;
        }

        const [openTag, tagName = "", rawProps = "", selfClosing] =
          openingBlockMatch;

        // when it's self closing, there isn't really anything else to do and
        // can be created as a token
        if (selfClosing === "/") {
          return {
            raw: openTag + "\n",
            type: "blockReactElement",
            tagName,
            rawProps,
            rawChildren: "",
            props: parseHtmlProps(rawProps),
            tokens: [],
            isSelfClosing: true,
          };
        }

        // if it's not self closing, we need to find the closing tag which must
        // be at the same depth since it's possible to nest the same
        // tag/component
        const closeTagRegexp = new RegExp(`<(\\/?)${tagName}\\b[^>]*>`, "gi");
        const closeTag = `</${tagName}>`;
        const remainingSrc = src.substring(openTag.length);

        let depth = 1;
        let match: RegExpMatchArray | null;
        let endIndex = -1;
        while ((match = closeTagRegexp.exec(remainingSrc)) !== null) {
          const [nextTag, closingSlash] = match;
          if (closingSlash === "/") {
            depth--;
            if (depth === 0) {
              endIndex = openTag.length + (match.index ?? 0) + nextTag.length;
            }
          } else {
            depth++;
          }
        }

        if (endIndex === -1) {
          return;
        }

        const nextNewlineIndex =
          src.slice(endIndex).match(/^(\n)/)?.[0].length ?? 0;
        const raw = src.slice(0, endIndex + nextNewlineIndex);
        const rawChildren = src.slice(
          openTag.length,
          endIndex - closeTag.length
        );

        // now traverse children for tokens
        const blockTokens: Token[] = [];
        this.lexer.blockTokens(rawChildren.trim(), blockTokens);

        let tokens = blockTokens;
        const lowerTagName = tagName.toLowerCase();
        if (TEXT_LIKE_NODES.has(lowerTagName)) {
          // marked normally flags text nodes as paragraphs, but that normally
          // isn't required for html.
          tokens = [];
          for (let i = 0; i < blockTokens.length; i++) {
            const token = blockTokens[i] as MarkedToken;
            if (token.type === "paragraph") {
              const childTokens = [...token.tokens];
              this.lexer.inlineTokens(token.raw, childTokens);

              tokens.push(...childTokens);
            } else {
              tokens.push(token);
            }
          }
        }

        return {
          raw,
          type: "blockReactElement",
          tagName,
          rawProps,
          rawChildren,
          props: parseHtmlProps(rawProps),
          tokens,
          isSelfClosing: false,
        };
      },
      renderer(genericToken) {
        if (genericToken.type !== "blockReactElement") {
          return false;
        }

        const token = genericToken as Tokens.ReactElementToken;
        return (
          <RenderReact {...token} parser={this.parser} renderers={renderers}>
            {this.parser.parse(token.tokens)}
          </RenderReact>
        );
      },
    },
    {
      name: "inlineReactElement",
      level: "inline",
      tokenizer(src): Tokens.ReactElementToken | undefined {
        const match = src.match(INLINE_HTML_REGEX);
        if (!match) {
          return;
        }

        const [
          raw,
          tagName = "",
          rawProps = "",
          selfClosing,
          rawChildren = "",
        ] = match;
        const isSelfClosing = selfClosing === "/";
        const children = isSelfClosing ? "" : rawChildren.trim();

        return {
          type: "inlineReactElement",
          raw,
          tagName,
          rawChildren: children,
          rawProps,
          props: parseHtmlProps(rawProps),
          tokens: isSelfClosing ? [] : this.lexer.inline(children),
          isSelfClosing,
        };
      },
      renderer(genericToken) {
        if (genericToken.type !== "inlineReactElement") {
          return false;
        }

        const token = genericToken as Tokens.ReactElementToken;
        return (
          <RenderReact {...token} parser={this.parser} renderers={renderers}>
            {this.parser.parseInline(token.tokens)}
          </RenderReact>
        );
      },
    },
  ];
}
