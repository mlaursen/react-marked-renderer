# React Marked Renderer [![license](https://img.shields.io/npm/l/react-md)](https://github.com/mlaursen/react-marked-renderer/blob/main/LICENSE) [![codecov](https://codecov.io/gh/mlaursen/react-marked-renderer/branch/main/graph/badge.svg?token=R4XGTOIVU0)](https://codecov.io/gh/mlaursen/react-marked-renderer) [![Main](https://github.com/mlaursen/react-marked-renderer/actions/workflows/main.yml/badge.svg)](https://github.com/mlaursen/react-marked-renderer/actions/workflows/main.yml) [![npm](https://img.shields.io/npm/v/react-marked-renderer)](https://www.npmjs.com/package/react-marked-renderer) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-marked-renderer)

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

Or with [yarn](https://yarnpkg.com):

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

> Note: Since the [marked.lexer](https://marked.js.org/using_pro#lexer) does not
> support custom [extensions](https://marked.js.org/using_pro#extensions),
> neither does this library. I would like to support this feature in the future.

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
  DEFAULT_MARKDOWN_RENDERERS,
  ListRenderer,
  Markdown,
  Renderers,
  getTokensText,
} from "react-marked-renderer";
import { BrowserRouter as Router, Link } from "react-router-dom";

const renderers: Renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
  link: function CustomLink({ href, title, children }) {
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
import {
  DEFAULT_MARKDOWN_RENDERERS,
  Markdown,
  Renderers,
} from "react-marked-renderer";
import Prism from "prismjs";
// import prism theme/components or use `babel-plugin-prismjs`

const renderers: Renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
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
  DEFAULT_MARKDOWN_RENDERERS,
  DangerouslyHighlight,
  GetCodeLanguage,
  Markdown,
  Renderers,
} from "react-marked-renderer";
import Prism from "prismjs";

const renderers: Renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,
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
    return "none";
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

## What's the use-case?

This library mostly came up since I like to write documentation sites in
markdown, but also apply custom styles as well as linking to other documentation
pages using html5 history (no full page reloads).
