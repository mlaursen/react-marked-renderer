import type { Tokens } from "marked";
import { type ReactElement, useId } from "react";

import type { RenderTaskProps } from "../types.js";

/**
 * The default implementation for rendering the {@link Tokens.ListItem} when
 * the `task` prop is `true` by rendering:
 *
 * ```tsx
 * const id = useId();
 * const { checkbox: RenderCheckbox, paragraph: RenderParagraph } = renderers
 *
 *  const shared = { parser, renderers };
 *  const checkbox = <RenderCheckbox id={id} checked={checked} {...shared} />;
 *
 *  let firstParagraph: ReactElement | undefined;
 *  const firstToken = tokens[0];
 *  if (loose && firstToken?.type === "text") {
 *    firstParagraph = (
 *      <RenderParagraph {...firstToken} {...shared}>
 *        {checkbox}{" "}
 *        <label htmlFor={id}>{parser.parseInline(firstToken.tokens)}</label>
 *      </RenderParagraph>
 *    );
 *  }
 *
 *  return (
 *    <li>
 *      {!!firstParagraph && (
 *        <>
 *          {firstParagraph}
 *          {parser.parse(tokens.slice(1))}
 *        </>
 *      )}
 *      {!firstParagraph && (
 *        <>
 *          {checkbox} {loose ? children : <label htmlFor={id}>{children}</label>}
 *        </>
 *      )}
 *    </li>
 *  );
 * ```
 */
export function RenderTask({
  loose,
  tokens,
  parser,
  checked,
  children,
  renderers,
}: Readonly<RenderTaskProps>): ReactElement {
  const id = useId();
  const { checkbox: RenderCheckbox, paragraph: RenderParagraph } = renderers;
  const shared = { parser, renderers };
  const checkbox = <RenderCheckbox id={id} checked={checked} {...shared} />;

  let firstParagraph: ReactElement | undefined;
  const firstToken = tokens[0];
  if (loose && firstToken?.type === "text") {
    // remove the Tokens.Generic
    const pToken = firstToken as Tokens.Paragraph;

    firstParagraph = (
      <RenderParagraph {...pToken} {...shared}>
        {checkbox}{" "}
        <label htmlFor={id}>{parser.parseInline(pToken.tokens)}</label>
      </RenderParagraph>
    );
  }

  return (
    <li>
      {firstParagraph ? (
        <>
          {firstParagraph}
          {parser.parse(tokens.slice(1))}
        </>
      ) : (
        <>
          {checkbox} {loose ? children : <label htmlFor={id}>{children}</label>}
        </>
      )}
    </li>
  );
}
