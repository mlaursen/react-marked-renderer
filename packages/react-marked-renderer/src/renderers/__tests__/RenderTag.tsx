import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Markdown } from "../../Markdown.js";

const TAG_MARKDOWN = `Some text with <span>an HTML tag</span> in it.`;

describe("RenderTag", () => {
  it("should not be able to render inline tags without a custom renderer", () => {
    const { container } = render(<Markdown markdown={TAG_MARKDOWN} />);

    expect(container).toHaveTextContent("Some text with an HTML tag in it");
    expect(container).toMatchSnapshot();
  });

  it("should allow for a custom renderer", () => {
    const tag = vi.fn();
    const { container } = render(
      <Markdown
        markdown={TAG_MARKDOWN}
        renderers={{
          tag: function Tag({ text }) {
            tag(text);
            return null;
          },
        }}
      />
    );

    expect(tag).toHaveBeenCalledWith("<span>");
    expect(tag).toHaveBeenCalledWith("</span>");
    expect(container).toHaveTextContent("Some text with an HTML tag in it");
    expect(container).toMatchSnapshot();
  });
});
