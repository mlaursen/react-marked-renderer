# React Marked Renderer

A low-level component wrapper for [marked](https://github.com/markedjs/marked)
that renders as [React](https://reactjs.org) components instead of strings.

> This package will also re-export everything from `marked` so it does not need
> to be added as a dependency in your app if additional markdown behavior must
> be implemented.

## Installation

```sh
npm install react react-marked-renderer
```

Or with [yarn](https://yarnpkg.com)

```sh
yarn add react react-marked-renderer
```

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

### Code Highlighting (PrismJS)

Since there are a few different code highlighting libraries, this will need to
be implemented manually with your library of choice for the `codeblock` and/or
`codespan` custom renderers.

```tsx
import { render } from "react-dom";
import { Markdown, Renderers } from "react-marked-renderer";
import { highlightElement } from "prismjs";

const renderers: Partial<Renderers> = {
  // Note: You might need to update the `lang` to be one of the known Prism
  // languages
  codeblock: function CodeBlock({ lang, text }) {
    const highlight = useCallback((instance: HTMLElement) => {
      if (!instance || !text) {
        return;
      }

      highlightElement(instance);
    }, []);

    // a key is added to the `<pre>` element so that the code will be
    // re-highlighted if the text or language changes. This is only really
    // required if creating a "real-time" markdown previewer
    return (
      <pre key={`${lang}${text}`} className={`language-${lang}`}>
        <code ref={highlight}>{text}</code>
      </pre>
    );
  },

  codespan: function CodeSpan({ children }) {
    // just so it gets some prism styling
    return <code className="language-none">{children}</code>;
  },
};

render(
  <Markdown markdown={markdown} renderers={renderers} />,
  document.getElementById("root")
);
```

## What's the Use-case?

This library mostly came up since I like to write documentation sites in
markdown, but also apply custom styles as well as linking to other documentation
pages using html5 history (no full page reloads).
