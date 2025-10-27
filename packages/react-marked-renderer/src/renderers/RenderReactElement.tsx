// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tokens } from "marked";
import { type ReactElement } from "react";

import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultParseHtmlProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doNotParseHtmlProps,
} from "../parseHtmlProps.js";
import type { RenderReactElementProps } from "../types.js";

const VOID_ELEMENT_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * This is an unsafe renderer to attempt rendering html in markdown as react
 * components for the {@link Tokens.ReactElementToken}. To use this renderer,
 * enable the `parseHtml` option and optionally provide a `parseHtmlProps`
 * function:
 *
 * ```tsx
 * <Markdown markdown={markdown} parseHtml />
 * ```
 *
 * If custom components should be used, provide a custom react renderer
 * instead:
 *
 * ```tsx
 * const markdown = `
 * # Title
 *
 * <Example />
 *
 * <div class="container">
 *   Hello, world!
 * </div>
 * `;
 *
 * <Markdown
 *   markdown={markdown}
 *   parseHtml
 *   renderers={{
 *     react: function RenderReact({
 *       tagName,
 *       raw,
 *       rawProps,
 *       rawChildren,
 *       tokens,
 *       children,
 *       renderers,
 *       isSelfClosing,
 *     }) {
 *       switch (tagName) {
 *         case "Example":
 *           return <Example />
 *         case "div":
 *           return <div {...props}>{children}</div>
 *         default:
 *           return null;
 *       }
 *     }
 *   }}
 * />
 * ```
 *
 * It is possible to write a custom props string parser using the
 * `parseHtmlProps` prop on the `Markdown` component. This is not really
 * recommended since it will take a good amount of code to create a "correct"
 * prop parser and it's generally easier to just create a custom component with
 * the correct  props instead.
 *
 * @example Just creating another component
 * ```diff
 *  <Markdown
 *    markdown={`
 * -<CustomComponent config={{ a: "" }}>
 * +<CustomComponentWithProps>
 *    Here is some text children.
 * -</CustomComponent>
 * +</CustomComponentWithProps>
 *  `}
 *    parseHtml
 *    parseHtmlProps={parsePropsWithBabel}
 *    renderers={{
 *      react: function RenderReact({ children, tagName, props }) {
 * -      if (tagName !== "CustomComponent") {
 * +      if (tagName !== "CustomComponentWithProps") {
 *          throw new Error()
 *        }
 *
 * -      return <CustomComponent>{children}</CustomComponent>;
 * +      return <CustomComponentWithProps>{children}</CustomComponentWithProps>;
 *      }
 *    }}
 *  />
 *
 * +function CustomComponentWithProps({ children }) {
 * +  return <CustomComponent config={{ a: "" }}>{children}</CustomComponent>;
 * +}
 * ```
 *
 * Here is an extremely trimmed down version of using babel to parse the props:
 *
 * @example Using babel to parse the props
 * ```tsx
 * import { parse } from "@babel/parser"
 * import traverse from "@babel/traverse";
 * import type { Tokens } from "marked";
 * import { Markdown, doNotParseHtmlProps } from "react-marked-renderer";
 *
 * function parsePropsWithBabel(rawProps: string): Tokens.ReactElementToken['props'] {
 *   const props: Tokens.ReactElementToken["props"] = {};
 *   const ast = parse(rawProps, { plugins: ["jsx"], sourceType: "module" });
 *   traverse(ast, {
 *     JSXAttribute(path) {
 *       const name = path.node.name.name;
 *       const value = path.node.value;
 *
 *       if (!value) {
 *         props[name] = true;
 *       } else if (value.type === "StringLiteral") {
 *         props[name] = value.value;
 *       } else if (value.type === "JSXExpressionContainer") {
 *         // write additional stuff to convert:
 *         // - `{variableName}` - variable expressions
 *         // - `{3}` - number expressions
 *         // - `{"string"}` - string literal expressions
 *         // - `{[]}` - array expressions
 *         // - `{{}}` - object pattern expressions
 *         // - etc.
 *       }
 *     }
 *   });
 *
 *   return props;
 * }
 *
 * <Markdown
 *   markdown={`
 * <CustomComponent config={{ a: "" }}>
 *   Here is some text children.
 * </CustomComponent>
 * `}
 *   parseHtml
 *   parseHtmlProps={parsePropsWithBabel}
 *   renderers={{
 *     react: function RenderReact({ children, tagName, props }) {
 *       if (tagName !== "CustomComponent") {
 *         throw new Error()
 *       }
 *
 *       return <CustomComponent {...props}>{children}</CustomComponent>;
 *     }
 *   }}
 * />
 * ```
 *
 * @see {@link defaultParseHtmlProps} or {@link doNotParseHtmlProps} for more
 * `parseHtmlProps` examples.
 */
export function RenderReactElement({
  props,
  tagName,
  children,
}: Readonly<RenderReactElementProps>): ReactElement {
  const Component = tagName as "div";
  if (VOID_ELEMENT_TAGS.has(tagName)) {
    return <Component {...props} />;
  }

  return <Component {...props}>{children}</Component>;
}
