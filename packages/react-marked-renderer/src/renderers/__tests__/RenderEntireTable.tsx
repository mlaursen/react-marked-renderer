import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const PIPED_TABLE_MARKDOWN = `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
`;

const PIPELESS_TABLE_MARKDOWN = `
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
`;

const CELL_ALIGNMENT_MARKDOWN = `
| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| Cell 1-1 | Cell 1-2 | Cell 1-3 |
`;

// https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables
const ADVANCED_FORMATTING_MARKDOWN = `
| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| \`git status\` | List all *new or modified* files | Final ~cell~ |
| \`git diff\` | Show file differences that **haven't been** staged | Final ~cell~ |

`;

describe("RenderEntireTable", () => {
  it("should be able to render tables with leading and trailing pipes (|)", () => {
    const { container } = render(<Markdown markdown={PIPED_TABLE_MARKDOWN} />);

    expect(() => screen.getByRole("table")).not.toThrow();
    expect(() =>
      screen.getByRole("columnheader", { name: "First Header" })
    ).not.toThrow();
    expect(() =>
      screen.getByRole("columnheader", { name: "Second Header" })
    ).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should be able to render tables without leading and trailing pipes (|)", () => {
    const { container } = render(
      <Markdown markdown={PIPELESS_TABLE_MARKDOWN} />
    );

    expect(() => screen.getByRole("table")).not.toThrow();
    expect(() =>
      screen.getByRole("columnheader", { name: "First Header" })
    ).not.toThrow();
    expect(() =>
      screen.getByRole("columnheader", { name: "Second Header" })
    ).not.toThrow();
    expect(container).toMatchSnapshot();
  });

  it("should support table cell alignment", () => {
    const { container } = render(
      <Markdown markdown={CELL_ALIGNMENT_MARKDOWN} />
    );

    const leftAligned = screen.getByRole("columnheader", {
      name: "Left-aligned",
    });
    const centerAligned = screen.getByRole("columnheader", {
      name: "Center-aligned",
    });
    const rightAligned = screen.getByRole("columnheader", {
      name: "Right-aligned",
    });

    expect(leftAligned).toHaveAttribute("align", "left");
    expect(centerAligned).toHaveAttribute("align", "center");
    expect(rightAligned).toHaveAttribute("align", "right");
    expect(container).toMatchSnapshot();
  });

  it("should support advanced formatting in tables", () => {
    const { container } = render(
      <Markdown markdown={ADVANCED_FORMATTING_MARKDOWN} />
    );

    expect(container).toMatchSnapshot();
  });
});
