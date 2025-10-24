import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

// prettier-ignore
const BR_MARKDOWN = `
Trailing two spaces to force break${"  "}
Second Line of text with trailing slash to force break\\
Third line of text

[Link Text](https://example.com)${"  "}
[Link Text](https://example.com)\\
Fine Link Line
`;

describe("RenderBr", () => {
  it("should be able to support the different types of breaks", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={BR_MARKDOWN} />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render a custom br component", () => {
    render(
      <div data-testid="container">
        <Markdown
          markdown={BR_MARKDOWN}
          renderers={{
            br: function Br() {
              return <br data-testid="br" />;
            },
          }}
        />
      </div>
    );

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });
});
