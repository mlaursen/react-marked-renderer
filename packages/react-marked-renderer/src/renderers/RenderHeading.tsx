// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderHeadingProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Heading} that will
 * render one of the following based on the `depth`:
 *
 * - `<h1 id={sluggedId}>{children}</h1>`
 * - `<h2 id={sluggedId}>{children}</h2>`
 * - `<h3 id={sluggedId}>{children}</h3>`
 * - `<h4 id={sluggedId}>{children}</h4>`
 * - `<h5 id={sluggedId}>{children}</h5>`
 * - `<h6 id={sluggedId}>{children}</h6>`
 */
export function RenderHeading({
  depth,
  tokens,
  children,
}: Readonly<RenderHeadingProps>): ReactElement {
  // const { headerIds } = useMarkdownConfig();
  // const id = useSluggedId(tokens);
  const d = Math.min(6, Math.max(1, depth)) as 1;
  const Component = `h${d}` as const;
  return <Component>{children}</Component>;
}
