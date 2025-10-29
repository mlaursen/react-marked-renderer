# @react-marked-renderer/prismjs

This is a wrapper around [react-marked-renderer] to support code highlighting
with [prismjs].

## Installation

```sh
npm install @react-marked-renderer/prismjs prismjs
```

Optionally install additional themes:

```sh
npm install prism-themes
```

## Usage

```tsx
import { Markdown } from "@react-marked-renderer/prismjs";

function Example() {
  return (
    <Markdown
      markdown={`
This is a markdown string that has a code block.

\`\`\`sh
npm install @react-marked-renderer/prismjs prismjs
\`\`\`
`}
    />
  );
}
```

## Styling

There are no styles for code blocks by default and must be imported from `import
"prismjs/themes/*.css"` or by creating a custom theme. Here are the available
themes at the time of writing this (`prismjs@1.30.0`):

```sh
tree node_modules/prismjs/themes

node_modules/prismjs/themes
├── prism-coy.css
├── prism-coy.min.css
├── prism-dark.css
├── prism-dark.min.css
├── prism-funky.css
├── prism-funky.min.css
├── prism-okaidia.css
├── prism-okaidia.min.css
├── prism-solarizedlight.css
├── prism-solarizedlight.min.css
├── prism-tomorrow.css
├── prism-tomorrow.min.css
├── prism-twilight.css
├── prism-twilight.min.css
├── prism.css
└── prism.min.css
```

So just import one of the themes into your app:

```tsx
import "prismjs/themes/prism.css";
// or an already minified version
import "prismjs/themes/prism.min.css";
```

### Additional Languages

There are only a few languages included by default: `markup`, `css`, `clike`,
and `javascript`. Each language can be imported from `prismjs/components/*`
such as:

```tsx
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-git";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
```

The [prismjs website recommendeds](https://prismjs.com/#basic-usage-bundlers)
installing the [babel-plugin-prismjs] to handle loading all the language when
using a bundler instead:

```sh
npm install --save-dev babel-plugin-prismjs
```

[prismjs]: https://prismjs.com/
[react-marked-renderer]: https://github.com/mlaursen/react-marked-renderer/packages/react-marked-renderer
[babel-plugin-prismjs]: https://github.com/mAAdhaTTah/babel-plugin-prismjs
