import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const STRIKETHROUGH_TEXT_MARKDOWN = `
~~This text has strikethroughs~~
`;

describe("RenderDel", () => {
  it("should be able to render using double underscores", () => {
    render(<Markdown markdown={STRIKETHROUGH_TEXT_MARKDOWN} />);

    const del = screen.getByText("This text has strikethroughs");
    expect(del.tagName).toBe("DEL");
    expect(del).toMatchSnapshot();
  });

  it("should be able to render using a custom component", () => {
    render(
      <Markdown
        markdown={STRIKETHROUGH_TEXT_MARKDOWN}
        renderers={{
          del: function Del({ children }) {
            return <del data-testid="del">{children}</del>;
          },
        }}
      />
    );

    expect(screen.getByTestId("del")).toBe(
      screen.getByText("This text has strikethroughs")
    );
  });
});
