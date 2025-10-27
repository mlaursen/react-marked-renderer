import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const CODE_SPAN_MARKDOWN = `
This has some \`inline code\` to see.
`;

const HTML_ENTITIES_CODE = `
This has some \`inline code that "contains" html 'entities' and <other></other>\`
`;

const HTML_ENTITIES_LIST_CODE = `
Some other html entities:

- \`¢\` cent
- \`£\` pound
- \`¥\` yen
- \`€\` euro
- \`©\` copyright
- \`®\` registered trademark
`;

describe("RenderCodeSpan", () => {
  it("should be able to render code blocks without a language", () => {
    const { container } = render(<Markdown markdown={CODE_SPAN_MARKDOWN} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to handle escaping html entities", () => {
    const { container } = render(<Markdown markdown={HTML_ENTITIES_CODE} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to handle escaping html entities within lists", () => {
    const { container } = render(
      <Markdown markdown={HTML_ENTITIES_LIST_CODE} />
    );

    expect(container).toMatchSnapshot();
  });
});
