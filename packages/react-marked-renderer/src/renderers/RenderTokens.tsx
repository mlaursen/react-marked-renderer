import { type MarkedToken, type Token, type Tokens } from "marked";
import { type ReactElement, type ReactNode } from "react";

import { getHeadingDepth } from "../getHeadingDepth.js";
import {
  type MarkdownRenderersWithTokens,
  type RenderTokensProps,
} from "../types.js";
import { RenderEntireList } from "./RenderEntireList.js";
import { RenderEntireTable } from "./RenderEntireTable.js";

/**
 * This just removes the `Token.Generic` from the types since it causes a lot of type issues
 */
function assertNonGeneric(token: Token): asserts token is MarkedToken {
  // do nothing
}

export function RenderTokens({
  tokens,
  renderers,
}: Readonly<RenderTokensProps>): ReactElement {
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
    generic: RenderGeneric,
    heading: RenderHeading,
    html: RenderHtml,
    image: RenderImage,
    link: RenderLink,
    paragraph: RenderParagraph,
    space: RenderSpace,
    strong: RenderStrong,
    tag: RenderTag,
    text: RenderText,
  } = renderers;
  const tokensRenderers: MarkdownRenderersWithTokens = {
    ...renderers,
    tokens: RenderTokens,
  };

  return (
    <>
      {tokens?.map((token, i) => {
        assertNonGeneric(token);
        let children: ReactNode;
        if ("tokens" in token) {
          children = (
            <RenderTokens tokens={token.tokens} renderers={tokensRenderers} />
          );
        }

        switch (token.type) {
          case "space":
            return (
              <RenderSpace key={i} {...token} renderers={tokensRenderers} />
            );
          case "br":
            return <RenderBr key={i} {...token} renderers={tokensRenderers} />;
          case "hr":
            return <RenderHr key={i} {...token} renderers={tokensRenderers} />;
          case "em":
            return (
              <RenderEm key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderEm>
            );
          case "del":
            return (
              <RenderDel key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderDel>
            );
          case "text":
            return (
              <RenderText key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderText>
            );
          case "strong":
            return (
              <RenderStrong key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderStrong>
            );
          case "code":
            return (
              <RenderCode key={i} {...token} renderers={tokensRenderers}>
                {token.text}
              </RenderCode>
            );
          case "codespan":
            return (
              <RenderCodeSpan key={i} {...token} renderers={tokensRenderers}>
                {token.raw.substring(1, token.raw.length - 1)}
              </RenderCodeSpan>
            );
          case "heading": {
            return (
              <RenderHeading
                key={i}
                {...token}
                depth={getHeadingDepth(token.depth)}
                renderers={tokensRenderers}
              >
                {children}
              </RenderHeading>
            );
          }
          case "table": {
            return (
              <RenderEntireTable
                key={i}
                token={token}
                renderers={tokensRenderers}
              />
            );
          }
          case "blockquote":
            return (
              <RenderBlockquote key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderBlockquote>
            );
          case "list":
            return (
              <RenderEntireList
                key={i}
                token={token}
                renderers={tokensRenderers}
              />
            );
          case "list_item":
            throw new Error("unreachable");
          case "paragraph":
            return (
              <RenderParagraph key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderParagraph>
            );
          case "html":
            if ("pre" in token) {
              return (
                <RenderHtml key={i} {...token} renderers={tokensRenderers} />
              );
            }

            return <RenderTag key={i} {...token} renderers={tokensRenderers} />;
          case "def":
            return <RenderDef key={i} {...token} renderers={tokensRenderers} />;
          case "escape":
            return (
              <RenderEscape key={i} {...token} renderers={tokensRenderers} />
            );
          case "image":
            return (
              <RenderImage key={i} {...token} renderers={tokensRenderers} />
            );
          case "link":
            return (
              <RenderLink key={i} {...token} renderers={tokensRenderers}>
                {children}
              </RenderLink>
            );
          default:
            return (
              <RenderGeneric
                key={i}
                {...(token as Tokens.Generic)}
                renderers={tokensRenderers}
              />
            );
        }
      })}
    </>
  );
}
