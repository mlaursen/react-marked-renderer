import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Markdown } from "../../Markdown.js";

const IMAGE_MARKDOWN = `
![alt text](image.png)
`;

const IMAGE_WITH_TITLE_MARKDOWN = `
![alt text](image.png "With Title!")
`;

const ABSOLUTE_PATH_MARKDOWN = `
![absolute path](/image.jpeg)
`;

const RELATIVE_PATH_MARKDOWN = `
![relative path](./image.jpeg)
`;

describe("RenderImage", () => {
  it("should be able to render an image with alt text", () => {
    render(<Markdown markdown={IMAGE_MARKDOWN} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "alt text");
    expect(img).toHaveAttribute("src", "image.png");
    expect(img).toMatchSnapshot();
  });

  it("should be able to render an image a title", () => {
    render(<Markdown markdown={IMAGE_WITH_TITLE_MARKDOWN} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "alt text");
    expect(img).toHaveAttribute("title", "With Title!");
    expect(img).toHaveAttribute("src", "image.png");
    expect(img).toMatchSnapshot();
  });

  it("should be able to render an image with an absolute path", () => {
    render(<Markdown markdown={ABSOLUTE_PATH_MARKDOWN} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "absolute path");
    expect(img).toHaveAttribute("src", "/image.jpeg");
    expect(img).toMatchSnapshot();
  });

  it("should be able to render an image with a relative path", () => {
    render(<Markdown markdown={RELATIVE_PATH_MARKDOWN} />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "relative path");
    expect(img).toHaveAttribute("src", "./image.jpeg");
    expect(img).toMatchSnapshot();
  });
});
