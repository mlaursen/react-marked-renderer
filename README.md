# React Marked Renderer

A [React](https://reactjs.org) component library for the
[marked](https://github.com/markedjs/marked) library.

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

```tsx
import { useState } from "react";
import { render } from "react-dom";
import {
  ListRenderer,
  getTokensText,
  Markdown,
  Renderers,
} from "react-marked-renderer";

const renderers: Partial<Renderers> = {
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
  <Markdown markdown={markdown} renderers={renderers} />,
  document.getElementById("root")
);
```

### Code Highlighting (PrismJS)

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
