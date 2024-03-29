// NOTE: Always do snapshot test as last line since the expect statements are
// easier to parse

import {
  getAllByRole as globalGetAllByRole,
  render,
} from "@testing-library/react";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

import { renderers } from "../../components/renderers";
import {
  BLOCKQUOTE_MARKDOWN,
  BOLD_TEXT_MARKDOWN,
  BR_MARKDOWN,
  CODE_BLOCK_MARKDOWN,
  CODE_SPAN_ADVANCED_MARKDOWN,
  CODE_SPAN_MARKDOWN,
  DEFAULT_MARKDOWN,
  EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN,
  EMPHASIS_TEXT_MARKDOWN,
  ESCAPED_HTML_MARKDOWN,
  ESCAPED_MARKDOWN,
  FOLDABLE_TEXT_MARKDOWN,
  HEADING_1_WITH_EQUALS_MARKDOWN,
  HEADING_2_WITH_HYPHENS_MARKDOWN,
  HEADING_MARKDOWN,
  HORIZONTAL_RULE_MARKDOWN,
  IMAGE_MARKDOWN,
  LINK_MARKDOWN,
  NESTED_BLOCKQUOTE_MARKDOWN,
  NESTED_LIST_MARKDOWN,
  ORDERED_LIST_MARKDOWN,
  REFERENCE_LINK_MARKDOWN,
  STRIKETHROUGH_TEXT_MARKDOWN,
  TABLE_COMPLEX_MARKDOWN,
  TABLE_MARKDOWN,
  TASK_LIST_MARKDOWN,
  UNORDERED_LIST_MARKDOWN,
} from "../../constants";
import { Markdown } from "../Markdown";
import type {
  DangerouslyHighlightCode,
  GetCodeLanguage,
  MarkdownOptions,
} from "../renderers";
import { DEFAULT_MARKDOWN_OPTIONS } from "../renderers";

