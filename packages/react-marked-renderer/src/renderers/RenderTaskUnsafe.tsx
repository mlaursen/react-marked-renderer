import {
  Children,
  Fragment,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useId,
} from "react";

import type { RenderTaskProps } from "../types.js";
import { RenderTask } from "./RenderTask.js";

/**
 * This is another version for rendering the {@link Tokens.ListItem} when the
 * `task` prop is `true`. This is not included in the default renderers since
 * it uses the [cloneElement](https://react.dev/reference/react/cloneElement)
 * API to inject the checkbox into the first child of the `<li>`.
 *
 * To use this renderer, import it and set it as one of the renderers:
 *
 * ```tsx
 * import { Markdown, RenderTaskUnsafe } from "react-marked-renderer";
 *
 * const markdown = `
 * - [ ] Item 1
 *
 *   Second Paragraph of Item 1
 *
 * - [x] Item 2
 * - [x] Item 3
 *
 *   Second Paragraph of Item 3
 * `
 *
 * function Example() {
 *   return <Markdown markdown={markdown} renderers={{ task: RenderTaskUnsafe }} />;
 * }
 * ```
 *
 * This will render something close to:
 *
 * ```tsx
 * <ul>
 *   <li>
 *     <p>
 *       <renderers.checkbox id={id} checked={false} renderers={renderers} />
 *       Item 1
 *     </p>
 *     <p>
 *       Second paragraph of Item 1
 *     </p>
 *   </li>
 *   <li>
 *     <renderers.checkbox id={id2} checked renderers={renderers} />
 *     <label htmlFor={id2}>Item 2</label>
 *   </li>
 *   <li>
 *     <p>
 *       <renderers.checkbox id={id3} checked renderers={renderers} />
 *       Item 3
 *     </p>
 *     <p>
 *       Second paragraph of Item 3
 *     </p>
 *   </li>
 * </ul>
 * ```
 *
 */
export function RenderTaskUnsafe(
  props: Readonly<RenderTaskProps>
): ReactElement {
  const { loose, tokens, checked, children, parser, renderers } = props;
  const { checkbox: RenderCheckbox } = renderers;

  const id = useId();

  if (!loose) {
    return <RenderTask {...props} />;
  }

  // this is how the marked-html-renderer works -- if it is a task
  // and the first token is text, move the checkbox into that first
  // paragraph and render the rest of the paragraphs like normal
  const childrenArray = Children.toArray(children);
  const [firstParagraph, ...remainingChildren] = childrenArray;

  const checkbox = (
    <RenderCheckbox
      id={id}
      checked={!!checked}
      parser={parser}
      renderers={renderers}
    />
  );

  let cloned = false;
  let firstChild = firstParagraph;
  if (
    tokens[0]?.type === "text" &&
    isValidElement<{ children: ReactNode }>(firstChild)
  ) {
    firstChild = cloneElement(firstChild, {
      children: (
        <Fragment>
          {checkbox}
          {firstChild.props.children}
        </Fragment>
      ),
    });
    cloned = true;
  }

  return (
    <li>
      {!cloned && checkbox}
      {firstChild}
      {remainingChildren}
    </li>
  );
}
