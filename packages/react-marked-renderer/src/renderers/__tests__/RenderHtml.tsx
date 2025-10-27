import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const FOLDABLE_TEXT_MARKDOWN = `<details>
<summary>Title 1</summary>
<p>Content in Title 1</p>
</details>
<details>
  <summary>Title 2</summary>
  <p>Content in Title 2</p>
</details>
`;

describe("RenderHtml", () => {
  it("should not be able to support foldable text (details) without a custom renderer", () => {
    const { container } = render(
      <Markdown markdown={FOLDABLE_TEXT_MARKDOWN} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
