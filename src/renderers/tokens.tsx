import type { Token } from "marked";
import type { ReactElement } from "react";

import { useMarkdownConfig } from "./code";
import { useMarkdownRenderers } from "./useMarkdownRenderers";

export interface TokensRendererProps {
  tokens: readonly Token[];
}

/**
 * This component is used to render a list of tokens in a `React.Fragment`.
 */
export function TokensRenderer({ tokens }: TokensRendererProps): ReactElement {
  return (
    <>
      {tokens.map((token, i) => (
        <TokenRenderer key={i} token={token} />
      ))}
    </>
  );
}

/** @internal */
function getDepth(depth: number): 1 | 2 | 3 | 4 | 5 | 6 {
  switch (depth) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return depth;
    default:
      /* istanbul ignore next */
      return 6;
  }
}

export interface TokenRendererProps {
  token: Token;
}

/**
 * This component is mostly an internal component that renders each parsed
 * token from `marked`.
 */
export function TokenRenderer({
  token,
}: TokenRendererProps): ReactElement | null {
  const {
    space: Space,
    escape: Escape,
    em: Em,
    br: Br,
    hr: Hr,
    del: Del,
    text: Text,
    strong: Strong,
    codeblock: Code,
    codespan: Codespan,
    heading: Heading,
    paragraph: Paragraph,
    blockquote: Blockquote,
    img: Image,
    link: Link,
    list: List,
    listitem: ListItem,
    task: Task,
    tag: Tag,
    html: Html,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
  } = useMarkdownRenderers();
  const { getLanguage } = useMarkdownConfig();
  switch (token.type) {
    case "space":
      return <Space {...token} />;
    case "br":
      return <Br {...token} />;
    case "hr":
      return <Hr {...token} />;
    case "em":
      return (
        <Em {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Em>
      );
    case "del":
      return (
        <Del {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Del>
      );
    case "text":
      /* istanbul ignore next */
      if ("inLink" in token) {
        return <Tag {...token}>{token.text}</Tag>;
      }

      return (
        <Text {...token}>
          {token.tokens && <TokensRenderer tokens={token.tokens} />}
        </Text>
      );
    case "strong":
      return (
        <Strong {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Strong>
      );
    case "code":
      return (
        <Code {...token} lang={getLanguage(token.lang ?? "", token.raw)}>
          {token.text}
        </Code>
      );
    case "codespan":
      return (
        <Codespan {...token}>
          {token.raw.substring(1, token.raw.length - 1)}
        </Codespan>
      );
    case "heading": {
      const { depth, ...props } = token;
      return (
        <Heading {...props} depth={getDepth(depth)}>
          <TokensRenderer tokens={token.tokens} />
        </Heading>
      );
    }
    case "paragraph":
      return (
        <Paragraph {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Paragraph>
      );
    case "blockquote":
      return (
        <Blockquote {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Blockquote>
      );
    case "image":
      return <Image {...token} />;
    case "link":
      return (
        <Link {...token}>
          <TokensRenderer tokens={token.tokens} />
        </Link>
      );
    case "list": {
      const { items } = token;
      return (
        <List {...token}>
          {items.map(({ task, checked, ...token }, i) => {
            const children = <TokensRenderer tokens={token.tokens} />;
            if (task) {
              return (
                <Task key={i} defaultChecked={checked} {...token}>
                  {children}
                </Task>
              );
            }

            return (
              <ListItem key={i} {...token}>
                {children}
              </ListItem>
            );
          })}
        </List>
      );
    }
    /* istanbul ignore next */
    case "list_item":
      return (
        <ListItem {...token}>
          <TokensRenderer tokens={token.tokens} />
        </ListItem>
      );
    case "html": {
      /* istanbul ignore next */
      if ("inLink" in token) {
        return <Tag {...token}>{token.text}</Tag>;
      }

      return <Html {...token}>{token.text}</Html>;
    }
    case "table": {
      const { align, header, rows } = token;
      return (
        <Table {...token}>
          {header.length && (
            <Thead {...token}>
              <Tr {...token}>
                {header.map((cell, i) => (
                  <Th
                    key={i}
                    align={align[i] || undefined}
                    table={token}
                    cell={cell}
                  >
                    <TokensRenderer tokens={cell.tokens} />
                  </Th>
                ))}
              </Tr>
            </Thead>
          )}
          {rows.length && (
            <Tbody {...token}>
              {rows.map((cells, i) => (
                <Tr key={i} {...token}>
                  {cells.map((cell, j) => (
                    <Td
                      key={j}
                      align={align[j] || undefined}
                      table={token}
                      cell={cell}
                    >
                      <TokensRenderer tokens={cell.tokens} />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      );
    }
    case "escape":
      return <Escape {...token} />;
    /* istanbul ignore next */
    default:
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`${token.type} does not have a renderer`);
      }

      return null;
  }
}
