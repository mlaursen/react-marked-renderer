import { render } from "@testing-library/react";
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
    const { container } = render(<Markdown markdown={ESCAPED_MARKDOWN} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render escaped (backslash-prefixed) html", () => {
    const { container } = render(<Markdown markdown={ESCAPED_HTML_MARKDOWN} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render using a custom component", () => {
    const { container } = render(
      <Markdown
        markdown={ESCAPED_MARKDOWN}
        renderers={{
          escape: function Escape({ text }) {
            return <span data-testid="escape">{text}</span>;
          },
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
