import type { TokenizerAndRendererExtension, Tokens } from "marked";
import type { ReactNode } from "react";

import { defaultParseHtmlProps } from "./parseHtmlProps.js";
import type {
  DefinedMarkdownRenderers,
  ReactElementExtensionOptions,
} from "./types.js";

/**
```ts
const BLOCK_HTML_REGEX = new RegExp(String.raw`
  ^\s*<                  # start with an opening bracket and any whitespace beforehand.
                         # the whitespace is added to trim the spaces between html blocks

  (\w+)                  # capture the tag name              (group 1)
  ([^>]*?)               # capture attributes                (group 2). so this is all characters until `>`
  (\s*\/?)               # capture optional self closing tag (group 3)
  >                      # end of opening tag or self closing
  (?:                    # non-capturing group for children until the closing tag
    (\n?(?:[^]*?\n?)?)?  # capture the children              (group 4)
    <\/\1>               # closing tag matching `group 1`
  )?                     # mark this group as optional for self closing tags
  \n                   # trailing newline
`.replace(/\s+#.*$/gm, '').replace(/\s+/g, ''), "i");
```
 *
 * Groups: 1=tagName, 2=attributes, 3=selfClosing, 4=children
 */
const BLOCK_HTML_REGEX =
  /^\s*<(\w+)([^>]*?)(\s*\/?)>(?:(\n?(?:[^]*?\n?)?)?<\/\1>)?\n/i;

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
        const match = src.match(BLOCK_HTML_REGEX);
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
          raw,
          type: "blockReactElement",
          tagName,
          rawProps,
          rawChildren,
          props: parseHtmlProps(rawProps),
          tokens: isSelfClosing ? [] : this.lexer.inline(children),
          isSelfClosing,
        };
      },
      renderer(genericToken) {
        if (genericToken.type !== "blockReactElement") {
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
