import type { Tokens } from "marked";

const PROP_REGEX = /([\w-]+)(?:=("([^"]*)")|)/g;

/**
 * This function attempts to convert html attributes into props from a
 * markdown string. Take the following markdown:
 *
 * ```markdown
 * <div class="container" data-testid="example" data-boolean>
 * </div>
 * ```
 *
 * This function would be called with:
 * `class="container" data-testid="example" data-boolean`
 *
 * And would return:
 *
 * ```ts
 * {
 *   className: "container",
 *   "data-testid": "example",
 *   "data-boolean": true,
 * }
 * ```
 *
 * **This does not support jsx properties at this time.**
 */
export function defaultParseHtmlProps(
  rawProps: string
): Tokens.ReactElementToken["props"] {
  const props: Tokens.ReactElementToken["props"] = {};

  const matches = rawProps.matchAll(PROP_REGEX);
  for (const match of matches) {
    const [_raw, rawName = "", equals = "", rawValue = ""] = match;
    let name = rawName;
    if (name === "class") {
      name = "className";
    } else if (name === "value") {
      name = "defaultValue";
    } else if (name === "checked") {
      name = "defaultChecked";
    }

    if (name) {
      // allow `checked` to be `true`
      const value = (equals === "" && rawValue === "") || rawValue;
      props[name] = value;
    }
  }

  return props;
}

/**
 * If you do not want to attempt parsing html props, set this to the
 * `parseHtmlProps` on the `Markdown` component:
 *
 * @example Do not parse props
 * ```tsx
 * import { Markdown, doNotParseHtmlProps } from "react-marked-renderer";
 *
 * <Markdown
 *   markdown={`
 * <CustomComponent config={{ a: "" }}>
 *   Here is some text children.
 * </CustomComponent>
 * `}
 *   parseHtml
 *   parseHtmlProps={doNotParseHtmlProps}
 *   renderers={{
 *     react: function RenderReact({ children, tagName }) {
 *       if (tagName !== "CustomComponent") {
 *         throw new Error()
 *       }
 *
 *       // ignore any props that were provided
 *       return <CustomComponent>{children}</CustomComponent>;
 *     }
 *   }}
 * />
 * ```
 */
export function doNotParseHtmlProps(): Tokens.ReactElementToken["props"] {
  return {};
}
