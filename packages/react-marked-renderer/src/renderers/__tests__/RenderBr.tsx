import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

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
    const { container } = render(<Markdown markdown={BR_MARKDOWN} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render a custom br component", () => {
    const { container } = render(
      <Markdown
        markdown={BR_MARKDOWN}
        renderers={{
          br: function Br() {
            return <br data-testid="br" />;
          },
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
