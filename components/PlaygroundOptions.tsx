import React, { ReactElement, useState } from "react";
import {
  AppBarAction,
  Button,
  Checkbox,
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
  MoreVertSVGIcon,
  Text,
  TextFieldWithMessage,
  Tooltip,
  useTooltip,
} from "react-md";

import styles from "./PlaygroundOptions.module.scss";
import { PlaygroundOptionsProps } from "./useConfig";

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

export function PlaygroundOptions({
  intervalProps,
  resetUpdateInterval,
  splitView,
  setSplitView,
  customRenderers,
  setCustomRenderers,
  darkTheme,
  setDarkTheme,
}: PlaygroundOptionsProps): ReactElement {
  const [visible, setVisible] = useState(false);
  const hide = (): void => setVisible(false);
  const { elementProps, tooltipProps } = useTooltip({
    baseId: actionId,
    onClick: () => setVisible(true),
  });
  return (
    <>
      <AppBarAction
        {...elementProps}
        aria-label="Playground Options"
        id={actionId}
        last
      >
        <MoreVertSVGIcon />
      </AppBarAction>
      <Tooltip {...tooltipProps}>Playground Options</Tooltip>
      <Dialog
        modal
        id={dialogId}
        aria-labelledby={titleId}
        visible={visible}
        onRequestClose={hide}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Playground Options</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form
            className={styles.form}
            id={formId}
            onReset={(event) => {
              // prevent default since it causes some weird issues with checkboxes
              event.preventDefault();
              setDarkTheme(false);
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
                  <Link href="https://react-md.dev" target="_blank">
                    react-md
                  </Link>
                  . You can view the custom renderers{" "}
                  <Link
                    href="https://github.com/mlaursen/react-marked-renderer/tree/main/components/renderers.tsx"
                    target="_blank"
                  >
                    here
                  </Link>
                  .
                </FormMessage>
              </GridCell>
              <Divider />
              <GridCell>
                <Checkbox
                  id={themeId}
                  label="Dark Theme"
                  checked={darkTheme}
                  onChange={(event) =>
                    setDarkTheme(event.currentTarget.checked)
                  }
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
          <Button
            form={formId}
            type="submit"
            theme="primary"
            disabled={intervalProps.error}
          >
            Apply
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
