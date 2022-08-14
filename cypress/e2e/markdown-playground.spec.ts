import { DEFAULT_MARKDOWN } from "../../constants";

describe("markdown playground", () => {
  it("Should support everything needed for previewing how react-marked-renderer works by displaying a real-time markdown editor and some configuration", () => {
    cy.viewport("macbook-16");
    cy.visit("/");

    cy.log("Upload via file input");
    cy.findByRole("textbox", { name: "Editor" })
      .should("have.value", DEFAULT_MARKDOWN)
      .as("editor")
      .clear();

    cy.findByLabelText("Upload").as("upload");

    cy.get("@upload").attachFile("example.md");
    cy.get("@editor").should(
      "have.value",
      "# readme\n\nThis is an example readme!\n"
    );

    cy.get("@upload").attachFile("example.txt");
    cy.get("@editor").should("have.value", "Some text content.\n");

    // can't use example.js for some reason since it tries to parse it instead of upload it
    cy.get("@upload").attachFile({
      fileName: "example.js",
      filePath: "example.ts",
      encoding: "utf8",
    });
    cy.get("@editor").should(
      "have.value",
      `\`\`\`js
const x = 3;
const y = 1;
const result = x + y;
\`\`\``
    );

    cy.get("@upload").attachFile("example.jsx");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`jsx
export default function Example() {
  return <h1>Hello, world!</h1>;
}
\`\`\``
    );

    cy.get("@upload").attachFile("example.ts");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`ts
const x = 3;
const y = 1;
const result = x + y;
\`\`\``
    );

    cy.get("@upload").attachFile("example.tsx");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`tsx
export default function Example() {
  return <h1>Hello, world!</h1>;
}
\`\`\``
    );

    cy.get("@upload").attachFile("example.json");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`json
{
  "name": "Using fixtures to represent data",
  "email": "hello@cypress.io",
  "body": "Fixtures are a great way to mock data for responses to routes"
}
\`\`\``
    );

    cy.get("@upload").attachFile("example.yml");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`yml
version: 2
updates:
  - package-ecosystem: "npm" # See documentation for possible values
    directory: "/" # Location of package manifests
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
\`\`\``
    );

    cy.get("@upload").attachFile("example.yaml");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`yaml
name: Main Workflow

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
\`\`\``
    );

    cy.get("@upload").attachFile("example.html");
    cy.get("@editor").should(
      "have.value",
      `\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Example</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
\`\`\``
    );

    cy.findByRole("button", { name: "Help" }).click();
    cy.findByRole("dialog", { name: "Playground" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("button", { name: "Reset Playground" }).click();
      });
    cy.findByRole("dialog").should("not.exist");
    cy.get("@editor").should("have.value", DEFAULT_MARKDOWN);

    cy.log("Upload via drag and drop");
    cy.get("html").trigger("dragenter");
    cy.findByRole("heading", {
      name: "Drag and drop a text file to update the markdown text with the file contents.",
    })
      .trigger("dragenter")
      .attachFile("example.ts", { subjectType: "drag-n-drop" });

    cy.get("@editor").should(
      "have.value",
      `\`\`\`ts
const x = 3;
const y = 1;
const result = x + y;
\`\`\``
    );

    cy.reload();
    cy.log("Using Custom Renderers");
    cy.findByRole("button", { name: "Custom Renderers" })
      .should("have.attr", "aria-pressed", "false")
      .as("toggle");

    cy.findByRole("status", { name: "Preview" })
      .as("preview")
      .within(() => {
        cy.get("[class^=rmd]").should("not.exist");
      });

    cy.get("@toggle").click().should("have.attr", "aria-pressed", "true");
    cy.get("@preview").within(() => {
      cy.get("[class^=rmd]").should("exist");
    });

    cy.reload();
    cy.findByRole("button", { name: "Custom Renderers" })
      .should("have.attr", "aria-pressed", "true")
      .as("toggle");
    cy.findByRole("status", { name: "Preview" })
      .as("preview")
      .within(() => {
        cy.get("[class^=rmd]").should("exist");
      });

    cy.get("@toggle").click().should("have.attr", "aria-pressed", "false");
    cy.get("@preview").within(() => {
      cy.get("[class^=rmd]").should("not.exist");
    });

    cy.log("Changing the website theme");
    cy.get("html").should("not.have.class");
    cy.findByRole("button", { name: "Theme Preference" }).as("themePreference");
    cy.get("@themePreference").find('[data-icon="system"]');
    cy.get("@themePreference").click();

    cy.findByRole("menu", { name: "Theme Preference" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("menuitemradio", { name: "Light Theme" })
          .should("have.attr", "aria-checked", "false")
          .as("light");
        cy.findByRole("menuitemradio", { name: "Dark Theme" }).should(
          "have.attr",
          "aria-checked",
          "false"
        );
        cy.findByRole("menuitemradio", { name: "System Theme" }).should(
          "have.attr",
          "aria-checked",
          "true"
        );

        cy.get("@light").click();
      });

    cy.findByRole("menu").should("not.exist");
    cy.get("@themePreference").find('[data-icon="light"]');
    cy.get("html").then((element) => {
      expect(element.get(0).className).to.match(/LightTheme/);
    });

    cy.get("@themePreference").click();
    cy.findByRole("menu", { name: "Theme Preference" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("menuitemradio", { name: "Light Theme" }).should(
          "have.attr",
          "aria-checked",
          "true"
        );
        cy.findByRole("menuitemradio", { name: "Dark Theme" })
          .should("have.attr", "aria-checked", "false")
          .as("dark");
        cy.findByRole("menuitemradio", { name: "System Theme" }).should(
          "have.attr",
          "aria-checked",
          "false"
        );

        cy.get("@dark").click();
      });

    cy.findByRole("menu").should("not.exist");
    cy.get("@themePreference").find('[data-icon="dark"]');
    cy.get("html").then((element) => {
      expect(element.get(0).className).to.match(/DarkTheme/);
    });

    cy.get("@themePreference").click();
    cy.findByRole("menu", { name: "Theme Preference" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("menuitemradio", { name: "Light Theme" }).should(
          "have.attr",
          "aria-checked",
          "false"
        );
        cy.findByRole("menuitemradio", { name: "Dark Theme" }).should(
          "have.attr",
          "aria-checked",
          "true"
        );
        cy.findByRole("menuitemradio", { name: "System Theme" })
          .should("have.attr", "aria-checked", "false")
          .click();
      });

    cy.findByRole("menu").should("not.exist");
    cy.get("html").should("not.have.class");

    cy.get("@themePreference").click();
    cy.findByRole("menu", { name: "Theme Preference" }).within(() => {
      cy.findByRole("menuitemradio", { name: "Light Theme" }).click();
    });

    cy.findByRole("menu").should("not.exist");
    cy.get("html").then((element) => {
      expect(element.get(0).className).to.match(/LightTheme/);
    });

    // it should persist in local storage
    // cy.reload();
    // cy.get("html").then((element) => {
    //   expect(element.get(0).className).to.match(/LightTheme/);
    // });

    cy.log("Customize the playground to use split view or tabs");
    cy.findByRole("button", { name: "Split View" })
      .should("have.attr", "aria-pressed", "true")
      .as("splitView");

    cy.findByRole("region", { name: "Editor" });
    cy.findByRole("textbox", { name: "Editor" });
    cy.findByRole("status", { name: "Preview" });
    cy.findByRole("separator", { name: "Resize Preview Panel" });
    cy.findByRole("tab").should("not.exist");

    cy.get("@splitView").click().should("have.attr", "aria-pressed", "false");

    cy.findByRole("region", { name: "Editor" });
    cy.findByRole("textbox", { name: "Editor" });
    cy.findByRole("status", { name: "Preview" }).should("not.exist");
    cy.findByRole("separator", { name: "Resize Preview Panel" }).should(
      "not.exist"
    );
    cy.findByRole("tab", { name: "Editor" })
      .should("have.attr", "aria-selected", "true")
      .as("editorTab");
    cy.findByRole("tab", { name: "Preview" })
      .should("have.attr", "aria-selected", "false")
      .as("previewTab");

    cy.get("@previewTab").click().should("have.attr", "aria-selected", "true");
    cy.get("@editorTab").should("have.attr", "aria-selected", "false");
    cy.findByRole("region", { name: "Editor" }).should("not.exist");
    cy.findByRole("textbox", { name: "Editor" }).should("not.exist");
    cy.findByRole("status", { name: "Preview" });
    cy.findByRole("separator", { name: "Resize Preview Panel" }).should(
      "not.exist"
    );

    cy.get("@splitView").click().should("have.attr", "aria-pressed", "true");
    cy.findByRole("region", { name: "Editor" }).as("editor");
    cy.findByRole("textbox", { name: "Editor" });
    cy.findByRole("status", { name: "Preview" });
    cy.findByRole("separator", { name: "Resize Preview Panel" }).as(
      "resizeHandle"
    );
    cy.findByRole("tab").should("not.exist");

    cy.log("Resize the split view");
    cy.window().then((window) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const oneThirdWidth = width / 3;
      cy.get("@resizeHandle")
        .should("have.attr", "aria-valuenow", "50")
        .trigger("mousedown", {
          button: 0,
          pageX: centerX,
          pageY: centerY,
        })
        .trigger("mousemove", {
          pageX: oneThirdWidth,
          pageY: centerY + 10,
          force: true,
        })
        .trigger("mouseup", {
          pageX: oneThirdWidth,
          pageY: centerY + 10,
          force: true,
        })
        .should(
          "have.attr",
          "aria-valuenow",
          `${(oneThirdWidth / width) * 100}`
        );
      cy.get("@editor").should("be.visible");
      cy.get("@preview").should("be.visible");

      cy.log("Cannot resize less than 20%");
      cy.get("@resizeHandle")
        .trigger("mousedown", {
          button: 0,
          pageX: centerX,
          pageY: centerY,
        })
        .trigger("mousemove", {
          pageX: 0,
          pageY: 0,
          force: true,
        })
        .trigger("mouseup", {
          pageX: 0,
          pageY: 0,
          force: true,
        })
        .should("have.attr", "aria-valuenow", "20");
      cy.get("@editor").should("be.visible");
      cy.get("@preview").should("be.visible");

      cy.get("@resizeHandle")
        .trigger("mousedown", { button: 0 })
        .trigger("mousemove", {
          pageX: width - oneThirdWidth,
          pageY: height - 10,
          force: true,
        })
        .trigger("mouseup", {
          pageX: width - oneThirdWidth,
          pageY: height - 10,
          force: true,
        })
        .should(
          "have.attr",
          "aria-valuenow",
          `${((oneThirdWidth * 2) / width) * 100}`
        );
      cy.get("@editor").should("be.visible");
      cy.get("@preview").should("be.visible");

      cy.log("Cannot resize more than 80%");
      cy.get("@resizeHandle")
        .trigger("mousedown", { button: 0 })
        .trigger("mousemove", {
          pageX: width,
          pageY: centerY,
          force: true,
        })
        .trigger("mouseup", {
          pageX: width,
          pageY: centerY - 10,
          force: true,
        })
        .should("have.attr", "aria-valuenow", "80");
      cy.get("@editor").should("be.visible");
      cy.get("@preview").should("be.visible");

      cy.log("Resize with keyboard");
      cy.get("@resizeHandle")
        .focus()
        .trigger("keydown", { key: "Home" })
        .should("have.attr", "aria-valuenow", "20")
        .trigger("keydown", { key: "ArrowLeft" })
        .should("have.attr", "aria-valuenow", "20")
        .trigger("keydown", { key: "ArrowRight" })
        .should("have.attr", "aria-valuenow", "21")
        .trigger("keydown", { key: "End" })
        .should("have.attr", "aria-valuenow", "80")
        .trigger("keydown", { key: "ArrowRight" })
        .should("have.attr", "aria-valuenow", "80")
        .trigger("keydown", { key: "ArrowLeft" })
        .should("have.attr", "aria-valuenow", "79");
    });

    cy.log("Using the Help Modal");
    cy.findByRole("dialog").should("not.exist");
    cy.findByRole("button", { name: "Help" }).click();

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
              "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            );
        });

        cy.findByRole("button", { name: "Reset Playground" }).should(
          "be.visible"
        );
        cy.findByRole("button", { name: "Close" }).should("be.visible").click();
      });

    cy.findByRole("dialog", { name: "Playground" }).should("not.exist");

    cy.log("Reset the playground");
    cy.findByRole("button", { name: "Custom Renderers" })
      .as("toggle")
      .click()
      .should("have.attr", "aria-pressed", "true");
    cy.get("@themePreference").find('[data-icon="light"]');

    cy.findByRole("button", { name: "Help" }).click();
    cy.findByRole("dialog", { name: "Playground" })
      .should("be.visible")
      .within(() => {
        cy.findByRole("button", { name: "Reset Playground" }).click();
      });
    cy.findByRole("dialog", { name: "Playground" }).should("not.exist");
    cy.get("@toggle").should("have.attr", "aria-pressed", "false");
    cy.get("@resizeHandle").should("have.attr", "aria-valuenow", "50");
    cy.get("@themePreference").find('[data-icon="system"]');

    cy.log("Phones should not be able to upload files");
    cy.viewport("iphone-8");
    cy.reload();

    cy.findByLabelText("Upload").should("not.exist");
    cy.findByRole("button", { name: "Split View" }).should("not.exist");
    cy.findByRole("button", { name: "Custom Renderers" }).should("be.visible");
    cy.findByRole("button", { name: "Help" }).should("be.visible");
    cy.findByRole("tab", { name: "Editor" }).should(
      "have.attr",
      "aria-selected",
      "true"
    );
    cy.findByRole("tab", { name: "Preview" }).should(
      "have.attr",
      "aria-selected",
      "false"
    );
  });
});
