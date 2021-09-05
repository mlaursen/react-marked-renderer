import { render } from "@testing-library/react";
import { Slugger, Token } from "marked";
import React, { ReactElement } from "react";

import {
  getTokensText,
  MarkdownSluggerProvider,
  useSluggedId,
} from "../useSlugger";

interface SluggedElementProps {
  textOrTokens: string | readonly Token[];
}

function SluggedElement({ textOrTokens }: SluggedElementProps) {
  const id = useSluggedId(textOrTokens);
  return (
    <h3 id={id} data-testid="heading">
      Heading
    </h3>
  );
}

interface TestProps extends SluggedElementProps {
  slugger?: Slugger;
}

function Test({ textOrTokens, slugger }: TestProps): ReactElement {
  return (
    <MarkdownSluggerProvider slugger={slugger}>
      <SluggedElement textOrTokens={textOrTokens} />
    </MarkdownSluggerProvider>
  );
}

describe("useSlugger", () => {
  it("should generate a correct id for text", () => {
    const { getByTestId, rerender } = render(
      <Test textOrTokens="Some Content" />
    );
    const heading = getByTestId("heading");
    expect(heading).toHaveAttribute("id", "some-content");
    expect(heading).toMatchSnapshot();

    rerender(<Test textOrTokens="b" />);
    expect(heading).toHaveAttribute("id", "b");
    expect(heading).toMatchSnapshot();
  });

  it("should generate the correct id for tokens", () => {
    const tokens: readonly Token[] = [
      { type: "text", text: "Some content", raw: "Some content" },
      {
        type: "link",
        text: "Link Text",
        raw: "[Link Text](https://example.com)",
        href: "https://example.com",
        title: "",
        tokens: [
          {
            type: "text",
            raw: "Link Text",
            text: "Link Text",
          },
        ],
      },
    ];
    const { getByTestId } = render(<Test textOrTokens={tokens} />);
    const heading = getByTestId("heading");
    expect(heading).toHaveAttribute("id", "some-content-link-text");
    expect(heading).toMatchSnapshot();
  });
});

describe("getTokensText", () => {
  // this is just used to catch line 71
  it("should return the correct strings", () => {
    expect(getTokensText([])).toBe("");
    expect(getTokensText([], {})).toBe("");
    expect(getTokensText([], { depth: 0, maxDepth: -1 })).toBe("");

    expect(getTokensText([{ type: "space", raw: "   " }])).toBe("");
  });
});
