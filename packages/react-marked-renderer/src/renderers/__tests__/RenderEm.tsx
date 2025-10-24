import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const EMPHASIS_UNDERSCORE_MARKDOWN = `
_Using Single Underscore_
`;
const EMPHASIS_ASTERISK_MARKDOWN = `
*Using Single Asterisk*
`;

describe("RenderEm", () => {
  it("should be able to render using a single underscore", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={EMPHASIS_UNDERSCORE_MARKDOWN} />
      </div>
    );

    const container = screen.getByTestId("container");
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector("em")).not.toBeNull();
    expect(container).toHaveTextContent("Using Single Underscore");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render using a single asterisk", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={EMPHASIS_ASTERISK_MARKDOWN} />
      </div>
    );

    const container = screen.getByTestId("container");
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector("em")).not.toBeNull();
    expect(container).toHaveTextContent("Using Single Asterisk");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render using a custom component", () => {
    render(
      <Markdown
        markdown={EMPHASIS_ASTERISK_MARKDOWN}
        renderers={{
          em: function Em({ children }) {
            return <em data-testid="em">{children}</em>;
          },
        }}
      />
    );

    expect(screen.getByTestId("em")).toBe(
      screen.getByText("Using Single Asterisk")
    );
  });
});
