export const DEFAULT_MARKDOWN = `# Heading 1

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
