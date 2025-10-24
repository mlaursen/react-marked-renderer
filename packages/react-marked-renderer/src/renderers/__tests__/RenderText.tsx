import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN = `
___Should be emphasis and bold.___

***Should be emphasis and bold.***

*__Should be emphasis and bold.__*

__*Should be emphasis and bold.*__

_**Should be emphasis and bold.**_

**_Should be emphasis and bold._**

~~**_Should be emphasis, bold, and strikethrough._**~~
`;

describe("RenderText", () => {
  it("should be able to render simple text", () => {
    render(
      <div data-testid="container">
        <Markdown markdown="Hello, world!" />
      </div>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveTextContent("Hello, world!");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a custom text component", () => {
    render(
      <Markdown
        markdown="Hello, world!"
        renderers={{
          text: function Text({ children }) {
            return <p data-testid="p">{children}</p>;
          },
        }}
      />
    );

    const p = screen.getByTestId("p");
    expect(p).toMatchSnapshot();
  });

  it("should be able to render text that combines emphasis, strong, and strikethrough text", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN} />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });
});
