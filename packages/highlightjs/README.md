# @react-marked-renderer/highlightjs

This is a wrapper around [react-marked-renderer] to support code highlighting
with [highlight.js].

## Installation

```sh
npm install @react-marked-renderer/highlightjs highlight.js
```

## Usage

```tsx
import { Markdown } from "@react-marked-renderer/highlightjs";

function Example() {
  return (
    <Markdown
      markdown={`
This is a markdown string that has a code block.

\`\`\`sh
npm install @react-marked-renderer/highlightjs highlight.js
\`\`\`
`}
    />
  );
}
```

### React Client (or pre v19)

If running in a client environment or pre v19, each supported language must be
registered to get correct highlighting.

> See [supported languages] for more info.

```tsx
import hljs from "highlight.js/lib/common";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);
```

### React Server

If running in a `react-server` environment, no addition changes are required as
all highlight.js languages will be loaded.

#### Smaller Footprint

If the react-server footprint needs to be reduced, import everything from
`"@react-marked-renderer/highlightjs/manual"` instead of
`"@react-marked-renderer/highlightjs`. This will require all the languages to
be manually imported and registered just like the client import.

## Styling

There are no styles for code blocks by default and must be imported from
`import "highlight.js/styles/*.css` or by creating a custom [highlight theme].

If using an existing `highlight.js` theme, just import it somewhere in your app
that accepts `.css` files:

```tsx
import "highlight.js/styles/default.css";
// or an already minified version
import "highlight.js/styles/default.min.css";
```

[highlight.js]: https://github.com/highlightjs/highlightjs
[supported languages]: https://github.com/highlightjs/highlightjs/blob/main/SUPPORTED_LANGUAGES.md
[highlight theme]: https://highlightjs.readthedocs.io/en/latest/theme-guide.html
[react-marked-renderer]: https://github.com/mlaursen/react-marked-renderer/packages/react-marked-renderer
