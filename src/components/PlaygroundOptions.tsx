import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  AppBarAction,
  Button,
  Checkbox,
  CloseSVGIcon,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Divider,
  Form,
  FormMessage,
  Grid,
  GridCell,
  Link,
  ListboxOption,
  ProvidedNumberFieldMessageProps,
  Select,
  Text,
  TextFieldWithMessage,
} from "react-md";

import styles from "./PlaygroundOptions.module.scss";

const baseId = "playground-options";
const actionId = `${baseId}-view`;
const dialogId = `${baseId}-dialog`;
const titleId = `${dialogId}-title`;
const formId = `${baseId}-form`;
const themeId = `${baseId}-theme`;
const themeMessageId = `${baseId}-theme`;
const splitViewId = `${baseId}-split-view`;
const splitViewMessageId = `${splitViewId}-message`;
const customRenderersId = `${baseId}-custom-renderers`;
const customRenderersMessageId = `${customRenderersId}-message`;

export type PlaygroundTheme = "light" | "dark" | "auto";
const themes: ListboxOption[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Auto", value: "auto" },
];

export interface PlaygroundOptionsProps {
  theme: PlaygroundTheme;
  setTheme: Dispatch<SetStateAction<PlaygroundTheme>>;
  intervalProps: ProvidedNumberFieldMessageProps;
  resetUpdateInterval(): void;
  splitView: boolean;
  setSplitView: Dispatch<SetStateAction<boolean>>;
  customRenderers: boolean;
  setCustomRenderers: Dispatch<SetStateAction<boolean>>;
}

export function PlaygroundOptions({
  intervalProps,
  resetUpdateInterval,
  splitView,
  setSplitView,
  customRenderers,
  setCustomRenderers,
  theme,
  setTheme,
}: PlaygroundOptionsProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const hide = (): void => setVisible(false);
  return (
    <>
      <AppBarAction
        id={actionId}
        onClick={() => setVisible(true)}
        last
        buttonType="text"
      >
        Options
      </AppBarAction>
      <Dialog
        id={dialogId}
        aria-labelledby={titleId}
        visible={visible}
        onRequestClose={hide}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Playground Options</DialogTitle>
          <AppBarAction onClick={hide} first last>
            <CloseSVGIcon />
          </AppBarAction>
        </DialogHeader>
        <DialogContent>
          <Form
            className={styles.form}
            id={formId}
            onReset={(event) => {
              event.preventDefault();
              setTheme("light");
              setSplitView(true);
              setCustomRenderers(false);
              resetUpdateInterval();
            }}
            onSubmit={hide}
          >
            <Grid columns={1}>
              <GridCell>
                <Checkbox
                  id={splitViewId}
                  label="Split View"
                  checked={splitView}
                  onChange={(event) =>
                    setSplitView(event.currentTarget.checked)
                  }
                />
                <FormMessage id={splitViewMessageId}>
                  Updates the page so that the markdown editor and preview are
                  visible at the same time.
                </FormMessage>
              </GridCell>
              <GridCell>
                <Checkbox
                  id={customRenderersId}
                  label="Custom Renderers"
                  checked={customRenderers}
                  onChange={(event) =>
                    setCustomRenderers(event.currentTarget.checked)
                  }
                />
                <FormMessage id={customRenderersMessageId}>
                  Updates the markdown preview to no longer use the default
                  renderers and instead use renderers from{" "}
                  <Link href="https://react-md.dev">react-md</Link>. You can
                  view the custom renderers{" "}
                  <Link href="https://github.com/mlaursen/react-marked-renderer/tree/main/src/components/renderers.tsx">
                    here
                  </Link>
                  .
                </FormMessage>
              </GridCell>
              <Divider />
              <GridCell>
                <Select
                  id={themeId}
                  value={theme}
                  onChange={(nextTheme) =>
                    setTheme(nextTheme as PlaygroundTheme)
                  }
                  options={themes}
                  label="Theme"
                />
                <FormMessage id={themeMessageId}>
                  <Text
                    component="span"
                    color="theme-warning"
                    fontStyle="italic"
                    type="caption"
                  >
                    Note: The default renderers will most likely be hard to read
                    in the dark theme.
                  </Text>
                </FormMessage>
              </GridCell>
              <GridCell>
                <TextFieldWithMessage
                  {...intervalProps}
                  label="Preview Update Interval"
                />
              </GridCell>
            </Grid>
          </Form>
        </DialogContent>
        <DialogFooter>
          <Button form={formId} type="reset" theme="secondary">
            Reset
          </Button>
          <Button form={formId} type="submit" theme="primary">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
