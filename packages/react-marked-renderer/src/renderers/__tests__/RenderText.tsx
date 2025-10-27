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
    const { container } = render(<Markdown markdown="Hello, world!" />);

    expect(container).toHaveTextContent("Hello, world!");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render a custom text component", () => {
    render(
      <Markdown
        markdown="Hello, world!"
        renderers={{
          text: function Text({ children }) {
            return <span data-testid="span">{children}</span>;
          },
        }}
      />
    );

    const span = screen.getByTestId("span");
    expect(span).toMatchSnapshot();
  });

  it("should be able to render text that combines emphasis, strong, and strikethrough text", () => {
    const { container } = render(
      <Markdown markdown={EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN} />
    );

    expect(container).toMatchSnapshot();
  });
});
