import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const HEADING_MARKDOWN = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
`;

const HEADING_1_WITH_EQUALS_MARKDOWN = `
Three equals
===

Three or more equals
======
`;

const HEADING_2_WITH_HYPHENS_MARKDOWN = `
Three hyphens
---

Three or more hyphens
------
`;

describe("RenderHeading", () => {
  it("should be able to render all six heading types", () => {
    render(<Markdown markdown={HEADING_MARKDOWN} />);

    const heading1 = screen.getByRole("heading", { name: "Heading 1" });
    const heading2 = screen.getByRole("heading", { name: "Heading 2" });
    const heading3 = screen.getByRole("heading", { name: "Heading 3" });
    const heading4 = screen.getByRole("heading", { name: "Heading 4" });
    const heading5 = screen.getByRole("heading", { name: "Heading 5" });
    const heading6 = screen.getByRole("heading", { name: "Heading 6" });
    expect(heading1.tagName).toBe("H1");
    expect(heading2.tagName).toBe("H2");
    expect(heading3.tagName).toBe("H3");
    expect(heading4.tagName).toBe("H4");
    expect(heading5.tagName).toBe("H5");
    expect(heading6.tagName).toBe("H6");
    expect(heading1).toMatchSnapshot();
    expect(heading2).toMatchSnapshot();
    expect(heading3).toMatchSnapshot();
    expect(heading4).toMatchSnapshot();
    expect(heading5).toMatchSnapshot();
    expect(heading6).toMatchSnapshot();
  });

  it("should be render h1 elements with equal signs", () => {
    render(<Markdown markdown={HEADING_1_WITH_EQUALS_MARKDOWN} />);

    const threeEquals = screen.getByRole("heading", { name: "Three equals" });
    const threeOrMoreEquals = screen.getByRole("heading", {
      name: "Three or more equals",
    });
    expect(threeEquals.tagName).toBe("H1");
    expect(threeOrMoreEquals.tagName).toBe("H1");
    expect(threeEquals).toMatchSnapshot();
    expect(threeOrMoreEquals).toMatchSnapshot();
  });

  it("should be able to render h2 elements with hyphens", () => {
    render(<Markdown markdown={HEADING_2_WITH_HYPHENS_MARKDOWN} />);

    const threeHyphens = screen.getByRole("heading", { name: "Three hyphens" });
    const threeOrMoreHyphens = screen.getByRole("heading", {
      name: "Three or more hyphens",
    });
    expect(threeHyphens.tagName).toBe("H2");
    expect(threeOrMoreHyphens.tagName).toBe("H2");
    expect(threeHyphens).toMatchSnapshot();
    expect(threeOrMoreHyphens).toMatchSnapshot();
  });

  it("should be able to render with a custom renderer", () => {
    render(
      <Markdown
        markdown={HEADING_MARKDOWN}
        renderers={{
          heading: function Heading({ depth, children }) {
            const Component = `h${depth}` as const;
            return <Component data-testid={`h${depth}`}>{children}</Component>;
          },
        }}
      />
    );

    expect(screen.getByTestId("h1")).toBe(
      screen.getByRole("heading", { name: "Heading 1" })
    );
    expect(screen.getByTestId("h2")).toBe(
      screen.getByRole("heading", { name: "Heading 2" })
    );
    expect(screen.getByTestId("h3")).toBe(
      screen.getByRole("heading", { name: "Heading 3" })
    );
    expect(screen.getByTestId("h4")).toBe(
      screen.getByRole("heading", { name: "Heading 4" })
    );
    expect(screen.getByTestId("h5")).toBe(
      screen.getByRole("heading", { name: "Heading 5" })
    );
    expect(screen.getByTestId("h6")).toBe(
      screen.getByRole("heading", { name: "Heading 6" })
    );
  });
});
