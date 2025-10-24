// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import { type RenderHeadingProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.Heading} that will
 * render one of the following based on the `depth`:
 *
 * - `<h1>{children}</h1>`
 * - `<h2>{children}</h2>`
 * - `<h3>{children}</h3>`
 * - `<h4>{children}</h4>`
 * - `<h5>{children}</h5>`
 * - `<h6>{children}</h6>`
 */
export function RenderHeading({
  depth,
  children,
}: Readonly<RenderHeadingProps>): ReactElement {
  const Component = `h${depth}` as const;
  return <Component>{children}</Component>;
}
