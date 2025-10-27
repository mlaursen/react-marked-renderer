import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const HORIZONTAL_RULE_MARKDOWN = `
Text Above HR

---

Text Below HR
`;

describe("RenderHr", () => {
  it("should be able to render horizontal rules and <br /> tags", () => {
    const { container } = render(
      <Markdown markdown={HORIZONTAL_RULE_MARKDOWN} />
    );

    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should be able to be rendered with a custom component", () => {
    render(
      <Markdown
        markdown={HORIZONTAL_RULE_MARKDOWN}
        renderers={{
          hr: function Hr() {
            return <hr data-testid="hr" />;
          },
        }}
      />
    );

    expect(screen.getByTestId("hr")).toBe(screen.getByRole("separator"));
  });
});
