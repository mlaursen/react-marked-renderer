import {
  BLOCKQUOTE_MARKDOWN,
  BOLD_TEXT_MARKDOWN,
  BR_MARKDOWN,
  CODE_BLOCK_MARKDOWN,
  CODE_SPAN_ADVANCED_MARKDOWN,
  CODE_SPAN_MARKDOWN,
  EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN,
  EMPHASIS_TEXT_MARKDOWN,
  ESCAPED_HTML_MARKDOWN,
  ESCAPED_MARKDOWN,
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

describe("renderers", () => {
  it("should render supported markdown correctly", () => {
    cy.viewport("macbook-16");
    cy.visit("/");

    cy.findByRole("status", { name: "Preview" }).as("preview");
    cy.findByRole("textbox", { name: "Editor" }).as("editor");

    cy.log("=============================");
    cy.log(
      "Heading Renderers",
      "should be able to render all six heading types"
    );
    cy.get("@editor").clear().type(HEADING_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByRole("heading", { name: "Heading 1" })
        .should("be.visible")
        .and("have.prop", "tagName", "H1");

      cy.findByRole("heading", { name: "Heading 2" })
        .should("be.visible")
        .and("have.prop", "tagName", "H2");

      cy.findByRole("heading", { name: "Heading 3" })
        .should("be.visible")
        .and("have.prop", "tagName", "H3");

      cy.findByRole("heading", { name: "Heading 4" })
        .should("be.visible")
        .and("have.prop", "tagName", "H4");

      cy.findByRole("heading", { name: "Heading 5" })
        .should("be.visible")
        .and("have.prop", "tagName", "H5");

      cy.findByRole("heading", { name: "Heading 6" })
        .should("be.visible")
        .and("have.prop", "tagName", "H6");

      cy.log(
        "Heading Renderers",
        "should be able to render h1 elements with equal signs"
      );
      cy.get("@editor").clear().type(HEADING_1_WITH_EQUALS_MARKDOWN);

      cy.get("@preview").within(() => {
        cy.findByRole("heading", { name: "Three equals" })
          .should("be.visible")
          .and("have.prop", "tagName", "H1");

        cy.findByRole("heading", { name: "Three or more equals" })
          .should("be.visible")
          .and("have.prop", "tagName", "H1");
      });

      cy.log(
        "Heading Renderers",
        "should be able to render h2 elements with hyphens"
      );
      cy.get("@editor").clear().type(HEADING_2_WITH_HYPHENS_MARKDOWN);

      cy.get("@preview").within(() => {
        cy.findByRole("heading", { name: "Three hyphens" })
          .should("be.visible")
          .and("have.prop", "tagName", "H2");

        cy.findByRole("heading", { name: "Three or more hyphens" })
          .should("be.visible")
          .and("have.prop", "tagName", "H2");
      });
    });

    cy.log("=============================");
    cy.log(
      "Link Renderer",
      "should be able to render links with or without references"
    );
    // set delay to 0 since it'll timeout otherwise. acts like a paste
    cy.get("@editor").clear().type(LINK_MARKDOWN, { delay: 0 });

    cy.get("@preview").within(() => {
      cy.findByRole("link", { name: "https://example.com" }).should(
        "have.attr",
        "href",
        "https://example.com"
      );

      cy.findByRole("link", { name: "Brackets Link" }).should(
        "have.attr",
        "href",
        "https://github.com"
      );

      cy.findByRole("link", { name: "Custom Title" })
        .should("have.attr", "href", "https://github.com")
        .and("have.text", "Brackets Link with title")
        .and("have.attr", "title", "Custom Title");

      cy.findByRole("link", { name: "Referenced Link Matching case" }).should(
        "have.attr",
        "href",
        "https://github.com/mlaursen"
      );

      cy.findByRole("link", { name: "ReFeRENced LInk IGNORing cAsE" }).should(
        "have.attr",
        "href",
        "https://github.com/mlaursen/react-marked-renderer"
      );
    });

    cy.log(
      "Link Renderer",
      "should be able to render links that reference specific ids"
    );
    cy.get("@editor").clear().type(REFERENCE_LINK_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByRole("link", { name: "heading-1" })
        .should("have.text", "heading-1")
        .and("have.attr", "href", "#heading-1")
        .and("not.have.attr", "title");

      cy.findByRole("link", { name: "Goto heading-2" })
        .should("have.text", "heading-2")
        .and("have.attr", "title", "Goto heading-2")
        .and("have.attr", "href", "#heading-2");
    });

    cy.log("=============================");
    cy.log("Blockquote Renderer", "should be able to render blockquotes");
    cy.get("@editor").clear().type(BLOCKQUOTE_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("blockquote")
        .should("have.text", "This is text in a blockquote")
        .and("contain.html", "<p>This is text in a blockquote</p>");
    });

    cy.log(
      "Blockquote Renderer",
      "should be able to render nested blockquotes"
    );
    cy.get("@editor").clear().type(NESTED_BLOCKQUOTE_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("blockquote").should("have.length", 2).as("blockquotes");
      cy.get("@blockquotes")
        .eq(0)
        .should(
          "have.html",
          "<p>Root Blockquote</p><blockquote><p>Nested Blockquote</p></blockquote>"
        );
      cy.get("@blockquotes")
        .eq(1)
        .should("have.html", "<p>Nested Blockquote</p>");
    });

    cy.log("=============================");
    cy.log("Text Renderers", "should be able to render emphasis (italic) text");
    cy.get("@editor").clear().type(EMPHASIS_TEXT_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("em").should("have.length", 2).as("ems");
      cy.get("@ems").eq(0).should("have.text", "Using Single Underscore");
      cy.get("@ems").eq(1).should("have.text", "Using Single Asterisk");
    });

    cy.log("Text Renderers", "should be able to render strong (bold) text");
    cy.get("@editor").clear().type(BOLD_TEXT_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("strong").should("have.length", 2).as("strongs");
      cy.get("@strongs").eq(0).should("have.text", "Using Double Underscore");
      cy.get("@strongs").eq(1).should("have.text", "Using Double Asterisk");
    });

    cy.log(
      "Text Renderers",
      "should be able to render strikethrough (deleted) text"
    );
    cy.get("@editor").clear().type(STRIKETHROUGH_TEXT_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("del").should("have.text", "This text has strikethroughs");
    });

    cy.log(
      "Text Renderers",
      "should be able to render text that combines emphasis, strong, and strikethrough text"
    );
    cy.get("@editor").clear().type(EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("> *").should("have.length", 7).as("matches");

      for (let i = 0; i < 6; i += 1) {
        cy.get("@matches")
          .eq(i)
          .should("have.text", "Should be emphasis and bold.")
          .and("contain.html", "<em>")
          .and("contain.html", "</em>")
          .and("contain.html", "<strong>")
          .and("contain.html", "</strong>");
      }

      cy.get("@matches")
        .eq(6)
        .should("have.text", "Should be emphasis, bold, and strikethrough.")
        .and("contain.html", "<em>")
        .and("contain.html", "</em>")
        .and("contain.html", "<strong>")
        .and("contain.html", "</strong>")
        .and("contain.html", "<del>")
        .and("contain.html", "</del>");
    });

    cy.log(
      "Text Renderers",
      "should be able to render escaped (backslash-prefixed) text"
    );
    cy.get("@editor").clear().type(ESCAPED_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByText("Here is some *escaped* stuff.").should("exist");
      cy.findByText("Allow __tests__.").should("exist");
    });

    cy.log(
      "Text Renderers",
      "should be able to render escaped (backslash-prefixed) html"
    );
    cy.get("@editor").clear().type(ESCAPED_HTML_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByText("<img>").should("exist");
      cy.findByText("<video>").should("exist");
      cy.findByText("<iframe>").should("exist");
      cy.findByText("<embed>").should("exist");
      cy.findByText("<object>").should("exist");
    });

    cy.log("Text Renderers", "should be able to render breaks (<br>) ");
    cy.get("@editor").clear().type(BR_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("br").should("have.length", 4);
      cy.get("p").should("have.length", 2);
    });

    cy.log("=============================");
    cy.log(
      "Code Renderers",
      "should be able to render code blocks with or without languages"
    );
    cy.get("@editor").clear().type(CODE_BLOCK_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("pre").should("have.length", 2).as("blocks");

      cy.get("@blocks")
        .eq(0)
        .should("have.class", "language-none")
        .within(() => {
          cy.get("code")
            .should("have.text", 'const x = "y";')
            .and("have.class", "language-none");
        });

      cy.get("@blocks")
        .eq(1)
        .should("have.class", "language-bash")
        .within(() => {
          cy.get("code")
            .should("have.text", "yarn add some-package")
            .and("have.class", "language-bash");
        });
    });

    cy.log("Code Renderers", "should be able to render inline code");
    cy.get("@editor").clear().type(CODE_SPAN_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.get("p").should("have.text", "This has some inline code to see.");
      cy.get("code").should("have.text", "inline code");
      cy.get("pre").should("not.exist");
    });

    cy.log(
      "Code Renderers",
      "should be able to render inline code that has html entities"
    );
    cy.get("@editor").clear().type(CODE_SPAN_ADVANCED_MARKDOWN);

    // I don't really know how to test this part since this always passes
    cy.get("@preview")
      .contains(/&(quot|lt|gt|amp|cent|pound|yen|euro|copy|reg);/)
      .should("not.exist");
    cy.get("@preview").then((element) => {
      expect(element.text()).not.to.match(
        /&(quot|lt|gt|amp|cent|pound|yen|euro|copy|reg);/
      );
    });

    cy.log("=============================");
    cy.log("List Renderers", "should be able to render unordered lists");
    cy.get("@editor").clear().type(UNORDERED_LIST_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findAllByRole("list").should("have.length", 2).as("lists");

      cy.get("@lists")
        .eq(0)
        .should("have.prop", "tagName", "UL")
        .within(() => {
          cy.findAllByRole("listitem").should("have.length", 3).as("items");

          cy.get("@items").eq(0).contains("Item 1");
          cy.get("@items").eq(1).contains("Item 2");
          cy.get("@items").eq(2).contains("Item 3");
        });

      cy.get("@lists")
        .eq(1)
        .should("have.prop", "tagName", "UL")
        .within(() => {
          cy.findAllByRole("listitem").should("have.length", 3).as("items");

          cy.get("@items").eq(0).contains("Asterisk Item 1");
          cy.get("@items").eq(1).contains("Asterisk Item 2");
          cy.get("@items").eq(2).contains("Asterisk Item 3");
        });
    });

    cy.log("List Renderers", "should be able to render ordered lists");
    cy.get("@editor").clear().type(ORDERED_LIST_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByRole("list")
        .should("have.prop", "tagName", "OL")
        .within(() => {
          cy.findAllByRole("listitem").should("have.length", 3).as("items");

          cy.get("@items").eq(0).contains("Ordered Item 1");
          cy.get("@items").eq(1).contains("Ordered Item 2");
          cy.get("@items").eq(2).contains("Ordered Item 3");
        });
    });

    cy.log("List Renderers", "should be able to render nested lists");
    cy.get("@editor").clear().type(NESTED_LIST_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findAllByRole("list").should("have.length", 4).as("lists-0");
      cy.get("@lists-0")
        .eq(0)
        .should("have.prop", "tagName", "OL")
        .within(() => {
          cy.get("> li")
            .should("have.length", 1)
            .contains("Ordered Item 1")
            .as("item1");
        });

      cy.get("@item1").within(() => {
        cy.findAllByRole("list").should("have.length", 3).as("lists-1");
        cy.get("@lists-1")
          .eq(0)
          .should("have.prop", "tagName", "OL")
          .within(() => {
            cy.get("> li").should("have.length", 2).as("items");
            cy.get("@items")
              .eq(0)
              .contains("Ordered Subitem 1")
              .should("not.contain.html", "<ol>")
              .and("not.contain.html", "<ul>");

            cy.get("@items").eq(1).contains("Ordered Subitem 2").as("item2");
          });

        cy.get("@item2").within(() => {
          // since this level uses different syntax for each list (hyphen vs
          // asterisk), they are split into two lists instead of one
          cy.findAllByRole("list").should("have.length", 2).as("lists-2");
          cy.get("@lists-2")
            .eq(0)
            .should("have.prop", "tagName", "UL")
            .within(() => {
              cy.findByRole("listitem").contains("Three Down Hyphen");
            });
          cy.get("@lists-2")
            .eq(1)
            .should("have.prop", "tagName", "UL")
            .within(() => {
              cy.findByRole("listitem").contains("Three Down Asterisk");
            });
        });
      });
    });

    cy.log("List Renderers", "should be able to render task lists");
    cy.get("@editor").clear().type(TASK_LIST_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByRole("checkbox", { name: "Unchecked Task" })
        .should("not.be.checked")
        .click()
        .should("be.checked");

      cy.findByRole("checkbox", { name: "Checked Task Lowercase" })
        .should("be.checked")
        .click()
        .should("not.be.checked");

      cy.findByRole("checkbox", { name: "Checked Task Uppercase" })
        .should("be.checked")
        .click()
        .should("not.be.checked");
    });

    cy.log("=============================");
    cy.log(
      "Horizontal Rule Renderer",
      "should be able to render horizontal rules and <br /> tags"
    );
    cy.get("@editor").clear().type(HORIZONTAL_RULE_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findByText("Text Above HR").should("exist");
      cy.findByRole("separator").should("exist");
      cy.findByText("Text Below HR")
        .should("exist")
        .prev()
        .should("have.prop", "tagName", "HR")
        .prev()
        .should("have.prop", "tagName", "P");
    });

    cy.log("=============================");
    cy.log("Image Renderer", "should be able to render images");
    cy.get("@editor").clear().type(IMAGE_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findAllByRole("img").should("have.length", "5").as("images");

      cy.get("@images")
        .eq(0)
        .should("have.attr", "src", "image.jpeg")
        .and("have.attr", "alt", "");

      cy.get("@images")
        .eq(1)
        .should("have.attr", "src", "image.jpeg")
        .and("have.attr", "alt", "alt text");

      cy.get("@images")
        .eq(2)
        .should("have.attr", "src", "image.jpeg")
        .and("have.attr", "alt", "alt text")
        .and("have.attr", "title", "With Title!");

      cy.get("@images")
        .eq(3)
        .should("have.attr", "src", "/image.jpeg")
        .and("have.attr", "alt", "absolute path");

      cy.get("@images")
        .eq(4)
        .should("have.attr", "src", "./image.jpeg")
        .and("have.attr", "alt", "relative path");
    });

    cy.log("=============================");
    cy.log("Table Renderers", "should be able to render tables");
    cy.get("@editor").clear().type(TABLE_MARKDOWN);

    cy.get("@preview").within(() => {
      cy.findAllByRole("table").should("have.length", 2).as("tables");

      for (let i = 0; i < 2; i += 1) {
        cy.get("@tables")
          .eq(i)
          .within(() => {
            cy.get("thead").within(() => {
              cy.findByRole("row").should("have.length", 1);
              cy.findByRole("columnheader", {
                name: "First Header",
              }).should("exist");
              cy.findByRole("columnheader", {
                name: "Second Header",
              }).should("exist");
            });

            cy.get("tbody").within(() => {
              cy.findAllByRole("row").should("have.length", 2).as("rows");

              cy.get("@rows")
                .eq(0)
                .within(() => {
                  cy.findAllByRole("cell").should("have.length", 2).as("cells");
                  cy.get("@cells").eq(0).contains("Content Cell");
                  cy.get("@cells").eq(1).contains("Content Cell");
                });

              cy.get("@rows")
                .eq(0)
                .within(() => {
                  cy.findAllByRole("cell").should("have.length", 2).as("cells");
                  cy.get("@cells").eq(0).contains("Content Cell");
                  cy.get("@cells").eq(1).contains("Content Cell");
                });
            });

            cy.get("tfoot").should("not.exist");
          });
      }
    });

    cy.log(
      "Table Renderers",
      "should be able to render tables with complex markdown"
    );
    cy.get("@editor").clear().type(TABLE_COMPLEX_MARKDOWN, { delay: 0 });

    cy.get("@preview").within(() => {
      cy.findAllByRole("table").should("have.length", 2).as("tables");

      cy.get("@tables")
        .eq(0)
        .within(() => {
          cy.findAllByRole("row").should("have.length", 3).as("rows");
          cy.get("@rows").eq(0).as("row1");
          cy.get("@rows").eq(1).as("row2");
          cy.get("@rows").eq(2).as("row3");
        });
      cy.get("@row1").within(() => {
        cy.findAllByRole("columnheader").should("have.length", 3).as("headers");

        cy.get("@headers")
          .eq(0)
          .contains("Left-aligned")
          .should("have.attr", "align", "left");

        cy.get("@headers")
          .eq(1)
          .contains("Center-aligned")
          .should("have.attr", "align", "center");

        cy.get("@headers")
          .eq(2)
          .contains("Right-aligned")
          .should("have.attr", "align", "right");
      });
      cy.get("@row2").within(() => {
        cy.findAllByRole("cell").should("have.length", 3).as("cells");

        cy.get("@cells")
          .eq(0)
          .should("have.attr", "align", "left")
          .contains("git status")
          .should("have.prop", "tagName", "CODE");

        cy.get("@cells")
          .eq(1)
          .should("have.attr", "align", "center")
          .contains("List all new or modified files")
          .contains("new or modified")
          .should("have.prop", "tagName", "EM");

        cy.get("@cells")
          .eq(2)
          .should("be.empty")
          .and("have.attr", "align", "right");
      });
      cy.get("@row3").within(() => {
        cy.findAllByRole("cell").should("have.length", 3).as("cells");

        cy.get("@cells")
          .eq(0)
          .should("have.attr", "align", "left")
          .contains("git diff")
          .should("have.prop", "tagName", "CODE");

        cy.get("@cells")
          .eq(1)
          .should("have.attr", "align", "center")
          .contains("Show file differences that haven't been staged")
          .contains("haven't been")
          .should("have.prop", "tagName", "STRONG");

        cy.get("@cells")
          .eq(2)
          .should("be.empty")
          .and("have.attr", "align", "right");
      });

      cy.get("@tables")
        .eq(1)
        .within(() => {
          cy.findByRole("columnheader", { name: "Name" });
          cy.findByRole("columnheader", { name: "Character" });

          cy.findByRole("cell", { name: "Backtick" });
          cy.findByRole("cell", { name: "`" });

          cy.findByRole("cell", { name: "Pipe" });
          cy.findByRole("cell", { name: "|" });
        });
    });
  });
});
