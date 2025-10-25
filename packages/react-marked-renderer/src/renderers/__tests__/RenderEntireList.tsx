import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const UNORDERED_HYPHEN_LIST_MARKDOWN = `
- Item 1
- Item 2
- Item 3
`;

const UNORDERED_ASTERISK_LIST_MARKDOWN = `
* Asterisk Item 1
* Asterisk Item 2
* Asterisk Item 3
`;

const ORDERED_LIST_MARKDOWN = `
1. Ordered Item 1
2. Ordered Item 2
3. Ordered Item 3
`;

const NESTED_LIST_MARKDOWN = `
1. Ordered Item 1
   1. Ordered Subitem 1
      - Three Down Hyphen
   2. Ordered Subitem 2
      * Three Down Asterisk
`;

const TASK_LIST_MARKDOWN = `
- [ ] Unchecked Task
- [x] Checked Task Lowercase
- [X] Checked Task Uppercase
`;

describe("RenderEntireList", () => {
  it("should be able to render an unordered list using hyphens", () => {
    render(<Markdown markdown={UNORDERED_HYPHEN_LIST_MARKDOWN} />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(list).toMatchSnapshot();
  });

  it("should be able to render an unordered list using asterisks", () => {
    render(<Markdown markdown={UNORDERED_ASTERISK_LIST_MARKDOWN} />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(list).toMatchSnapshot();
  });

  it("should not be able to mix asterisks and hyphens", () => {
    render(
      <Markdown
        markdown={`
- Item 1
* Item 2
`}
      />
    );

    expect(screen.getAllByRole("list")).toHaveLength(2);
  });

  it("should be able to render ordered lists", () => {
    render(<Markdown markdown={ORDERED_LIST_MARKDOWN} />);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(list).toMatchSnapshot();
  });

  it("should be able to render nested lists", () => {
    render(<Markdown markdown={NESTED_LIST_MARKDOWN} />);

    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(4);
    expect(lists[0]).toMatchSnapshot();
  });

  it("should be able to render task lists", () => {
    render(<Markdown markdown={TASK_LIST_MARKDOWN} />);

    const list = screen.getByRole("list");
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);
    expect(list).toMatchSnapshot();
  });
});
