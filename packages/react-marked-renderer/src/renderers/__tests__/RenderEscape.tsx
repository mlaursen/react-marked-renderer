import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const ESCAPED_MARKDOWN = `
Here is some \\*escaped\\* stuff.

Allow \\_\\_tests\\_\\_.

Also need to support <>.
`;

const ESCAPED_HTML_MARKDOWN = `
- \\<img>
- \\<video>
- \\<iframe>
- \\<embed>
- \\<object>
`;

describe("RenderEscape", () => {
  it("should be able to render escaped (backslash-prefixed) text", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={ESCAPED_MARKDOWN} />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render escaped (backslash-prefixed) html", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={ESCAPED_HTML_MARKDOWN} />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render using a custom component", () => {
    render(
      <div data-testid="container">
        <Markdown
          markdown={ESCAPED_MARKDOWN}
          renderers={{
            escape: function Escape({ text }) {
              return <span data-testid="escape">{text}</span>;
            },
          }}
        />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });
});
