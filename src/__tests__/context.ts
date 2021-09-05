import { getTokensText } from "../context";

describe("getTokensText", () => {
  // this is just used to catch line 71
  it("should return the correct strings", () => {
    expect(getTokensText([])).toBe("");
    expect(getTokensText([], {})).toBe("");
    expect(getTokensText([], { depth: 0, maxDepth: -1 })).toBe("");

    expect(getTokensText([{ type: "space", raw: "   " }])).toBe("");
  });
});
