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
 * Recursively renders any tokens with the renderers provided.
 */
export function RenderTokens({
  tokens,
  renderers,
}: Readonly<RenderTokensProps>): ReactElement {
  return (
    <>
      {tokens?.map((token, i) => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <RenderToken key={i} token={token} renderers={renderers} />
      ))}
    </>
  );
}

/**
 * This just removes the `Token.Generic` from the types since it causes a lot of type issues
 */
function assertNonGeneric(token: Token): asserts token is MarkedToken {
  // do nothing
}

export interface RenderTokenProps {
  token: Token;
  renderers: Readonly<MarkdownRenderersWithTokens>;
}

export function RenderToken({
  token,
  renderers,
}: Readonly<RenderTokenProps>): ReactElement {
  assertNonGeneric(token);

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
  let children: ReactNode;
  if ("tokens" in token) {
    children = <RenderTokens tokens={token.tokens} renderers={renderers} />;
  }

  switch (token.type) {
    case "space":
      return <RenderSpace {...token} renderers={renderers} />;
    case "br":
      return <RenderBr {...token} renderers={renderers} />;
    case "hr":
      return <RenderHr {...token} renderers={renderers} />;
    case "em":
      return (
        <RenderEm {...token} renderers={renderers}>
          {children}
        </RenderEm>
      );
    case "del":
      return (
        <RenderDel {...token} renderers={renderers}>
          {children}
        </RenderDel>
      );
    case "text":
      return (
        <RenderText {...token} renderers={renderers}>
          {children}
        </RenderText>
      );
    case "strong":
      return (
        <RenderStrong {...token} renderers={renderers}>
          {children}
        </RenderStrong>
      );
    case "code":
      return (
        <RenderCode {...token} renderers={renderers}>
          {token.text}
        </RenderCode>
      );
    case "codespan":
      return (
        <RenderCodeSpan {...token} renderers={renderers}>
          {token.raw.substring(1, token.raw.length - 1)}
        </RenderCodeSpan>
      );
    case "heading": {
      return (
        <RenderHeading
          {...token}
          depth={getHeadingDepth(token.depth)}
          renderers={renderers}
        >
          {children}
        </RenderHeading>
      );
    }
    case "table": {
      return <RenderEntireTable token={token} renderers={renderers} />;
    }
    case "blockquote":
      return (
        <RenderBlockquote {...token} renderers={renderers}>
          {children}
        </RenderBlockquote>
      );
    case "list":
      return <RenderEntireList token={token} renderers={renderers} />;
    case "list_item":
      throw new Error("unreachable");
    case "paragraph":
      return (
        <RenderParagraph {...token} renderers={renderers}>
          {children}
        </RenderParagraph>
      );
    case "html":
      if ("pre" in token) {
        return <RenderHtml {...token} renderers={renderers} />;
      }

      return <RenderTag {...token} renderers={renderers} />;
    case "def":
      return <RenderDef {...token} renderers={renderers} />;
    case "escape":
      return <RenderEscape {...token} renderers={renderers} />;
    case "image":
      return <RenderImage {...token} renderers={renderers} />;
    case "link":
      return (
        <RenderLink {...token} renderers={renderers}>
          {children}
        </RenderLink>
      );
    default:
      return (
        <RenderGeneric {...(token as Tokens.Generic)} renderers={renderers} />
      );
  }
}
