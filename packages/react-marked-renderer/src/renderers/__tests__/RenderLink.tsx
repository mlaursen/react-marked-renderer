import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const LINK_MARKDOWN = `
Automatically https://example.com without brackets.

[Brackets Link](https://github.com) with text afterwards.

[Brackets Link with title](https://github.com "Custom Title") with text afterwards.

[Referenced Link Matching case] with text afterwards.

[ReFeRENced LInk IGNORing cAsE] with text afterwards.

[Referenced Link Matching case]: https://github.com/mlaursen
[referenced link ignoring case]: https://github.com/mlaursen/react-marked-renderer
`;

const REFERENCE_LINK_MARKDOWN = `
[heading-1](#heading-1)
[heading-2](#heading-2 "Goto heading-2")
`;

describe("RenderLink", () => {
  it("should be able to render links with or without references", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={LINK_MARKDOWN} />
      </div>
    );

    const automatic = screen.getByRole("link", { name: "https://example.com" });
    const brackets = screen.getByRole("link", { name: "Brackets Link" });
    const bracketsTitle = screen.getByRole("link", {
      name: "Brackets Link with title",
    });
    const referencedLinkMatchingCase = screen.getByRole("link", {
      name: "Referenced Link Matching case",
    });
    const referencedLinkIgnoringCase = screen.getByRole("link", {
      name: "ReFeRENced LInk IGNORing cAsE",
    });

    expect(automatic).toHaveAttribute("href", "https://example.com");
    expect(brackets).toHaveAttribute("href", "https://github.com");
    expect(bracketsTitle).toHaveAttribute("href", "https://github.com");
    expect(bracketsTitle).toHaveTextContent("Brackets Link with title");
    expect(bracketsTitle).toHaveAttribute("title", "Custom Title");
    expect(referencedLinkMatchingCase).toHaveAttribute(
      "href",
      "https://github.com/mlaursen"
    );
    expect(referencedLinkIgnoringCase).toHaveAttribute(
      "href",
      "https://github.com/mlaursen/react-marked-renderer"
    );
    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render links that reference specific ids", () => {
    render(
      <div data-testid="container">
        <Markdown markdown={REFERENCE_LINK_MARKDOWN} />
      </div>
    );

    const link1 = screen.getByRole("link", { name: "heading-1" });
    expect(link1).toHaveTextContent("heading-1");
    expect(link1).not.toHaveAttribute("title");
    expect(link1).toHaveAttribute("href", "#heading-1");

    const link2 = screen.getByRole("link", { name: "heading-2" });
    expect(link2).toHaveTextContent("heading-2");
    expect(link2).toHaveAttribute("href", "#heading-2");
    expect(link2).toHaveAttribute("title", "Goto heading-2");

    expect(screen.getByTestId("container")).toMatchSnapshot();
  });

  it("should be able to render a custom link component", () => {
    render(
      <Markdown
        markdown="Here is a [link](https://example.com)."
        renderers={{
          link: function Link({ children, href }) {
            return (
              <a data-testid="link" href={href}>
                {children}
              </a>
            );
          },
        }}
      />
    );
    expect(screen.getByTestId("link")).toBe(
      screen.getByRole("link", { name: "link" })
    );
  });
});
