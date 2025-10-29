import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { render, screen } from "@testing-library/react";
import { type Tokens } from "marked";
import { type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";
import { doNotParseHtmlProps } from "../../parseHtmlProps.js";

const DETAILS_MARKDOWN = `
<details>
<summary>Title 1 **bold**</summary>
<p>Content in Title 1</p>
</details>
`;

const DETAILS_WITH_SPACES_MARKDOWN = `
<details>
  <summary>Title 2</summary>
  <p>Content in Title 2</p>
</details>
`;

describe("RenderReactElement", () => {
  // eslint-disable-next-line vitest/no-focused-tests
  it.only("should be able to render html elements as React elements", () => {
    const { container, rerender } = render(
      <Markdown markdown={DETAILS_MARKDOWN} parseHtml />
    );
    expect(container).toMatchSnapshot();

    rerender(<Markdown markdown={DETAILS_WITH_SPACES_MARKDOWN} parseHtml />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to support self closing tags without a space", () => {
    const { container } = render(
      <Markdown
        markdown={`
<hr/>
`}
        parseHtml
      />
    );

    expect(() => screen.getByRole("separator")).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should be able to support self closing tags with a space", () => {
    const { container } = render(
      <Markdown
        markdown={`
<hr />
`}
        parseHtml
      />
    );

    expect(() => screen.getByRole("separator")).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should be able to support attributes on elements", () => {
    render(
      <Markdown
        markdown={`
<div class="hello-world" data-testid="container">
  <p data-paragraph>Text</p>
  <input type="checkbox" checked />
</div>
`}
        parseHtml
      />
    );

    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render custom components with a custom renderer", () => {
    /**
     * only supports:
     * - `propName` -> `propName: true`
     * - `propName="some string"` -> `propName: "some string"`
     */
    const simpleJsxParser = (rawProps: string) => {
      const props: Tokens.ReactElementToken["props"] = {};
      const ast = parse(`<div ${rawProps} />`, {
        plugins: ["jsx"],
        sourceType: "module",
      });

      // get correct types
      (traverse.default ?? traverse)(ast, {
        JSXAttribute(path) {
          const name = path.node.name.name;
          const value = path.node.value;

          // prevent JSXIdentifier
          if (typeof name !== "string") {
            return;
          }

          if (!value) {
            props[name] = true;
          } else if (value.type === "StringLiteral") {
            props[name] = value.value;
          }
        },
      });

      return props;
    };

    function CustomComponent({
      children,
      ...props
    }: Record<string, unknown> & { children?: ReactNode }) {
      return (
        <div>
          {JSON.stringify(props)}
          {children}
        </div>
      );
    }

    const { container } = render(
      <Markdown
        markdown={`
<CustomComponent flagged hello="world">Children</CustomComponent>

<CustomComponent flagged hello="world">
Children
</CustomComponent>

<CustomComponent flagged hello="world" />

<CustomComponent flagged hello="world"/>
`}
        parseHtml
        parseHtmlProps={doNotParseHtmlProps}
        renderers={{
          react: function RenderReact({ children, tagName, rawProps }) {
            switch (tagName) {
              case "CustomComponent":
                return (
                  <CustomComponent {...simpleJsxParser(rawProps)}>
                    {children}
                  </CustomComponent>
                );
              default:
                return null;
            }
          },
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
