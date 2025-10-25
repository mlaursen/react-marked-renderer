import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const TABLE_MARKDOWN_NO_BOUNDS = `
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
`;

const TABLE_MARKDOWN_BOUNDS = `
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
`;

const LEFT_ALIGNED_MARKDOWN = `
| Left-aligned |
| :---         |
|    data      |
`;

const CENTER_ALIGNED_MARKDOWN = `
| Center-aligned |
|     :---:      |
| data           |
`;

const RIGHT_ALIGNED_MARKDOWN = `
| Right-aligned |
|          ---: |
| data          |
`;

const MODIFIED_TEXT_MARKDOWN = `
| Header 1       | Header 2                                           |
| ------------   | ---------------------------------------------------|
| \`git status\` | List all *new or modified* files                   |
| \`git diff\`   | Show file differences that **haven't been** staged |
`;

const ESCAPED_CHARACTERS_MARKDOWN = `
| Name     | Character |
| ---      | ---       |
| Backtick | \`         |
| Pipe     | \\|        |
`;

describe("RenderEntireTable", () => {
  it("should be able to render tables without leading and trailing |", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={TABLE_MARKDOWN_NO_BOUNDS} />
      </div>
    );

    expect(() => screen.getByRole("table")).not.toThrow();
    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render tables with the leading and trailing |", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={TABLE_MARKDOWN_BOUNDS} />
      </div>
    );

    expect(() => screen.getByRole("table")).not.toThrow();
    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to align columns to the left", () => {
    render(<Markdown markdown={LEFT_ALIGNED_MARKDOWN} />);

    expect(screen.getByRole("columnheader")).toHaveAttribute("align", "left");
    expect(screen.getByRole("cell")).toHaveAttribute("align", "left");
    expect(screen.getByRole("table")).toMatchSnapshot();
  });

  it("should be able to align columns to the center", () => {
    render(<Markdown markdown={CENTER_ALIGNED_MARKDOWN} />);

    expect(screen.getByRole("columnheader")).toHaveAttribute("align", "center");
    expect(screen.getByRole("cell")).toHaveAttribute("align", "center");
    expect(screen.getByRole("table")).toMatchSnapshot();
  });

  it("should be able to align columns to the right", () => {
    render(<Markdown markdown={RIGHT_ALIGNED_MARKDOWN} />);

    expect(screen.getByRole("columnheader")).toHaveAttribute("align", "right");
    expect(screen.getByRole("cell")).toHaveAttribute("align", "right");
    expect(screen.getByRole("table")).toMatchSnapshot();
  });

  it("should be able to render tables that include code, italics, and bold text", () => {
    render(<Markdown markdown={MODIFIED_TEXT_MARKDOWN} />);

    expect(screen.getByRole("table")).toMatchSnapshot();
  });

  it("should be able to render backticks and pipes by escaping the characters", () => {
    render(<Markdown markdown={ESCAPED_CHARACTERS_MARKDOWN} />);

    expect(screen.getByRole("table")).toMatchSnapshot();
  });
});