describe("Markdown", () => {
  it("should be able to render all six heading types with or without ids", () => {
    const { container, getByRole, rerender } = render(
      <Markdown markdown={HEADING_MARKDOWN} />
    );
    const heading1 = getByRole("heading", { name: "Heading 1" });
    const heading2 = getByRole("heading", { name: "Heading 2" });
    const heading3 = getByRole("heading", { name: "Heading 3" });
    const heading4 = getByRole("heading", { name: "Heading 4" });
    const heading5 = getByRole("heading", { name: "Heading 5" });
    const heading6 = getByRole("heading", { name: "Heading 6" });

    expect(heading1.tagName).toBe("H1");
    expect(heading1).toHaveAttribute("id", "heading-1");
    expect(heading2.tagName).toBe("H2");
    expect(heading2).toHaveAttribute("id", "heading-2");
    expect(heading3.tagName).toBe("H3");
    expect(heading3).toHaveAttribute("id", "heading-3");
    expect(heading4.tagName).toBe("H4");
    expect(heading4).toHaveAttribute("id", "heading-4");
    expect(heading5.tagName).toBe("H5");
    expect(heading5).toHaveAttribute("id", "heading-5");
    expect(heading6.tagName).toBe("H6");
    expect(heading6).toHaveAttribute("id", "heading-6");
    expect(container).toMatchSnapshot();

    const options: MarkdownOptions = {
      ...DEFAULT_MARKDOWN_OPTIONS,
      headerIds: false,
    };
    rerender(<Markdown options={options} markdown={HEADING_MARKDOWN} />);
    expect(heading1.tagName).toBe("H1");
    expect(heading1).not.toHaveAttribute("id");
    expect(heading2.tagName).toBe("H2");
    expect(heading2).not.toHaveAttribute("id");
    expect(heading3.tagName).toBe("H3");
    expect(heading3).not.toHaveAttribute("id");
    expect(heading4.tagName).toBe("H4");
    expect(heading4).not.toHaveAttribute("id");
    expect(heading5.tagName).toBe("H5");
    expect(heading5).not.toHaveAttribute("id");
    expect(heading6.tagName).toBe("H6");
    expect(heading6).not.toHaveAttribute("id");
    expect(container).toMatchSnapshot();
  });

  it("should be able to render h1 elements with equal signs", () => {
    const { container, getByRole } = render(
      <Markdown markdown={HEADING_1_WITH_EQUALS_MARKDOWN} />
    );

    const threeEquals = getByRole("heading", { name: "Three equals" });
    const threeOrMoreEquals = getByRole("heading", {
      name: "Three or more equals",
    });
    expect(threeEquals.tagName).toBe("H1");
    expect(threeOrMoreEquals.tagName).toBe("H1");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render h2 elements with hyphens", () => {
    const { container, getByRole } = render(
      <Markdown markdown={HEADING_2_WITH_HYPHENS_MARKDOWN} />
    );

    const threeHyphens = getByRole("heading", { name: "Three hyphens" });
    const threeOrMoreHyphens = getByRole("heading", {
      name: "Three or more hyphens",
    });
    expect(threeHyphens.tagName).toBe("H2");
    expect(threeOrMoreHyphens.tagName).toBe("H2");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render links with or without references", () => {
    const { container, getByRole } = render(
      <Markdown markdown={LINK_MARKDOWN} />
    );

    const automatic = getByRole("link", { name: "https://example.com" });
    const brackets = getByRole("link", { name: "Brackets Link" });
    const bracketsTitle = getByRole("link", {
      name: "Brackets Link with title",
    });
    const referencedLinkMatchingCase = getByRole("link", {
      name: "Referenced Link Matching case",
    });
    const referencedLinkIgnoringCase = getByRole("link", {
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

    expect(container).toMatchSnapshot();
  });

  it("should be able to render links that reference specific ids", () => {
    const { container, getByRole } = render(
      <Markdown markdown={REFERENCE_LINK_MARKDOWN} />
    );

    const link1 = getByRole("link", { name: "heading-1" });
    expect(link1).toHaveTextContent("heading-1");
    expect(link1).not.toHaveAttribute("title");
    expect(link1).toHaveAttribute("href", "#heading-1");

    const link2 = getByRole("link", { name: "heading-2" });
    expect(link2).toHaveTextContent("heading-2");
    expect(link2).toHaveAttribute("href", "#heading-2");
    expect(link2).toHaveAttribute("title", "Goto heading-2");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render blockquotes", () => {
    const { container } = render(<Markdown markdown={BLOCKQUOTE_MARKDOWN} />);
    expect(document.querySelector("blockquote")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should be able to render nested blockquotes", () => {
    const { container } = render(
      <Markdown markdown={NESTED_BLOCKQUOTE_MARKDOWN} />
    );
    expect(document.querySelectorAll("blockquote")?.length).toBe(2);
    expect(
      document.querySelector("blockquote")?.querySelector("blockquote")
    ).not.toBe(null);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render emphasis (italic) text", () => {
    const { container } = render(
      <Markdown markdown={EMPHASIS_TEXT_MARKDOWN} />
    );
    expect(document.querySelectorAll("em")?.length).toBe(2);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render strong (bold) text", () => {
    const { container } = render(<Markdown markdown={BOLD_TEXT_MARKDOWN} />);
    expect(document.querySelectorAll("strong")?.length).toBe(2);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render strikethrough (deleted) text", () => {
    const { container } = render(
      <Markdown markdown={STRIKETHROUGH_TEXT_MARKDOWN} />
    );
    expect(document.querySelector("del")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("should be able to render text that combines emphasis, strong, and strikethrough text", () => {
    const { container } = render(
      <Markdown markdown={EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should be able to render escaped (backslash-prefixed) text", () => {
    const { container } = render(<Markdown markdown={ESCAPED_MARKDOWN} />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to render escaped (backslash-prefixed) html", () => {
    const { container } = render(<Markdown markdown={ESCAPED_HTML_MARKDOWN} />);
    const firstLi = document.querySelector("li");
    expect(firstLi?.innerHTML).toBe("&lt;img&gt;");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render breaks (<br>)", () => {
    const { container } = render(<Markdown markdown={BR_MARKDOWN} />);

    const brs = container.querySelectorAll("br");
    expect(brs.length).toBe(4);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render code blocks with or without languages", () => {
    const { container } = render(<Markdown markdown={CODE_BLOCK_MARKDOWN} />);

    const pre = container.querySelector("pre");
    const code = container.querySelector("code");
    expect(pre).toBeInTheDocument();
    expect(code).toBeInTheDocument();
    expect(code?.textContent).toBe('const x = "y";');

    expect(container).toMatchSnapshot();
  });

  it("should be able to render inline code", () => {
    const { container } = render(<Markdown markdown={CODE_SPAN_MARKDOWN} />);
    const pre = container.querySelector("pre");
    const code = container.querySelector("code");
    const p = document.querySelector("p");
    expect(pre).toBeNull();
    expect(code).toBeInTheDocument();
    expect(p).toBeInTheDocument();
    expect(code?.parentElement).toBe(p);
    if (!code || !p) {
      throw new Error();
    }

    expect(code.textContent).toBe("inline code");
    expect(p.textContent).toBe("This has some inline code to see.");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render inline code that has html entities", () => {
    const { container } = render(
      <Markdown markdown={CODE_SPAN_ADVANCED_MARKDOWN} />
    );

    expect(container.textContent).not.toMatch(
      /&(quot|lt|gt|amp|cent|pound|yen|euro|copy|reg);/
    );
    expect(container).toMatchSnapshot();
  });

  it("should be able to highlight code with the highlightCode option", () => {
    const getLanguage: GetCodeLanguage = (lang) => {
      lang = lang === "sh" ? "bash" : lang;
      if (!Prism.languages[lang]) {
        return "markup";
      }

      return lang;
    };

    const highlightCode: DangerouslyHighlightCode = (code, lang) => {
      return Prism.highlight(code, Prism.languages[lang], lang);
    };
    const { container } = render(
      <Markdown
        markdown={CODE_BLOCK_MARKDOWN}
        getLanguage={getLanguage}
        highlightCode={highlightCode}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should be able to highlight code with the highlightElement option", () => {
    const { container } = render(
      <Markdown
        markdown={CODE_BLOCK_MARKDOWN}
        highlightElement={Prism.highlightElement}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should be able to render unordered lists", () => {
    const { container, getAllByRole } = render(
      <Markdown markdown={UNORDERED_LIST_MARKDOWN} />
    );
    const lists = getAllByRole("list");

    expect(lists.length).toBe(2);
    const [hyphenList, asteriskList] = lists;

    expect(hyphenList.tagName).toBe("UL");
    const hyphenListItems = globalGetAllByRole(hyphenList, "listitem");
    expect(hyphenListItems.length).toBe(3);
    expect(hyphenListItems[0].textContent).toBe("Item 1");
    expect(hyphenListItems[1].textContent).toBe("Item 2");
    expect(hyphenListItems[2].textContent).toBe("Item 3");

    expect(asteriskList.tagName).toBe("UL");
    const asteriskListItems = globalGetAllByRole(asteriskList, "listitem");
    expect(asteriskListItems.length).toBe(3);
    expect(asteriskListItems[0].textContent).toBe("Asterisk Item 1");
    expect(asteriskListItems[1].textContent).toBe("Asterisk Item 2");
    expect(asteriskListItems[2].textContent).toBe("Asterisk Item 3");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render ordered lists", () => {
    const { container, getByRole } = render(
      <Markdown markdown={ORDERED_LIST_MARKDOWN} />
    );
    const orderedList = getByRole("list");

    expect(orderedList.tagName).toBe("OL");
    const orderedListItems = globalGetAllByRole(orderedList, "listitem");
    expect(orderedListItems.length).toBe(3);
    expect(orderedListItems[0].textContent).toBe("Ordered Item 1");
    expect(orderedListItems[1].textContent).toBe("Ordered Item 2");
    expect(orderedListItems[2].textContent).toBe("Ordered Item 3");

    expect(container).toMatchSnapshot();
  });

  it("should be able to render nested lists", () => {
    const { container } = render(<Markdown markdown={NESTED_LIST_MARKDOWN} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render task lists", () => {
    const { container, getByRole } = render(
      <Markdown markdown={TASK_LIST_MARKDOWN} />
    );

    const unchecked = getByRole("checkbox", { name: "Unchecked Task" });
    const checkedLowercase = getByRole("checkbox", {
      name: "Checked Task Lowercase",
    });
    const checkedUppercase = getByRole("checkbox", {
      name: "Checked Task Uppercase",
    });

    expect(unchecked).toBeInTheDocument();
    expect(unchecked).not.toBeChecked();
    expect(checkedLowercase).toBeInTheDocument();
    expect(checkedLowercase).toBeChecked();
    expect(checkedUppercase).toBeInTheDocument();
    expect(checkedUppercase).toBeChecked();

    expect(container).toMatchSnapshot();
  });

  it("should be able to render horizontal rules and <br /> tags", () => {
    const { container, getByRole } = render(
      <Markdown markdown={HORIZONTAL_RULE_MARKDOWN} />
    );
    expect(getByRole("separator")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("should be able to render images", () => {
    const { container } = render(<Markdown markdown={IMAGE_MARKDOWN} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render tables", () => {
    const { container } = render(<Markdown markdown={TABLE_MARKDOWN} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render tables with complex markdown", () => {
    const { container } = render(
      <Markdown markdown={TABLE_COMPLEX_MARKDOWN} />
    );
    expect(container).toMatchSnapshot();
  });
});

// TODO: Eventually support this out of the box. It is unsupported right now
// since I'd need to:
// - warn about unsanitized/secure HTML being rendered
// - try to find matching tags and/or render everything in an element (most
//   likely div)
describe("html support", () => {
  it("should not be able to render foldable text (details)", () => {
    const { container } = render(
      <Markdown markdown={FOLDABLE_TEXT_MARKDOWN} />
    );

    const details = document.querySelector("details");
    expect(details).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("should not be able to render tags?", () => {
    const markdown = `
# Heading <!-- comment --> Text
`;
    const { container } = render(<Markdown markdown={markdown} />);

    expect(container).toMatchSnapshot();
  });
});

describe("custom renderer", () => {
  it("should be able to use a custom renderer", () => {
    const { container } = render(
      <Markdown markdown={DEFAULT_MARKDOWN} renderers={renderers} />
    );
    expect(container).toMatchSnapshot();
  });
});
