import { link } from "@react-md/core/link/styles";
import { Typography } from "@react-md/core/typography/Typography";
import Link from "next/link";
import { type OverridableMarkdownRenderers } from "react-marked-renderer";

import styles from "./text.module.scss";

export const TEXT_RENDERERS = {
  link: function RenderLink({ href, title, children }) {
    return (
      <Link href={href} title={title || undefined} className={link()}>
        {children}
      </Link>
    );
  },
  heading: function RenderHeading({ depth, children }) {
    const type = `headline-${depth}` as "headline-1";
    return <Typography type={type}>{children}</Typography>;
  },
  paragraph: function RenderParagraph({ children }) {
    return <Typography>{children}</Typography>;
  },
  blockquote: function RenderBlockquote({ children }) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  },

  // em: function RenderEm() {},
  // del: function RenderDel() {},
  // strong: function RenderStrong() {},
} satisfies OverridableMarkdownRenderers;
