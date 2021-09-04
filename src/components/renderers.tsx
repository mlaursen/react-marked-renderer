import { useCallback } from "react";
import { highlightElement, languages } from "prismjs";
import cn from "classnames";
import {
  Checkbox,
  Divider,
  Link as RMDLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Text,
} from "react-md";

import { Renderers } from "../types";
import { getTokensText, useSluggedId } from "../useSlugger";
import styles from "./renderers.module.scss";

const PRISM_LANGUAGES = Object.keys(languages).filter(
  (name) => name !== "insertBefore" && name !== "extend"
);
PRISM_LANGUAGES.push("none");

export const renderers: Partial<Renderers> = {
  hr: function Hr() {
    return <Divider />;
  },

  link: function Link({
    type: _type,
    raw: _raw,
    text: _text,
    tokens: _tokens,
    ...props
  }) {
    return <RMDLink {...props} />;
  },

  paragraph: function Paragraph({ children }) {
    return <Text>{children}</Text>;
  },

  heading: function Heading({ depth, tokens, children }) {
    type Headline =
      | "headline-1"
      | "headline-2"
      | "headline-3"
      | "headline-4"
      | "headline-5"
      | "headline-6"
      | "subtitle-1"
      | "subtitle-2";

    let type: Headline;
    switch (depth) {
      case 1:
        type = "headline-1";
        break;
      case 2:
        type = "headline-2";
        break;
      case 3:
        type = "headline-3";
        break;
      case 4:
        type = "headline-4";
        break;
      case 5:
        type = "headline-5";
        break;
      default:
        type = "headline-6";
    }

    const id = useSluggedId(tokens);
    return (
      <Text id={id} type={type}>
        {children}
      </Text>
    );
  },

  codeblock: function CodeBlock({ lang = "", text }) {
    let language = lang || "none";
    if (lang === "markdown") {
      language = "markdown";
    } else if (lang === "sh") {
      language = "shell";
    }
    const invalid = !PRISM_LANGUAGES.includes(language);

    let message: string | undefined;
    if (invalid) {
      message = `Valid languages are:
${PRISM_LANGUAGES.map((lang) => `- ${lang}`).join("\n")}
`;
    }

    return (
      <pre
        data-languages={message}
        key={`${text}${lang}`}
        className={cn(`language-${language}`, {
          [styles.invalid]: invalid,
        })}
      >
        <code
          ref={useCallback((instance: HTMLElement | null) => {
            if (!instance) {
              return;
            }

            highlightElement(instance);
          }, [])}
        >
          {text}
        </code>
      </pre>
    );
  },

  codespan: function CodeSpan({ children }) {
    return <code className="language-none">{children}</code>;
  },

  listitem: function ListItem({ children }) {
    return <Text component="li">{children}</Text>;
  },

  blockquote: function Blockquote({ children }) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  },

  task: function Task({ defaultChecked, tokens, children }) {
    const id = useSluggedId(`${getTokensText(tokens)}-task`);
    // add a key so the state updates correctly if someone modifies the markdown
    // checked state instead of clicking the checkbox. Only useful if the
    // preview is persistent while updating the markdown.
    return (
      <li key={`${defaultChecked}`} className={styles.task}>
        <Checkbox id={id} defaultChecked={defaultChecked} label={children} />
      </li>
    );
  },

  table: function TableRenderer({ children }) {
    return (
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
    );
  },
  tbody: function Tbody({ children }) {
    return <TableBody>{children}</TableBody>;
  },
  thead: function Thead({ children }) {
    return <TableHeader>{children}</TableHeader>;
  },
  tr: function Tr({ children }) {
    return <TableRow>{children}</TableRow>;
  },
  td: function Td({ children }) {
    return <TableCell>{children}</TableCell>;
  },
  th: function Th({ children }) {
    return <TableCell>{children}</TableCell>;
  },
};
