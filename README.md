# React Marked Renderer [![license](https://img.shields.io/npm/l/react-md)](https://github.com/mlaursen/react-marked-renderer/blob/main/LICENSE) [![codecov](https://codecov.io/gh/mlaursen/react-marked-renderer/branch/main/graph/badge.svg?token=R4XGTOIVU0)](https://codecov.io/gh/mlaursen/react-marked-renderer) [![Validate](https://github.com/mlaursen/react-marked-renderer/actions/workflows/validate.yml/badge.svg)](https://github.com/mlaursen/react-marked-renderer/actions/workflows/validate.yml)

A low-level component wrapper for [marked](https://github.com/markedjs/marked)
that renders as [React](https://reactjs.org) components instead of strings.

Check out the [playground website](https://react-marked-renderer.vercel.app/) to
see how markdown is rendered with the default renderers or custom renderers and
the
[API Documentation](https://react-marked-renderer.vercel.app/tsdocs/index.html).

## Installation

```sh
npm install react react-marked-renderer
```

Or with [yarn](https://yarnpkg.com)

```sh
yarn add react react-marked-renderer
```

## Features

- render almost everything that is available by GitHub flavored markdown out of
  the box
  - the only exception is rendering `html` code itself
- allow custom renderers to implement complex components if desired or custom
  styles
- allows code highlighting
  - allow code language aliases/resolution with `getLanguage`
  - in the browser with `highlightElement` (can be asynchronous)
  - in node environments with `highlightCode` (synchronous only)

## Usage

The main component within this library is the `Markdown` component.

> Check out the [Markdown tests](./src/__tests__/Markdown.tsx) and
> [Markdown snapshots](./src/__tests__/__snapshots__/Markdown.tsx.snap) to see
> the default functionality.

### Simple Example

```tsx
import { render } from "react-dom";
import { Markdown } from "react-marked-renderer";

const markdown = `# Heading 1

This is some text that will be rendered as a paragraph.

Markdown defaults to the github-flavored markdown.
`;

render(<Markdown markdown={markdown} />, document.getElementById("root"));
```

### Custom Renderers

Since the default renderers add no styles, you can define your own renderers to
add styles or additional functionality.

```tsx
import { useState } from "react";
import { render } from "react-dom";
import {
  ListRenderer,
  getTokensText,
  Markdown,
  Renderers,
} from "react-marked-renderer";
import { BrowserRouter as Router, Link } from "react-router-dom";

const renderers: Partial<Renderers> = {
  link: function CustomLink({ href, title, children }: LinkRendererProps) {
    // make links use html5 history and not cause reloads
    return (
      <Link to={href} title={title}>
        {children}
      </Link>
    );
  },

  blockquote: function Blockquote({ children }) {
    return <blockquote className="custom">{children}</blockquote>;
  },

  task: function Task({ defaultChecked, tokens, children }) {
    // hooks can be used in these renderers
    const id = useSluggedId(`${getTokensText(tokens)}-task`);
    const [checked, setChecked] = useState(defaultChecked);
    return (
      <li className="task-item">
        <input
          id={id}
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <label htmlFor={d}>{children}</label>
      </li>
    );
  },

  list: function List(props) {
    // can get the current renderers as well
    const renderers = useRenderers();
    const { listitem: ListItem } = renderers;
    const item = <ListItem>Content</ListItem>;

    // or just return the default renderer
    return <ListRenderer {...props} />;
  },
};

render(
  <Router>
    <Markdown markdown={markdown} renderers={renderers} />
  </Router>,
  document.getElementById("root")
);
```

### PrismJS Code Highlighting (Browser)

To be able to highlight code in the browser, provide a `highlightElement`
function that will modify a `<code>` element to be highlighted:

```tsx
import { render } from "react-dom";
import { Markdown, Renderers } from "react-marked-renderer";
import Prism from "prismjs";
// import prism theme/components or use babel-plugin-prismjs

const renderers: Partial<Renderers> = {
  codespan: function CodeSpan({ children }) {
    // just so it gets some prism styling
    return <code className="language-none">{children}</code>;
  },
};

render(
  <Markdown
    markdown={markdown}
    renderers={renderers}
    highlightElement={Prism.highlightElement}
  />,
  document.getElementById("root")
);
```

### PrismJS Code Highlighting (Node and Browser)

If you want to highlight code in a node environment or allow the code to be
highlighted for SSR and in the browser, provide a `highlightCode` function:

```tsx
import { render } from "react-dom";
import {
  CodeGetCodeLanguage,
  DangerouslyHighlight,
  Markdown,
  Renderers,
} from "react-marked-renderer";
import Prism from "prismjs";

const renderers: Partial<Renderers> = {
  codespan: function CodeSpan({ children }) {
    // just so it gets some prism styling
    return <code className="language-none">{children}</code>;
  },
};

const getLanguage: GetCodeLanguage = (lang, _rawCode) => {
  // allow aliases
  lang = lang === "sh" ? "shell" : lang;

  // if the Prism doesn't support the language, default to nothing instead
  // of crashing
  if (!Prism.languages[lang]) {
    return "";
  }

  return lang;
};

const highlightCode: DangerouslyHighlightCode = (code, lang) =>
  Prism.highlight(code, Prism.languages[lang], lang);

render(
  <Markdown
    markdown={markdown}
    renderers={renderers}
    getLanguage={getLanguage}
    highlightCode={highlightCode}
  />,
  document.getElementById("root")
);
```

## What's the Use-case?

This library mostly came up since I like to write documentation sites in
markdown, but also apply custom styles as well as linking to other documentation
pages using html5 history (no full page reloads).
