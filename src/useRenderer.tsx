// NOTE: The components in this file are here because of one or more of the
// following:
// - rely on the useRenderers hook which causes circular import errors
// - recursively call other renderers

import type { Token } from "marked";
import { createContext, ReactElement, useContext } from "react";

import {
  BlockquoteRenderer,
  BrRenderer,
  CodeBlockRenderer,
  CodeSpanRenderer,
  DelRenderer,
  EmRenderer,
  HeadingRenderer,
  HrRenderer,
  HtmlRenderer,
  ImageRenderer,
  LinkRenderer,
  ListItemRenderer,
  ListRenderer,
  ParagraphRenderer,
  SpaceRenderer,
  StrongRenderer,
  TableRenderer,
  TagRenderer,
  TbodyRenderer,
  TdRenderer,
  TextRenderer,
  TheadRenderer,
  ThRenderer,
  TrRenderer,
} from "./renderers";
import type { Renderers, TaskRendererProps } from "./types";
import { getTokensText, useSluggedId } from "./useSlugger";

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
      return 6;
  }
}

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

export interface TokenRendererProps {
  token: Token;
}

/**
 * This component is mostly an internal component that renders each parsed
 * token from {@link marked}.
 */
export function TokenRenderer({
  token,
}: TokenRendererProps): ReactElement | null {
  const {
    space: Space,
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
  } = useRenderers();
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
      return <Code {...token}>{token.text}</Code>;
    case "codespan":
      return <Codespan {...token}>{token.text}</Codespan>;
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
    case "list_item":
      return (
        <ListItem {...token}>
          <TokensRenderer tokens={token.tokens} />
        </ListItem>
      );
    case "html": {
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
    default:
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`${token.type} does not have a renderer`);
      }

      return null;
  }
}

/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * ```tsx
 * const id = useSluggedId(`${getTokensText(props.tokens)}-task`);
 * const { listitem: ListItem } = useRenderers();
 *
 * <ListItem {...props}>
 *   <input id={id} type="checkbox" defaultChecked={defaultChecked} />
 *   <label htmlFor={id}>{children}</label>
 * </ListItem>
 * ```
 *
 * @remarks You'll most likely need to implement a custom renderer for this
 * since the default styles aren't very pretty.
 */
export function TaskRenderer({
  defaultChecked,
  children,
  ...props
}: TaskRendererProps): ReactElement {
  const id = useSluggedId(`${getTokensText(props.tokens)}-task`);
  const { listitem: ListItem } = useRenderers();

  return (
    <ListItem {...props}>
      <input id={id} type="checkbox" defaultChecked={defaultChecked} />
      <label htmlFor={id}>{children}</label>
    </ListItem>
  );
}

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

const context = createContext<Renderers>(DEFAULT_RENDERERS);

/** @internal */
export const { Provider: MarkdownRendererProvider } = context;
context.displayName = "MarkdownRenderer";

/**
 * This hooks is mostly an internal hook for creating some reasonable renderer
 * defaults for the {@link Renderers.list} and {@link Renderers.table}. It is
 * used to get the current implementation for all the renderers that were
 * provided to the {@link Markdown} component.
 *
 * @returns the current renderers
 */
export function useRenderers(): Renderers {
  return useContext(context);
}
