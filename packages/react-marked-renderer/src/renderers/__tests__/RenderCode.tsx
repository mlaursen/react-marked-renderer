import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const NO_LANG_CODE = `
\`\`\`
const x = "y";
\`\`\`
`;

const LANG_CODE = `
\`\`\`sh
yarn add some-package
\`\`\`
`;

describe("RenderCode", () => {
  it("should be able to render code blocks without a language", () => {
    const { container } = render(<Markdown markdown={NO_LANG_CODE} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render code blocks with a language", () => {
    const { container } = render(<Markdown markdown={LANG_CODE} />);

    expect(container).toMatchSnapshot();
  });
});
