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

export const HEADING_MARKDOWN = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
`;

export const HEADING_1_WITH_EQUALS_MARKDOWN = `
Three equals
===

Three or more equals
======
`;

export const HEADING_2_WITH_HYPHENS_MARKDOWN = `
Three hyphens
---

Three or more hyphens
------
`;

export const LINK_MARKDOWN = `
Automatically https://example.com without brackets.

[Brackets Link](https://github.com) with text afterwards.

[Brackets Link with title](https://github.com "Custom Title") with text afterwards.

[Referenced Link Matching case] with text afterwards.

[ReFeRENced LInk IGNORing cAsE] with text afterwards.

[Referenced Link Matching case]: https://github.com/mlaursen
[referenced link ignoring case]: https://github.com/mlaursen/react-marked-renderer
`;

export const REFERENCE_LINK_MARKDOWN = `
[heading-1](#heading-1)
[heading-2](#heading-2 "Goto heading-2")
`;

export const BLOCKQUOTE_MARKDOWN = `
> This is text in a blockquote
`;

export const NESTED_BLOCKQUOTE_MARKDOWN = `
> Root Blockquote
>> Nested Blockquote
`;

export const EMPHASIS_TEXT_MARKDOWN = `
_Using Single Underscore_

*Using Single Asterisk*
`;

export const BOLD_TEXT_MARKDOWN = `
__Using Double Underscore___

**Using Double Asterisk**
`;

export const STRIKETHROUGH_TEXT_MARKDOWN = `
~~This text has strikethroughs~~
`;

export const EMPHASIS_BOLD_STRIKETHROUGH_TEXT_MARKDOWN = `
___Should be emphasis and bold.___

***Should be emphasis and bold.***

*__Should be emphasis and bold.__*

__*Should be emphasis and bold.*__

_**Should be emphasis and bold.**_

**_Should be emphasis and bold._**

~~**_Should be emphasis, bold, and strikethrough._**~~
`;

export const ESCAPED_MARKDOWN = `
Here is some \\*escaped\\* stuff.

Allow \\_\\_tests\\_\\_.
`;

export const ESCAPED_HTML_MARKDOWN = `
- \\<img>
- \\<video>
- \\<iframe>
- \\<embed>
- \\<object>
`;

export const BR_MARKDOWN = `
Trailing two spaces to force break  
Second Line of text with trailing slash to force break\\
Third line of text

[Link Text](https://example.com)  
[Link Text](https://example.com)\\
Fine Link Line
`;

export const CODE_BLOCK_MARKDOWN = `
\`\`\`
const x = "y";
\`\`\`

\`\`\`sh
yarn add some-package
\`\`\`
`;

export const CODE_SPAN_MARKDOWN = `
This has some \`inline code\` to see.
`;

export const CODE_SPAN_ADVANCED_MARKDOWN = `
This has some \`inline code that "contains" html 'entities' and <other></other>\`

Some other html entities:

- \`¢\` cent
- \`£\` pound
- \`¥\` yen
- \`€\` euro
- \`©\` copyright
- \`®\` registered trademark
`;

export const UNORDERED_LIST_MARKDOWN = `
- Item 1
- Item 2
- Item 3

* Asterisk Item 1
* Asterisk Item 2
* Asterisk Item 3
`;

export const ORDERED_LIST_MARKDOWN = `
1. Ordered Item 1
2. Ordered Item 2
3. Ordered Item 3
`;

export const NESTED_LIST_MARKDOWN = `
1. Ordered Item 1
   1. Ordered Subitem 1
   2. Ordered Subitem 2
      - Three Down Hyphen
      * Three Down Asterisk
`;

export const TASK_LIST_MARKDOWN = `
- [ ] Unchecked Task
- [x] Checked Task Lowercase
- [X] Checked Task Uppercase
`;

export const HORIZONTAL_RULE_MARKDOWN = `
Text Above HR

---

Text Below HR
`;

export const IMAGE_MARKDOWN = `
![](image.jpeg)
![alt text](image.jpeg)
![alt text](image.jpeg "With Title!")
![absolute path](/image.jpeg)
![relative path](./image.jpeg)
`;

export const TABLE_MARKDOWN = `
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
`;

// https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables
export const TABLE_COMPLEX_MARKDOWN = `
| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| \`git status\` | List all *new or modified* files |
| \`git diff\` | Show file differences that **haven't been** staged |


| Name     | Character |
| ---      | ---       |
| Backtick | \`         |
| Pipe     | \\|        |
`;

export const FOLDABLE_TEXT_MARKDOWN = `
<details>
<summary>Title 1</summary>
<p>Content in Title 1</p>
</details>
<details>
  <summary>Title 2</summary>
  <p>Content in Title 2</p>
</details>
`;
