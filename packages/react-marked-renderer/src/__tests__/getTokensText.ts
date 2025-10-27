import { marked } from "marked";
import { describe, expect, it } from "vitest";

import { getTokensText } from "../getTokensText.js";

describe("getTokensText", () => {
  it("should return an empty string if there are no tokens", () => {
    expect(getTokensText([])).toBe("");
    expect(getTokensText([], {})).toBe("");
    expect(getTokensText([], { depth: 0, maxDepth: -1 })).toBe("");
  });

  it("should ignore spaces", () => {
    expect(getTokensText([{ type: "space", raw: "   " }])).toBe("");
  });

  it("should be return the correct text for a simple heading string", () => {
    const tokens = marked.lexer("# Hello, world!");
    expect(getTokensText(tokens)).toBe("Hello, world!");
  });

  it("should be able to handle additional markdown in headings", () => {
    const tokens = marked.lexer("# Hello, __world__. Continue");
    expect(getTokensText(tokens)).toBe("Hello, world . Continue");
  });
});
