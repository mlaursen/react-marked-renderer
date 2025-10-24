import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const BLOCKQUOTE_MARKDOWN = `
> This is text in a blockquote
`;

const NESTED_BLOCKQUOTE_MARKDOWN = `
> Root Blockquote
>> Nested Blockquote
`;

describe("RenderBlockquote", () => {
  it("should be able to render a simple blockquote", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={BLOCKQUOTE_MARKDOWN} />
      </div>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveTextContent("This is text in a blockquote");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a nested blockquotes", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={NESTED_BLOCKQUOTE_MARKDOWN} />
      </div>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveTextContent("Root BlockquoteNested Blockquote");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a custom blockquote component", () => {
    render(
      <Markdown
        markdown="> Hello, world!"
        renderers={{
          blockquote: function Blockquote({ children }) {
            return <blockquote data-testid="blockquote">{children}</blockquote>;
          },
        }}
      />
    );

    const blockquote = screen.getByTestId("blockquote");
    expect(blockquote).toMatchSnapshot();
  });
});
