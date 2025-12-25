import { TextContainer } from "@react-md/core/typography/TextContainer";
import { type ReactElement } from "react";
import { Markdown } from "react-marked-renderer";

import { SERVER_RENDERERS } from "@/components/renderers/server-renderers";

const MARKDOWN = `
# react-marked-renderer

#### Render markdown using custom React components instead of plain HTML strings with [marked](https://marked.js.org).

---

## Installation

\`\`\`sh
npm install react-marked-renderer
\`\`\`

\`\`\`sh
pnpm add react-marked-renderer
\`\`\`

\`\`\`sh
yarn add react-marked-renderer
\`\`\`

## Usage

<Card>
  <CardHeader>
    <CardTitle>Code</CardTitle>
  </CardHeader>

\`\`\`tsx
import { Markdown } from "react-marked-renderer";

const MARKDOWN = \`
# Here is a title

Here is a paragraph with **bold** text.

- Item 1
- Item 2
- Item 3
\`;

function Example() {
  return <Markdown markdown={MARKDOWN} />;
}
\`\`\`

  </Card>
</Box>
`;

export default async function HomePage(): Promise<ReactElement> {
  return (
    <TextContainer>
      <Markdown markdown={MARKDOWN} renderers={SERVER_RENDERERS} parseHtml />
    </TextContainer>
  );
}
