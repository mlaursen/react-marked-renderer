const DEFAULT_MARKDOWN = `# Heading 1

Here is some amazing markdown! It uses the github flavored markdown by default.

## Heading 2

Create an unordered list:

- value 1
  - value 1-2
- value 2
- [Link](https://reactjs.org) - and content

Create an ordered list:

1. Item 1
2. Item 2
  - Sub Item
3. Item 3

Create a task list:

- [ ] Do something
- [x] Do something else
- [ ] Do something completely

### Heading 3

> Here's a blockquote.

#### Heading 4

Combine some *italics* and **bold** text while ~~deleting this text~~.

##### Heading 5

Create a table:

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

###### Heading 6

Do some code like stuff:

\`\`\`sh
npm install --save react-marked-renderer
\`\`\`

or

\`\`\`sh
yarn add react-marked-renderer
\`\`\`

Some other languages:

\`\`\`tsx
/**
 * The default implementation for rendering the {@link Tokens.List} by
 * rendering:
 *
 * \`\`\`tsx
 * <li>{children}</li>
 * \`\`\`
 */
export function ListItemRenderer({
  children,
}: ListItemRendererProps): ReactElement {
  return <li>{children}</li>;
}
\`\`\`
`;

describe("markdown playground", () => {
  it("should work correctly on desktop", () => {
    cy.viewport("macbook-16");
    cy.visit("/");

    cy.findByRole("heading", {
      name: "React Marked Renderer - Playground",
    }).should("be.visible");
    cy.findByRole("button", { name: "Split View" }).as("splitViewToggle");
    cy.findByLabelText("Upload").as("fileUpload");
    cy.findByRole("button", { name: "Custom Renderers" }).as("customRenderers");
    cy.findByRole("button", { name: "Light Theme" }).as("themeToggle");
    cy.findByRole("button", { name: "Help" }).as("helpButton");

    cy.findByRole("region", { name: "Editor" }).as("editorRegion");
    cy.findByRole("textbox", { name: "Editor" }).as("editor");
    cy.findByRole("status", { name: "Preview" }).as("preview");
    cy.findByRole("separator", { name: "Resize Preview Panel" }).as(
      "resizeSeparator"
    );

    cy.get("@editor").should("have.value", DEFAULT_MARKDOWN);
    cy.get("@splitViewToggle").should("have.attr", "aria-pressed", "true");
    cy.get("@customRenderers").should("have.attr", "aria-pressed", "false");
    cy.get("@themeToggle").should("have.attr", "aria-pressed", "false");
    cy.get("html").should("not.have.class", "dark-theme");

    cy.get("@themeToggle").click();
    cy.get("html").should("have.class", "dark-theme");
    cy.get("@themeToggle").should("have.attr", "aria-pressed", "true");

    cy.get("@themeToggle").click();
    cy.get("html").should("not.have.class", "dark-theme");
    cy.get("@themeToggle").should("have.attr", "aria-pressed", "false");

    cy.get("@helpButton").click();
    cy.findByRole("dialog", { name: "Playground" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("heading", { name: "Playground" }).should("be.visible");
        cy.findByRole("button", { name: "Close" }).should("be.visible");
        cy.findByRole("heading", { name: "About" }).should("be.visible");

        cy.findByRole("heading", { name: "Useful links:" }).should(
          "be.visible"
        );

        cy.findByRole("list").within(() => {
          cy.findAllByRole("link").as("links").should("have.length", 4);

          cy.get("@links")
            .eq(0)
            .should("contain", "API Documentation (typedoc)")
            .should("have.attr", "href", "/tsdocs/index.html");
          cy.get("@links")
            .eq(1)
            .should("contain", "GitHub - react-marked-renderer")
            .should(
              "have.attr",
              "href",
              "https://github.com/mlaursen/react-marked-renderer"
            );
          cy.get("@links")
            .eq(2)
            .should("contain", "Custom Renderers Source Code")
            .should("have.attr", "href")
            .and(
              "match",
              /^https:\/\/github.com\/mlaursen\/react-marked-renderer\/blob\/(main|\b[0-9a-f]{5,40}\b)\/components\/renderers\.tsx$/
            );
          cy.get("@links")
            .eq(3)
            .should("contain", "GitHub Markdown Cheatsheet")
            .should(
              "have.attr",
              "href",
              "https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf"
            );
        });

        cy.findByRole("button", { name: "Reset Playground" }).should(
          "be.visible"
        );
        cy.findByRole("button", { name: "Close" }).should("be.visible").click();
      });

    cy.findByRole("dialog", { name: "Playground" }).should("not.exist");

    cy.get("@editor").clear();
    cy.get("@preview").should("be.empty");

    cy.get("@editor").type("# Heading 1\nHere is some additional text.");
    cy.get("@preview").within(() => {
      cy.findByRole("heading", { name: "Heading 1" }).should("be.visible");
      cy.findByText("Here is some additional text.").should("be.visible");
    });
  });
});
