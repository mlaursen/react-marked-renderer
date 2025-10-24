import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const BOLD_UNDERSCORE_MARKDOWN = `
__Using Double Underscore__
`;
const BOLD_ASTERISK_MARKDOWN = `
**Using Double Asterisk**
`;

describe("RenderStrong", () => {
  it("should be able to render using double underscores", () => {
    render(<Markdown markdown={BOLD_UNDERSCORE_MARKDOWN} />);

    const strong = screen.getByText("Using Double Underscore");
    expect(strong.tagName).toBe("STRONG");
    expect(strong).toMatchSnapshot();
  });

  it("should be able to render using a single asterisk", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={BOLD_ASTERISK_MARKDOWN} />
      </div>
    );

    const strong = screen.getByText("Using Double Asterisk");
    expect(strong.tagName).toBe("STRONG");
    expect(strong).toMatchSnapshot();
  });

  it("should be able to render using a custom component", () => {
    render(
      <Markdown
        markdown={BOLD_UNDERSCORE_MARKDOWN}
        renderers={{
          strong: function Strong({ children }) {
            return <strong data-testid="strong">{children}</strong>;
          },
        }}
      />
    );

    expect(screen.getByTestId("strong")).toBe(
      screen.getByText("Using Double Underscore")
    );
  });
});
