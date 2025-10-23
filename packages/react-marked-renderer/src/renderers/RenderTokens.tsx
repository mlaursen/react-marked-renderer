import { type MarkedToken, type Token, type Tokens } from "marked";
import { type ReactElement, type ReactNode } from "react";

import { type MarkdownRenderers } from "../types.js";

/**
 * This just removes the `Token.Generic` from the types since it causes a lot of type issues
 */
function assertNonGeneric(token: Token): asserts token is MarkedToken {
  // do nothing
}

export interface RenderTokensProps {
  tokens: readonly Token[] | undefined;
  renderers: Readonly<MarkdownRenderers>;
}

export function RenderTokens({
  tokens,
  renderers,
}: Readonly<RenderTokensProps>): ReactElement {
  const {
    br: RenderBr,
    hr: RenderHr,
    blockquote: RenderBlockquote,
    checkbox: RenderCheckbox,
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
    list: RenderList,
    list_item: RenderListItem,
    paragraph: RenderParagraph,
    space: RenderSpace,
    strong: RenderStrong,
    tag: RenderTag,
    text: RenderText,
    table: RenderTable,
    tbody: RenderTbody,
    thead: RenderThead,
    td: RenderTd,
    th: RenderTh,
    tr: RenderTr,
  } = renderers;
  return (
    <>
      {tokens?.map((token, i) => {
        assertNonGeneric(token);
        let children: ReactNode;
        if ("tokens" in token) {
          children = (
            <RenderTokens tokens={token.tokens} renderers={renderers} />
          );
        }

        switch (token.type) {
          case "space":
            return <RenderSpace key={i} {...token} />;
          case "br":
            return <RenderBr key={i} {...token} />;
          case "hr":
            return <RenderHr key={i} {...token} />;
          case "em":
            return (
              <RenderEm key={i} {...token}>
                {children}
              </RenderEm>
            );
          case "del":
            return (
              <RenderDel key={i} {...token}>
                {children}
              </RenderDel>
            );
          case "text":
            return (
              <RenderText key={i} {...token}>
                {children}
              </RenderText>
            );
          case "strong":
            return (
              <RenderStrong key={i} {...token}>
                {children}
              </RenderStrong>
            );
          case "code":
            return (
              <RenderCode key={i} {...token}>
                {token.text}
              </RenderCode>
            );
          case "codespan":
            return (
              <RenderCodeSpan key={i} {...token}>
                {token.raw.substring(1, token.raw.length - 1)}
              </RenderCodeSpan>
            );
          case "heading": {
            return (
              <RenderHeading key={i} {...token}>
                {children}
              </RenderHeading>
            );
          }
          case "table": {
            const { header, rows } = token;
            return (
              <RenderTable key={i} {...token}>
                {header.length > 0 && (
                  <RenderThead {...token} isHeader>
                    <RenderTr {...token} cells={header}>
                      {header.map((cell, i) => (
                        <RenderTh key={i} {...cell}>
                          <RenderTokens
                            tokens={cell.tokens}
                            renderers={renderers}
                          />
                        </RenderTh>
                      ))}
                    </RenderTr>
                  </RenderThead>
                )}
                {rows.length > 0 && (
                  <RenderTbody {...token} isHeader={false}>
                    {rows.map((cells, rowIndex) => (
                      <RenderTr key={rowIndex} {...token} cells={cells}>
                        {cells.map((cell, cellIndex) => (
                          <RenderTd key={cellIndex} {...cell}>
                            <RenderTokens
                              tokens={cell.tokens}
                              renderers={renderers}
                            />
                          </RenderTd>
                        ))}
                      </RenderTr>
                    ))}
                  </RenderTbody>
                )}
              </RenderTable>
            );
          }
          case "blockquote":
            return (
              <RenderBlockquote key={i} {...token}>
                {children}
              </RenderBlockquote>
            );
          case "list":
            return (
              <RenderList key={i} {...token}>
                {token.items.map((item, i) => {
                  const { task, text, loose, checked, tokens } = item;
                  return (
                    <RenderListItem key={i} {...item}>
                      <RenderTokens tokens={tokens} renderers={renderers} />
                    </RenderListItem>
                  );
                })}
              </RenderList>
            );
          case "list_item":
            return (
              <RenderListItem key={i} {...token}>
                Hello
              </RenderListItem>
            );
          case "paragraph":
            return (
              <RenderParagraph key={i} {...token}>
                {children}
              </RenderParagraph>
            );
          case "html":
            if ("pre" in token) {
              return <RenderHtml key={i} {...token} />;
            }

            return <RenderTag key={i} {...token} />;
          case "def":
            return <RenderDef key={i} {...token} />;
          case "escape":
            return <RenderEscape key={i} {...token} />;
          case "image":
            return <RenderImage key={i} {...token} />;
          case "link":
            return (
              <RenderLink key={i} {...token}>
                {children}
              </RenderLink>
            );
          default:
            return <RenderGeneric key={i} {...(token as Tokens.Generic)} />;
        }
      })}
    </>
  );
}
