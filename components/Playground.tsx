import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import cn from "classnames";
import {
  Grid,
  GridCell,
  TabPanel,
  TabPanels,
  TabsManager,
  throttle,
  useNumberField,
} from "react-md";

import { Header } from "./Header";
import { MarkdownEditor, MarkdownEditorProps } from "./MarkdownEditor";
import { MarkdownPreview, MarkdownPreviewProps } from "./MarkdownPreview";
import styles from "./Playground.module.scss";
import { PlaygroundOptionsProps } from "./PlaygroundOptions";

const tabs = ["Editor", "Preview"];
const DEFAULT_VALUE = `# Heading 1

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

const UPDATE_INTERVAL_HELP_TEXT = `
The amount of time (in ms) before the preview window should be updated. This
only really needs to be changed if the page becomes unresponsive while
  making markdown changes.
`;

export default function Playground(): ReactElement {
  const [updateInterval, intervalProps, { reset }] = useNumberField({
    id: "update-interval",
    min: 0,
    step: 100,
    helpText: UPDATE_INTERVAL_HELP_TEXT,
    defaultValue: 0,
    updateOnChange: false,
    validateOnChange: true,
  });
  const [splitView, setSplitView] = useState(true);
  const [customRenderers, setCustomRenderers] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html || !darkTheme) {
      return;
    }

    const className = "dark-theme";
    html.classList.add(className);
    return () => {
      html.classList.remove(className);
    };
  }, [darkTheme]);

  const [markdown, setMarkdown] = useState(DEFAULT_VALUE);
  const updateMarkdown = useMemo(
    () =>
      throttle(
        (markdown: string, setMarkdown: Dispatch<SetStateAction<string>>) => {
          setMarkdown(markdown);
        },
        updateInterval
      ),
    [updateInterval]
  );

  const editorProps: MarkdownEditorProps = {
    splitView,
    placeholder: "# Enter some markdown here!",
    defaultValue: markdown,
    onChange: (event) => updateMarkdown(event.currentTarget.value, setMarkdown),
  };
  const previewProps: MarkdownPreviewProps = {
    markdown,
    customRenderers,
  };
  const optionsProps: PlaygroundOptionsProps = {
    intervalProps,
    resetUpdateInterval: reset,
    splitView,
    setSplitView,
    customRenderers,
    setCustomRenderers,
    darkTheme,
    setDarkTheme,
  };

  return (
    <TabsManager tabs={tabs} tabsId="editor-tabs">
      <Header {...optionsProps} />
      {splitView ? (
        <Grid
          gutter="0px"
          columns={2}
          padding={0}
          className={cn(styles.grid, {
            [styles.offset1]: splitView,
            [styles.offset2]: !splitView,
          })}
        >
          <GridCell>
            <MarkdownEditor {...editorProps} />
          </GridCell>
          <div role="separator" className={styles.separator} />
          <GridCell className={styles.scrollable}>
            <MarkdownPreview {...previewProps} />
          </GridCell>
        </Grid>
      ) : (
        <TabPanels
          className={cn(styles.panels, {
            [styles.offset1]: splitView,
            [styles.offset2]: !splitView,
          })}
          persistent
        >
          <TabPanel>
            <MarkdownEditor {...editorProps} />
          </TabPanel>
          <TabPanel>
            <MarkdownPreview {...previewProps} />
          </TabPanel>
        </TabPanels>
      )}
    </TabsManager>
  );
}
