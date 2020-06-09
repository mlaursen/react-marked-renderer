import React from "react";
import { render } from "@testing-library/react";

import Markdown from "../Markdown";

describe("Markdown", () => {
  it("should render without crashing", () => {
    expect(() => render(<Markdown># Hello, worldQ</Markdown>)).not.toThrow();
  });
});
